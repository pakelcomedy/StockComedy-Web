import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyDUKi9EMIGputcL32kdGs7W-bhaiGRYKYI",
  authDomain: "stockcomedy-666.firebaseapp.com",
  databaseURL: "https://stockcomedy-666-default-rtdb.firebaseio.com",
  projectId: "stockcomedy-666",
  storageBucket: "stockcomedy-666.firebasestorage.app",
  messagingSenderId: "670829636816",
  appId: "1:670829636816:web:bca160907d8e10ec8d02d5",
  measurementId: "G-T8XFP8TFGV"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Fungsi untuk mengambil data Stocks
async function fetchTopStocks() {
  try {
    const stocksRef = ref(db, "stocks");
    const snapshot = await get(stocksRef);
    if (snapshot.exists()) {
      const stocksData = snapshot.val();
      // Konversi objek menjadi array, tambahkan properti 'id' dari key, lalu urutkan berdasarkan harga tertinggi
      const sortedStocks = Object.keys(stocksData)
        .map(stockId => ({
          ...stocksData[stockId],
          id: stockId
        }))
        .sort((a, b) => b.price - a.price)
        .slice(0, 3); // Ambil 3 saham teratas
      return sortedStocks;
    } else {
      console.log("No stock data available.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching stocks: ", error);
    return [];
  }
}

// Fungsi untuk mengambil data Cryptos (jika ada)
async function fetchTopCryptos() {
  try {
    const cryptosRef = ref(db, "cryptos");
    const snapshot = await get(cryptosRef);
    if (snapshot.exists()) {
      const cryptosData = snapshot.val();
      const sortedCryptos = Object.keys(cryptosData)
        .map(cryptoId => ({
          ...cryptosData[cryptoId],
          id: cryptoId
        }))
        .sort((a, b) => b.price - a.price) // Atau urutkan berdasarkan properti lain jika ada
        .slice(0, 3);
      return sortedCryptos;
    } else {
      console.log("No crypto data available.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching cryptos: ", error);
    return [];
  }
}

// Fungsi untuk mengambil data Leaderboard (Players)
// Kita gunakan properti total_equity yang sudah ada di masing-masing player
async function fetchLeaderboard() {
  try {
    const playersRef = ref(db, "players");
    const snapshot = await get(playersRef);
    if (snapshot.exists()) {
      const playersData = snapshot.val();
      const sortedPlayers = Object.keys(playersData)
        .map(playerId => {
          const player = playersData[playerId];
          return {
            ...player,
            id: playerId,
            totalEquity: Number(player.total_equity) || 0
          };
        })
        .sort((a, b) => b.totalEquity - a.totalEquity)
        .slice(0, 3); // Ambil 3 pemain teratas
      return sortedPlayers;
    } else {
      console.log("No players data available.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching players: ", error);
    return [];
  }
}

// Fungsi untuk memperbarui data pasar (Stocks & Cryptos)
async function updateMarketData() {
  try {
    // Update Stocks
    const topStocks = await fetchTopStocks();
    const stocksTableBody = document.querySelector('.market-grid .market-table:first-child tbody');
    stocksTableBody.innerHTML = topStocks.map(stock => {
      // Menggunakan properti companyName untuk nama perusahaan
      const companyName = stock.companyName || stock.id || "N/A";
      // Harga saham
      const price = Number(stock.price).toFixed(2);
      // Gunakan properti momentum sebagai nilai perubahan (change) jika ada
      let change = "N/A";
      if (typeof stock.momentum === 'number') {
        change = stock.momentum > 0 ? `+${stock.momentum.toFixed(2)}%` : `${stock.momentum.toFixed(2)}%`;
      }
      // Gunakan marketCap untuk kolom Volume (atau ubah label sesuai kebutuhan)
      const marketCap = stock.marketCap ? `$${Number(stock.marketCap).toLocaleString()}` : "N/A";
      return `
        <tr>
          <td>${companyName}</td>
          <td>$${price}</td>
          <td class="${(stock.momentum && stock.momentum > 0) ? 'positive' : 'negative'}">${change}</td>
          <td>${marketCap}</td>
        </tr>
      `;
    }).join('');

    // Update Cryptos (jika tabel cryptos ada)
    const topCryptos = await fetchTopCryptos();
    const cryptosTableBody = document.querySelector('.market-grid .market-table:last-child tbody');
    if (cryptosTableBody) {
      cryptosTableBody.innerHTML = topCryptos.map(crypto => `
        <tr>
          <td>${crypto.name || crypto.id || "N/A"}</td>
          <td>$${Number(crypto.price).toFixed(2)}</td>
          <td class="${crypto.change && String(crypto.change).includes('+') ? 'positive' : 'negative'}">${crypto.change || "N/A"}</td>
          <td>$${crypto.marketCap || "N/A"}</td>
        </tr>
      `).join('');
    }
  } catch (error) {
    console.error("Error updating market data: ", error);
  }
}

// Fungsi untuk memperbarui Leaderboard
async function updateLeaderboard() {
  try {
    const topPlayers = await fetchLeaderboard();
    const leaderboardGrid = document.querySelector('.leaderboard-grid');
    leaderboardGrid.innerHTML = topPlayers.map((player, index) => `
      <div class="leaderboard-item">
        <h3>${index + 1}. ${player.name || player.id}</h3>
        <p>Balance: $${player.totalEquity.toFixed(2)}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error("Error updating leaderboard: ", error);
  }
}

// Fungsi animasi angka pada Hero Section
function animateCounters() {
  const counters = document.querySelectorAll('.count');
  const speed = 200; // Kecepatan animasi

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target; // Pastikan nilai akhir tepat
      }
    };

    updateCount();
  });
}

// Saat halaman dimuat, perbarui data dari Realtime Database
document.addEventListener('DOMContentLoaded', () => {
  updateMarketData();
  updateLeaderboard();
  animateCounters();
});