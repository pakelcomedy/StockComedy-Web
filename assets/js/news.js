import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function() {
    const newsGrid = document.getElementById('news-grid');

    // Function to create and display each news card
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
        date.textContent = `Published on: ${news.timestamp}`;

        const sectors = document.createElement('p');
        sectors.classList.add('news-sectors');
        sectors.textContent = `Impact Sectors: ${news.impacting_sectors.join(', ')}`;

        // Append the elements to the card
        card.appendChild(title);
        card.appendChild(summary);
        card.appendChild(date);
        card.appendChild(sectors);

        // Append the card to the grid
        newsGrid.appendChild(card);
    }

    // Fetch news data from Firestore
    async function fetchNews() {
        try {
            const newsCollection = collection(db, "news");
            const newsSnapshot = await getDocs(newsCollection);

            newsSnapshot.forEach(doc => {
                const news = doc.data();
                // Format timestamp to a readable date
                const formattedDate = new Date(news.timestamp).toLocaleString();
                news.timestamp = formattedDate;
                createNewsCard(news);
            });
        } catch (error) {
            console.error("Error getting news: ", error);
        }
    }

    // Call the function to fetch news
    fetchNews();
});