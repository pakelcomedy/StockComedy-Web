import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Your Firebase config
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function() {
    const ipoGrid = document.getElementById('ipo-grid');

// Function to create and display each IPO card
function createIpoCard(ipo) {
    const card = document.createElement('div');
    card.classList.add('stock-card');

    // Use the correct property names from Firestore
    const name = document.createElement('h3');
    name.classList.add('stock-name');
    name.textContent = `${ipo.companyName} (${ipo.stockSymbol})`;

    const offeringPrice = document.createElement('p');
    offeringPrice.classList.add('stock-price');
    offeringPrice.textContent = `Offering Price: ${ipo.offeringPrice}`;

    const listingDate = document.createElement('p');
    listingDate.classList.add('stock-change');
    listingDate.textContent = `Listing Date: ${ipo.ipoDate}`;

    const sector = document.createElement('p');
    sector.classList.add('stock-sector');
    sector.textContent = `Sector: ${ipo.sector}`;

    const status = document.createElement('p');
    status.classList.add('stock-volume');
    status.textContent = `Status: ${ipo.status}`;

    const statusClass = ipo.positive ? 'positive' : 'negative';
    status.classList.add(statusClass);

    // Append the elements to the card
    card.appendChild(name);
    card.appendChild(offeringPrice);
    card.appendChild(listingDate);
    card.appendChild(sector);
    card.appendChild(status);

    // Append the card to the grid
    const ipoGrid = document.getElementById('ipo-grid');
    ipoGrid.appendChild(card);
}

    // Fetch IPO data from Firestore
    async function loadIpos() {
        const ipoCollection = collection(db, "ipos");
        try {
            const ipoSnapshot = await getDocs(ipoCollection);
            const ipoList = ipoSnapshot.docs.map(doc => doc.data()); // Get the data from each document
            ipoList.forEach(ipo => createIpoCard(ipo)); // Create a card for each IPO
        } catch (error) {
            console.error("Error getting IPO data: ", error);
        }
    }

    // Load IPO data when the document is ready
    loadIpos();
});
