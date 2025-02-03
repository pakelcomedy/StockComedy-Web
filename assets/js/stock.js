import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// 🔹 Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUKi9EMIGputcL32kdGs7W-bhaiGRYKYI",
  authDomain: "stockcomedy-666.firebaseapp.com",
  databaseURL: "https://stockcomedy-666-default-rtdb.firebaseio.com",
  projectId: "stockcomedy-666",
  storageBucket: "stockcomedy-666.appspot.com",
  messagingSenderId: "670829636816",
  appId: "1:670829636816:web:bca160907d8e10ec8d02d5",
  measurementId: "G-T8XFP8TFGV"
};

// 🔹 Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🔹 Fungsi untuk membuat kartu saham
function createStockCard(stockSymbol, stockData) {
  const price = parseFloat(stockData.price) || 0.0;
  const momentum = parseFloat(stockData.momentum) || 0.0;
  const marketCap = stockData.marketCap ? parseFloat(stockData.marketCap).toLocaleString() : "N/A";
  const companyName = stockData.companyName || "Unknown Company";

  // Gunakan template literal untuk membuat elemen kartu saham
  const stockCard = document.createElement("div");
  stockCard.classList.add("stock-card");
  stockCard.innerHTML = `
    <h3>${companyName} (${stockSymbol})</h3>
    <p class="stock-price">$${price.toFixed(2)}</p>
    <p class="stock-change ${momentum > 0 ? "positive" : "negative"}">
      ${momentum > 0 ? "+" : ""}${momentum.toFixed(2)}%
    </p>
    <p class="stock-volume">Market Cap: $${marketCap}</p>
    <a href="stock-detail.html?symbol=${stockSymbol}" class="btn-primary">View Details</a>
  `;

  // Opsi 1: Jika Anda ingin agar seluruh kartu dapat diklik, Anda bisa mengaktifkan event listener berikut
  // stockCard.addEventListener("click", (e) => {
  //   // Jika tombol 'View Details' diklik, jangan ganda redirect
  //   if (e.target.tagName.toLowerCase() !== "a") {
  //     window.location.href = `stock-detail.html?symbol=${stockSymbol}`;
  //   }
  // });

  return stockCard;
}

// 🔹 Fungsi untuk mengambil data saham dari Firebase
async function fetchStockData() {
  const stockRef = ref(db, "stocks");
  try {
    const snapshot = await get(stockRef);
    return snapshot.exists() ? snapshot.val() : {};
  } catch (error) {
    console.error("Gagal mengambil data saham:", error);
    return {};
  }
}

// 🔹 Fungsi untuk merender daftar saham
async function renderStockList() {
  const stockGrid = document.getElementById("stock-grid");
  stockGrid.innerHTML = ""; // Bersihkan grid sebelum menambahkan kartu

  try {
    const stockData = await fetchStockData();
    Object.keys(stockData).forEach((stockSymbol) => {
      const card = createStockCard(stockSymbol, stockData[stockSymbol]);
      stockGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Gagal merender daftar saham:", error);
  }
}

// 🔹 Inisialisasi daftar saham saat halaman dimuat
window.onload = renderStockList;