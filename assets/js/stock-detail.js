// stock-detail.js
const stockData = {
    AAPL: {
        name: "Apple Inc.",
        price: 178.56,
        change: 1.35,
        volume: "34.2M",
        marketCap: "2.9T",
        peRatio: 28.5,
        earningsYield: 3.5,
        eps: 6.22,
        priceToSales: 7.5,
        priceToBook: 30.3,
        currentRatio: 1.3,
        debtToEquity: 1.0,
        returnOnEquity: 35.6,
        dividendYield: 0.6,
    },
    TSLA: {
        name: "Tesla Inc.",
        price: 233.42,
        change: -2.45,
        volume: "28.1M",
        marketCap: "745B",
        peRatio: 42.1,
        earningsYield: 2.4,
        eps: 5.44,
        priceToSales: 12.4,
        priceToBook: 16.8,
        currentRatio: 1.2,
        debtToEquity: 1.2,
        returnOnEquity: 21.3,
        dividendYield: 0.0,
    },
    AMZN: {
        name: "Amazon.com Inc.",
        price: 122.78,
        change: 0.89,
        volume: "42.7M",
        marketCap: "1.3T",
        peRatio: 58.3,
        earningsYield: 1.7,
        eps: 2.10,
        priceToSales: 3.8,
        priceToBook: 14.9,
        currentRatio: 1.6,
        debtToEquity: 0.7,
        returnOnEquity: 25.4,
        dividendYield: 0.0,
    }
};

function getStockSymbolFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('symbol');
}

function displayStockDetails(stock) {
    const stockInfoDiv = document.getElementById('stock-info');

    const stockName = document.createElement('h1');
    stockName.textContent = stock.name;
    stockInfoDiv.appendChild(stockName);

    const stockPrice = document.createElement('p');
    stockPrice.textContent = `Price: $${stock.price}`;
    stockInfoDiv.appendChild(stockPrice);

    const stockChange = document.createElement('p');
    stockChange.textContent = `Change: ${stock.change}%`;
    stockInfoDiv.appendChild(stockChange);

    const stockVolume = document.createElement('p');
    stockVolume.textContent = `Volume: ${stock.volume}`;
    stockInfoDiv.appendChild(stockVolume);

    const stockMarketCap = document.createElement('p');
    stockMarketCap.textContent = `Market Cap: ${stock.marketCap}`;
    stockInfoDiv.appendChild(stockMarketCap);

    const stockPE = document.createElement('p');
    stockPE.textContent = `PE Ratio: ${stock.peRatio}`;
    stockInfoDiv.appendChild(stockPE);

    const stockEarningsYield = document.createElement('p');
    stockEarningsYield.textContent = `Earnings Yield: ${stock.earningsYield}%`;
    stockInfoDiv.appendChild(stockEarningsYield);

    const stockEPS = document.createElement('p');
    stockEPS.textContent = `EPS: $${stock.eps}`;
    stockInfoDiv.appendChild(stockEPS);

    const stockPToS = document.createElement('p');
    stockPToS.textContent = `Price to Sales: ${stock.priceToSales}`;
    stockInfoDiv.appendChild(stockPToS);

    const stockPToB = document.createElement('p');
    stockPToB.textContent = `Price to Book: ${stock.priceToBook}`;
    stockInfoDiv.appendChild(stockPToB);

    const stockCurrentRatio = document.createElement('p');
    stockCurrentRatio.textContent = `Current Ratio: ${stock.currentRatio}`;
    stockInfoDiv.appendChild(stockCurrentRatio);

    const stockDebtToEquity = document.createElement('p');
    stockDebtToEquity.textContent = `Debt to Equity Ratio: ${stock.debtToEquity}`;
    stockInfoDiv.appendChild(stockDebtToEquity);

    const stockROE = document.createElement('p');
    stockROE.textContent = `Return on Equity: ${stock.returnOnEquity}%`;
    stockInfoDiv.appendChild(stockROE);

    const stockDividendYield = document.createElement('p');
    stockDividendYield.textContent = `Dividend Yield: ${stock.dividendYield}%`;
    stockInfoDiv.appendChild(stockDividendYield);
}

function initializeStockDetail() {
    const stockSymbol = getStockSymbolFromUrl();
    if (stockSymbol && stockData[stockSymbol]) {
        displayStockDetails(stockData[stockSymbol]);
    } else {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = "Stock details not available.";
        document.getElementById('stock-info').appendChild(errorMessage);
    }
}

// Initialize the stock detail page
initializeStockDetail();