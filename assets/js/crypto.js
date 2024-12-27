document.addEventListener('DOMContentLoaded', function() {
    const cryptoGrid = document.getElementById('crypto-grid');

    // Mock data (you can replace this with a real API call)
    const cryptoData = [
        {
            name: "Bitcoin",
            symbol: "BTC",
            price: "$45,000",
            change: "+5.3%",
            volume: "$38,000,000",
            positive: true
        },
        {
            name: "Ethereum",
            symbol: "ETH",
            price: "$3,200",
            change: "-2.1%",
            volume: "$18,000,000",
            positive: false
        },
        {
            name: "Ripple",
            symbol: "XRP",
            price: "$1.25",
            change: "+1.7%",
            volume: "$12,000,000",
            positive: true
        },
        {
            name: "Litecoin",
            symbol: "LTC",
            price: "$170",
            change: "+3.4%",
            volume: "$5,000,000",
            positive: true
        }
    ];

    // Function to create and display each crypto card
    function createCryptoCard(crypto) {
        const card = document.createElement('div');
        card.classList.add('stock-card');

        const name = document.createElement('h3');
        name.classList.add('stock-name');
        name.textContent = `${crypto.name} (${crypto.symbol})`;

        const price = document.createElement('p');
        price.classList.add('stock-price');
        price.textContent = crypto.price;

        const change = document.createElement('p');
        change.classList.add('stock-change');
        change.textContent = crypto.change;
        change.classList.add(crypto.positive ? 'positive' : 'negative');

        const volume = document.createElement('p');
        volume.classList.add('stock-volume');
        volume.textContent = `24h Volume: ${crypto.volume}`;

        // Append the elements to the card
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(change);
        card.appendChild(volume);

        // Append the card to the grid
        cryptoGrid.appendChild(card);
    }

    // Generate all the crypto cards
    cryptoData.forEach(crypto => createCryptoCard(crypto));

});