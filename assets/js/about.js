// about.js

document.addEventListener('DOMContentLoaded', function() {
    // Get the "Home" link from the navigation
    const homeLink = document.querySelector('a[href="#hero"]');
    
    // Add an event listener to handle the click
    homeLink.addEventListener('click', function(event) {
        // Prevent the default action (smooth scrolling or jumping)
        event.preventDefault();
        
        // Redirect to the home page (index.html)
        window.location.href = '../index.html';
    });
});