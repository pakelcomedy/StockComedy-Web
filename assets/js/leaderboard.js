// Sample leaderboard data (Rank, Name, Score)
const leaderboardData = [
    { rank: 1, name: "John Doe", score: 9500 },
    { rank: 2, name: "Jane Smith", score: 9200 },
    { rank: 3, name: "Michael Brown", score: 8900 },
    { rank: 4, name: "Lucas White", score: 8500 },
    { rank: 5, name: "Emily Green", score: 8200 },
    { rank: 6, name: "David Lee", score: 8000 },
    { rank: 7, name: "Sarah Wilson", score: 7800 },
    { rank: 8, name: "James Kim", score: 7600 },
    { rank: 9, name: "Olivia Brown", score: 7400 },
    { rank: 10, name: "Liam Clark", score: 7200 },
    { rank: 11, name: "Mason Scott", score: 7000 },
    { rank: 12, name: "Charlotte Harris", score: 6900 },
    { rank: 13, name: "Amelia Adams", score: 6800 },
    { rank: 14, name: "Ethan Taylor", score: 6700 },
    { rank: 15, name: "Abigail Martinez", score: 6600 },
    { rank: 16, name: "Benjamin Perez", score: 6500 },
    { rank: 17, name: "Sofia Thomas", score: 6400 },
    { rank: 18, name: "Aiden Rodriguez", score: 6300 },
    { rank: 19, name: "Zoe Harris", score: 6200 },
    { rank: 20, name: "Alexander Clark", score: 6100 },
    { rank: 21, name: "Grace Lewis", score: 6000 },
    { rank: 22, name: "Jack Walker", score: 5900 },
    { rank: 23, name: "Chloe Hall", score: 5800 },
    { rank: 24, name: "Luke Allen", score: 5700 },
    { rank: 25, name: "Scarlett Young", score: 5600 },
    { rank: 26, name: "Henry King", score: 5500 },
    { rank: 27, name: "Victoria Carter", score: 5400 },
    { rank: 28, name: "Wyatt Gonzalez", score: 5300 },
    { rank: 29, name: "Isabella Wilson", score: 5200 },
    { rank: 30, name: "Sebastian Evans", score: 5100 },
    { rank: 31, name: "Ella Davis", score: 5000 },
    { rank: 32, name: "Henry Young", score: 4900 },
    { rank: 33, name: "Mila Robinson", score: 4800 },
    { rank: 34, name: "Oliver Martinez", score: 4700 },
    { rank: 35, name: "Archer Moore", score: 4600 },
    { rank: 36, name: "Lily Miller", score: 4500 },
    { rank: 37, name: "Grayson Lewis", score: 4400 },
    { rank: 38, name: "Leah Allen", score: 4300 },
    { rank: 39, name: "Jackie Harris", score: 4200 },
    { rank: 40, name: "Samuel Wilson", score: 4100 },
    { rank: 41, name: "Megan Martinez", score: 4000 },
    { rank: 42, name: "Daniel Carter", score: 3900 },
    { rank: 43, name: "Harper Nelson", score: 3800 },
    { rank: 44, name: "Benjamin Lopez", score: 3700 },
    { rank: 45, name: "Evelyn Thompson", score: 3600 },
    { rank: 46, name: "Nolan Brown", score: 3500 },
    { rank: 47, name: "Madeline Lee", score: 3400 },
    { rank: 48, name: "William Young", score: 3300 },
    { rank: 49, name: "Sophia Anderson", score: 3200 },
    { rank: 50, name: "Jack Scott", score: 3100 },
    { rank: 51, name: "Ella Davis", score: 5000 },
    { rank: 52, name: "Henry Young", score: 4900 },
    { rank: 53, name: "Mason Clark", score: 4800 },
    { rank: 54, name: "Sophia Lee", score: 4700 },
    { rank: 55, name: "Daniel Green", score: 4600 },
    { rank: 56, name: "Charlotte Lewis", score: 4500 },
    { rank: 57, name: "Benjamin Wilson", score: 4400 },
    { rank: 58, name: "Lily Smith", score: 4300 },
    { rank: 59, name: "Lucas Robinson", score: 4200 },
    { rank: 60, name: "Mason Johnson", score: 4100 },
    { rank: 61, name: "Maya Thomas", score: 4000 },
    { rank: 62, name: "Henry Davis", score: 3900 },
    { rank: 63, name: "Amelia Clark", score: 3800 },
    { rank: 64, name: "Elijah Turner", score: 3700 },
    { rank: 65, name: "Scarlett Hall", score: 3600 },
    { rank: 66, name: "Isabella Wright", score: 3500 },
    { rank: 67, name: "Jackson Clark", score: 3400 },
    { rank: 68, name: "Matthew Anderson", score: 3300 },
    { rank: 69, name: "Victoria Moore", score: 3200 },
    { rank: 70, name: "Ethan Harris", score: 3100 },
    { rank: 71, name: "Avery Scott", score: 3000 },
    { rank: 72, name: "Oliver Thompson", score: 2900 },
    { rank: 73, name: "Chloe White", score: 2800 },
    { rank: 74, name: "Daniel Brown", score: 2700 },
    { rank: 75, name: "Scarlett Lee", score: 2600 },
    { rank: 76, name: "Aiden Taylor", score: 2500 },
    { rank: 77, name: "Grace Martinez", score: 2400 },
    { rank: 78, name: "Wyatt Johnson", score: 2300 },
    { rank: 79, name: "Leo Moore", score: 2200 },
    { rank: 80, name: "Mila Green", score: 2100 },
    { rank: 81, name: "Jack Lewis", score: 2000 },
    { rank: 82, name: "Liam Harris", score: 1900 },
    { rank: 83, name: "Nolan Young", score: 1800 },
    { rank: 84, name: "Maya Wilson", score: 1700 },
    { rank: 85, name: "Samuel Turner", score: 1600 },
    { rank: 86, name: "Grace Anderson", score: 1500 },
    { rank: 87, name: "Benjamin Brown", score: 1400 },
    { rank: 88, name: "Sophia Davis", score: 1300 },
    { rank: 89, name: "Harper Lee", score: 1200 },
    { rank: 90, name: "Amelia Harris", score: 1100 },
    { rank: 91, name: "Jackson Moore", score: 1000 },
    { rank: 92, name: "Ethan Taylor", score: 900 },
    { rank: 93, name: "Lucas Green", score: 800 },
    { rank: 94, name: "Olivia Davis", score: 700 },
    { rank: 95, name: "James Harris", score: 600 },
    { rank: 96, name: "Charlotte Lee", score: 500 },
    { rank: 97, name: "Liam Taylor", score: 400 },
    { rank: 98, name: "Avery Brown", score: 300 },
    { rank: 99, name: "Benjamin Lee", score: 200 },
    { rank: 100, name: "Sophie Clark", score: 100 }
];

// Function to generate leaderboard items
function generateLeaderboard() {
    const container = document.getElementById("leaderboard-container");

    leaderboardData.forEach(player => {
        let spotlightClass = "";

        // Apply spotlight classes based on rank
        if (player.rank <= 3) {
            spotlightClass = `spotlight-${player.rank}`; // spotlight-1, spotlight-2, spotlight-3
        } else if (player.rank <= 10) {
            spotlightClass = "spotlight-4"; // Spotlight for ranks 4-10
        } else if (player.rank <= 50) {
            spotlightClass = "spotlight-11-50"; // Spotlight for ranks 11-50
        } else {
            spotlightClass = "spotlight-51-100"; // Spotlight for ranks 51-100
        }

        // Create the leaderboard item
        const item = document.createElement("div");
        item.classList.add("leaderboard-item", spotlightClass);

        // Add player data to the item
        item.innerHTML = `
            <div class="rank">${player.rank}</div>
            <div class="player-name">${player.name}</div>
            <div class="score">${player.score}</div>
        `;

        // Append the item to the container
        container.appendChild(item);
    });
}

// Call the function to generate leaderboard when the page loads
window.onload = generateLeaderboard;
