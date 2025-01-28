import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDUKi9EMIGputcL32kdGs7W-bhaiGRYKYI",
    authDomain: "stockcomedy-666.firebaseapp.com",
    projectId: "stockcomedy-666",
    storageBucket: "stockcomedy-666.appspot.com",
    messagingSenderId: "670829636816",
    appId: "1:670829636816:web:bca160907d8e10ec8d02d5",
    measurementId: "G-T8XFP8TFGV",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fungsi untuk membuat kartu saham
function createStockCard(stock) {
    const stockCard = document.createElement("div");
    stockCard.classList.add("stock-card");

    const stockName = document.createElement("h3");
    stockName.textContent = `${stock.companyName || "Unknown Company"} (${stock.stockSymbol || "N/A"})`;
    stockCard.appendChild(stockName);

    const stockPrice = document.createElement("p");
    stockPrice.classList.add("stock-price");
    const price = parseFloat(stock.price) || 0.0; // Validasi harga
    stockPrice.textContent = `$${price.toFixed(2)}`;
    stockCard.appendChild(stockPrice);

    const stockChange = document.createElement("p");
    stockChange.classList.add("stock-change");
    const change = parseFloat(stock.change) || 0.0; // Validasi perubahan harga
    stockChange.classList.add(change > 0 ? "positive" : "negative");
    stockChange.textContent = `${change > 0 ? "+" : ""}${change.toFixed(2)}%`;
    stockCard.appendChild(stockChange);

    const stockVolume = document.createElement("p");
    stockVolume.classList.add("stock-volume");
    stockVolume.textContent = `Volume: ${stock.volume || "N/A"}`;
    stockCard.appendChild(stockVolume);

    const viewDetailsBtn = document.createElement("a");
    viewDetailsBtn.classList.add("btn-primary");
    viewDetailsBtn.href = `stock-detail.html?symbol=${stock.stockSymbol}`;
    viewDetailsBtn.textContent = "View Details";
    stockCard.appendChild(viewDetailsBtn);

    return stockCard;
}

// Fungsi untuk mengambil data saham dari Firestore
async function fetchStockData() {
    const stockCollection = collection(db, "stocks");
    const stockSnapshot = await getDocs(stockCollection);
    return stockSnapshot.docs.map(doc => doc.data());
}

// Fungsi untuk merender daftar saham
async function renderStockList() {
    const stockGrid = document.getElementById("stock-grid");
    try {
        const stockData = await fetchStockData();
        stockData.forEach(stock => {
            const stockCard = createStockCard(stock);
            stockGrid.appendChild(stockCard);
        });
    } catch (error) {
        console.error("Gagal mengambil data saham:", error);
    }
}

// Inisialisasi daftar saham
renderStockList();