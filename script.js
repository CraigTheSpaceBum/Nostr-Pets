// Function to load content dynamically
function loadContent(page) {
    // Fetch the HTML content of the requested page
    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            // Replace the content of the #content div with the loaded HTML
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading content:', error);
            document.getElementById('content').innerHTML = "<p>Error loading content. Please try again.</p>";
        });
}

// Load the default page (global.html) when the page first loads
window.onload = function() {
    loadContent('global.html');
};


// JavaScript to cycle through groups every 3-4 seconds with a fade effect
let currentGroup = 0;
const groups = document.querySelectorAll('.group');

function showNextGroup() {
    groups[currentGroup].classList.remove('active'); // Hide current group
    currentGroup = (currentGroup + 1) % groups.length; // Move to next group
    groups[currentGroup].classList.add('active'); // Show the next group
}

// Initially show the first group
groups[currentGroup].classList.add('active');

// Cycle through groups every 3.5 seconds
setInterval(showNextGroup, 3500);


