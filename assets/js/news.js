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

document.addEventListener('DOMContentLoaded', function () {
    const newsGrid = document.getElementById('news-grid');

    // Fungsi untuk membuat kartu berita
    function createNewsCard(news) {
        const card = document.createElement('div');
        card.classList.add('news-card');

        const title = document.createElement('h3');
        title.classList.add('news-title');
        title.textContent = news.title;

        const summary = document.createElement('p');
        summary.classList.add('news-summary');
        summary.textContent = news.content;

        const date = document.createElement('p');
        date.classList.add('news-date');
        date.textContent = `Published on: ${news.published_date}`;

        const sectors = document.createElement('p');
        sectors.classList.add('news-sectors');
        sectors.textContent = `Impact Sectors: ${news.impacting_sectors.join(', ')}`;

        // Tambahkan elemen ke dalam kartu
        card.appendChild(title);
        card.appendChild(summary);
        card.appendChild(date);
        card.appendChild(sectors);

        // Tambahkan kartu ke dalam grid
        newsGrid.appendChild(card);
    }

    // Fungsi untuk mengambil data berita dari Realtime Database
    async function fetchNews() {
        try {
            const newsRef = ref(db, "news");
            const snapshot = await get(newsRef);

            if (snapshot.exists()) {
                const newsData = snapshot.val();
                
                // Loop melalui objek berita
                Object.keys(newsData).forEach(newsId => {
                    const news = newsData[newsId];
                    createNewsCard(news);
                });
            } else {
                console.log("No news data available.");
            }
        } catch (error) {
            console.error("Error fetching news: ", error);
        }
    }

    // Panggil fungsi untuk mengambil data berita
    fetchNews();
});