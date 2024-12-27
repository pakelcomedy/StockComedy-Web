document.addEventListener('DOMContentLoaded', function () {
    // Get the "Home" link from the navigation
    const homeLink = document.querySelector('.nav-home-link'); // Use a specific class

    // Check if the link exists
    if (homeLink) {
        homeLink.addEventListener('click', function (event) {
            // Redirect to the home page
            window.location.href = '../index.html';
        });
    }
});
