// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dropdown toggle for the "Explore" menu
const exploreMenu = document.querySelector('.navigation > ul > li > a[href="#"]');
const dropdown = document.querySelector('.navigation > ul > li > .dropdown');

exploreMenu.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('show');
});

// Hide the dropdown if clicked outside
document.addEventListener('click', (e) => {
    if (!exploreMenu.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});

// Example for dynamically updating the stock table (can be expanded to pull from Firebase or API)
function updateMarketData() {
    // Example data - replace with API or Firebase integration for live data
    const stockData = [
        { company: 'Apple', price: '$150.25', change: '+2.34%', volume: '1.2M' },
        { company: 'Amazon', price: '$3,200.45', change: '-1.15%', volume: '800K' }
    ];

    const cryptoData = [
        { asset: 'Bitcoin', price: '$48,000', change: '+3.12%', marketCap: '$900B' },
        { asset: 'Ethereum', price: '$3,200', change: '-0.25%', marketCap: '$400B' }
    ];

    // Update Top Stocks Table
    const stockTableBody = document.querySelector('.market-table:nth-child(1) tbody');
    stockTableBody.innerHTML = stockData.map(stock => `
        <tr>
            <td>${stock.company}</td>
            <td>${stock.price}</td>
            <td class="${stock.change.includes('+') ? 'positive' : 'negative'}">${stock.change}</td>
            <td>${stock.volume}</td>
        </tr>
    `).join('');

    // Update Top Cryptos Table
    const cryptoTableBody = document.querySelector('.market-table:nth-child(2) tbody');
    cryptoTableBody.innerHTML = cryptoData.map(crypto => `
        <tr>
            <td>${crypto.asset}</td>
            <td>${crypto.price}</td>
            <td class="${crypto.change.includes('+') ? 'positive' : 'negative'}">${crypto.change}</td>
            <td>${crypto.marketCap}</td>
        </tr>
    `).join('');
}

// Call updateMarketData when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateMarketData();

    // Animasi angka pada Hero Section
    const counters = document.querySelectorAll('.count');
    const speed = 200; // Adjust speed of the animation

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target; // Ensure final value is exact
            }
        };

        updateCount();
    });
});