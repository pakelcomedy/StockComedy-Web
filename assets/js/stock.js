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
    measurementId: "G-T8XFP8TFGV",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Fungsi untuk membuat kartu saham
function createStockCard(stockSymbol, stockData) {
    const stockCard = document.createElement("div");
    stockCard.classList.add("stock-card");

    const stockName = document.createElement("h3");
    stockName.textContent = `${stockData.companyName || "Unknown Company"} (${stockSymbol})`;
    stockCard.appendChild(stockName);

    const stockPrice = document.createElement("p");
    stockPrice.classList.add("stock-price");
    const price = parseFloat(stockData.price) || 0.0; // Validasi harga
    stockPrice.textContent = `$${price.toFixed(2)}`;
    stockCard.appendChild(stockPrice);

    const stockChange = document.createElement("p");
    stockChange.classList.add("stock-change");
    const momentum = parseFloat(stockData.momentum) || 0.0; // Gunakan momentum sebagai indikasi perubahan harga
    stockChange.classList.add(momentum > 0 ? "positive" : "negative");
    stockChange.textContent = `${momentum > 0 ? "+" : ""}${momentum.toFixed(2)}%`;
    stockCard.appendChild(stockChange);

    const stockVolume = document.createElement("p");
    stockVolume.classList.add("stock-volume");
    stockVolume.textContent = `Market Cap: $${stockData.marketCap.toLocaleString()}`;
    stockCard.appendChild(stockVolume);

    const viewDetailsBtn = document.createElement("a");
    viewDetailsBtn.classList.add("btn-primary");
    viewDetailsBtn.href = `stock-detail.html?symbol=${stockSymbol}`;
    viewDetailsBtn.textContent = "View Details";
    stockCard.appendChild(viewDetailsBtn);

    return stockCard;
}

// Fungsi untuk mengambil data saham dari Realtime Database
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

// Fungsi untuk merender daftar saham
async function renderStockList() {
    const stockGrid = document.getElementById("stock-grid");
    try {
        const stockData = await fetchStockData();
        Object.keys(stockData).forEach(stockSymbol => {
            const stockCard = createStockCard(stockSymbol, stockData[stockSymbol]);
            stockGrid.appendChild(stockCard);
        });
    } catch (error) {
        console.error("Gagal merender daftar saham:", error);
    }
}

// Inisialisasi daftar saham
renderStockList();