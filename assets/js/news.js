document.addEventListener('DOMContentLoaded', function() {
    const newsGrid = document.getElementById('news-grid');

    // Mock data for news articles (replace with real API or data source)
    const newsData = [
        {
            title: "Stock Market Hits New High Amid Economic Recovery",
            summary: "The stock market reached a new high this week, reflecting the growing optimism around the economic recovery post-pandemic.",
            date: "2024-12-25",
            sectors: ["Technology", "Finance"],
        },
        {
            title: "Cryptocurrency Market Faces Regulatory Pressure",
            summary: "Regulatory concerns over cryptocurrencies have led to volatility in the market, particularly affecting digital currencies like Bitcoin and Ethereum.",
            date: "2024-12-24",
            sectors: ["Cryptocurrency", "Finance"],
        },
        {
            title: "Tech Giant Announces Record-Breaking Earnings",
            summary: "A major tech company has announced record earnings, boosting investor confidence and highlighting the strength of the technology sector.",
            date: "2024-12-23",
            sectors: ["Technology", "Consumer Goods"],
        },
        {
            title: "Energy Prices Surge Due to Global Supply Chain Issues",
            summary: "Global supply chain disruptions are causing a spike in energy prices, with potential long-term effects on industries dependent on energy resources.",
            date: "2024-12-22",
            sectors: ["Energy", "Manufacturing"],
        }
    ];

    // Function to create and display each news card
    function createNewsCard(news) {
        const card = document.createElement('div');
        card.classList.add('news-card');

        const title = document.createElement('h3');
        title.classList.add('news-title');
        title.textContent = news.title;

        const summary = document.createElement('p');
        summary.classList.add('news-summary');
        summary.textContent = news.summary;

        const date = document.createElement('p');
        date.classList.add('news-date');
        date.textContent = `Published on: ${news.date}`;

        const sectors = document.createElement('p');
        sectors.classList.add('news-sectors');
        sectors.textContent = `Impact Sectors: ${news.sectors.join(', ')}`;

        // Append the elements to the card
        card.appendChild(title);
        card.appendChild(summary);
        card.appendChild(date);
        card.appendChild(sectors);

        // Append the card to the grid
        newsGrid.appendChild(card);
    }

    // Generate all the news cards
    newsData.forEach(news => createNewsCard(news));

});
