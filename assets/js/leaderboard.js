import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Konfigurasi Firebase
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

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Fungsi untuk mengambil data leaderboard dari Realtime Database
async function fetchLeaderboardData() {
    const playersRef = ref(db, "players");
    const snapshot = await get(playersRef);

    if (!snapshot.exists()) {
        console.error("No data found in players.");
        return [];
    }

    // Konversi data ke array dan urutkan berdasarkan total_equity
    const playersData = [];
    snapshot.forEach(childSnapshot => {
        const player = childSnapshot.val();
        if (player.total_equity !== undefined) {
            playersData.push({
                name: player.name || childSnapshot.key,
                totalEquity: player.total_equity,
            });
        }
    });

    // Urutkan dari total_equity terbesar ke terkecil
    playersData.sort((a, b) => b.totalEquity - a.totalEquity);

    // Tambahkan peringkat
    return playersData.map((player, index) => ({
        rank: index + 1,
        name: player.name,
        totalEquity: player.totalEquity
    }));
}

// Fungsi untuk merender leaderboard ke halaman
async function renderLeaderboard() {
    const leaderboardContainer = document.getElementById("leaderboard-container");
    leaderboardContainer.innerHTML = ""; // Kosongkan sebelum render ulang

    try {
        const leaderboardData = await fetchLeaderboardData();

        leaderboardData.forEach(player => {
            let spotlightClass = "";

            // Beri efek spotlight sesuai peringkat
            if (player.rank <= 3) {
                spotlightClass = `spotlight-${player.rank}`;
            } else if (player.rank <= 10) {
                spotlightClass = "spotlight-4";
            } else if (player.rank <= 50) {
                spotlightClass = "spotlight-11-50";
            } else {
                spotlightClass = "spotlight-51-100";
            }

            // Buat elemen leaderboard
            const item = document.createElement("div");
            item.classList.add("leaderboard-item", spotlightClass);
            item.innerHTML = `
                <div class="rank">${player.rank}</div>
                <div class="player-name">${player.name}</div>
                <div class="score">$${player.totalEquity.toFixed(2)}</div>
            `;

            leaderboardContainer.appendChild(item);
        });
    } catch (error) {
        console.error("Gagal mengambil leaderboard:", error);
    }
}

// Panggil fungsi saat halaman dimuat
window.onload = renderLeaderboard;