// stock.js

document.addEventListener("DOMContentLoaded", () => {
    // Sample stock data, which you can replace with data from an API
    const stockData = [
        { name: "Apple Inc. (AAPL)", price: 178.56, change: +1.35, volume: 34200000, symbol: "AAPL" },
        { name: "Tesla Inc. (TSLA)", price: 233.42, change: -2.45, volume: 28100000, symbol: "TSLA" },
        { name: "Amazon.com Inc. (AMZN)", price: 122.78, change: +0.89, volume: 42700000, symbol: "AMZN" },
        { name: "Microsoft Corp. (MSFT)", price: 299.99, change: +0.58, volume: 22200000, symbol: "MSFT" },
        // Add more stocks here or fetch from an API
    ];

    // Get the container where stock cards will be appended
    const stockGrid = document.getElementById("stock-grid");

    // Function to create stock card elements
    const createStockCard = (stock) => {
        const card = document.createElement("div");
        card.classList.add("stock-card");

        const name = document.createElement("h3");
        name.classList.add("stock-name");
        name.textContent = stock.name;

        const price = document.createElement("p");
        price.classList.add("stock-price");
        price.textContent = `$${stock.price.toFixed(2)}`;

        const change = document.createElement("p");
        change.classList.add("stock-change");
        change.classList.add(stock.change >= 0 ? "positive" : "negative");
        change.textContent = `${stock.change >= 0 ? "+" : ""}${stock.change.toFixed(2)}%`;

        const volume = document.createElement("p");
        volume.classList.add("stock-volume");
        volume.textContent = `Volume: ${stock.volume.toLocaleString()}`;

        const detailsLink = document.createElement("a");
        detailsLink.href = `details/${stock.symbol.toLowerCase()}.html`; // Assume detail pages are named by symbol (e.g., aapl.html)
        detailsLink.classList.add("btn-primary");
        detailsLink.textContent = "View Details";

        // Append all elements to the card
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(change);
        card.appendChild(volume);
        card.appendChild(detailsLink);

        return card;
    };

    // Loop through each stock and create a card for it
    stockData.forEach((stock) => {
        const stockCard = createStockCard(stock);
        stockGrid.appendChild(stockCard);
    });
});
