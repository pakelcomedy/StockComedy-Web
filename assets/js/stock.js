// stock.js
const stockData = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.56, change: 1.35, volume: '34.2M' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 233.42, change: -2.45, volume: '28.1M' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 122.78, change: 0.89, volume: '42.7M' }
];

function createStockCard(stock) {
    const stockCard = document.createElement('div');
    stockCard.classList.add('stock-card');

    const stockName = document.createElement('h3');
    stockName.textContent = `${stock.name} (${stock.symbol})`;
    stockCard.appendChild(stockName);

    const stockPrice = document.createElement('p');
    stockPrice.classList.add('stock-price');
    stockPrice.textContent = `$${stock.price}`;
    stockCard.appendChild(stockPrice);

    const stockChange = document.createElement('p');
    stockChange.classList.add('stock-change');
    stockChange.classList.add(stock.change > 0 ? 'positive' : 'negative');
    stockChange.textContent = `${stock.change > 0 ? '+' : ''}${stock.change}%`;
    stockCard.appendChild(stockChange);

    const stockVolume = document.createElement('p');
    stockVolume.classList.add('stock-volume');
    stockVolume.textContent = `Volume: ${stock.volume}`;
    stockCard.appendChild(stockVolume);

    const viewDetailsBtn = document.createElement('a');
    viewDetailsBtn.classList.add('btn-primary');
    viewDetailsBtn.href = `stock-detail.html?symbol=${stock.symbol}`;
    viewDetailsBtn.textContent = 'View Details';
    stockCard.appendChild(viewDetailsBtn);

    return stockCard;
}

function renderStockList() {
    const stockGrid = document.getElementById('stock-grid');
    stockData.forEach(stock => {
        const stockCard = createStockCard(stock);
        stockGrid.appendChild(stockCard);
    });
}

// Initialize stock list
renderStockList();