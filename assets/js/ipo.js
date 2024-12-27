document.addEventListener('DOMContentLoaded', function() {
    const ipoGrid = document.getElementById('ipo-grid');

    // Mock data for upcoming IPOs (you can replace this with real API data)
    const ipoData = [
        {
            name: "Tech Innovators Ltd",
            symbol: "TIL",
            offeringPrice: "$20",
            listingDate: "2024-01-15",
            status: "Open for Subscription",
            positive: true
        },
        {
            name: "Green Earth Solutions",
            symbol: "GESS",
            offeringPrice: "$15",
            listingDate: "2024-01-20",
            status: "Open for Subscription",
            positive: true
        },
        {
            name: "Future Energy Corp",
            symbol: "FEC",
            offeringPrice: "$25",
            listingDate: "2024-02-05",
            status: "Coming Soon",
            positive: false
        },
        {
            name: "Global Ventures Inc",
            symbol: "GVI",
            offeringPrice: "$10",
            listingDate: "2024-02-10",
            status: "Open for Subscription",
            positive: true
        }
    ];

    // Function to create and display each IPO card
    function createIpoCard(ipo) {
        const card = document.createElement('div');
        card.classList.add('stock-card');

        const name = document.createElement('h3');
        name.classList.add('stock-name');
        name.textContent = `${ipo.name} (${ipo.symbol})`;

        const offeringPrice = document.createElement('p');
        offeringPrice.classList.add('stock-price');
        offeringPrice.textContent = `Offering Price: ${ipo.offeringPrice}`;

        const listingDate = document.createElement('p');
        listingDate.classList.add('stock-change');
        listingDate.textContent = `Listing Date: ${ipo.listingDate}`;

        const status = document.createElement('p');
        status.classList.add('stock-volume');
        status.textContent = `Status: ${ipo.status}`;

        const statusClass = ipo.positive ? 'positive' : 'negative';
        status.classList.add(statusClass);

        // Append the elements to the card
        card.appendChild(name);
        card.appendChild(offeringPrice);
        card.appendChild(listingDate);
        card.appendChild(status);

        // Append the card to the grid
        ipoGrid.appendChild(card);
    }

    // Generate all the IPO cards
    ipoData.forEach(ipo => createIpoCard(ipo));

});