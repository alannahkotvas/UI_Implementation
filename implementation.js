document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const query = document.querySelector('.search-input').value.trim().toLowerCase();

    if (query) {
        // Check for specific queries and redirect accordingly
        if (query.includes('birthday')) {
            window.location.href = 'products.html'; // Fix: URL should be a string
        } else {
            // Redirect to "not found" page
            window.location.href = 'notfoundpage.html';
        }
    }
});


const toggleButton = document.getElementById('toggleButton');
const navLinks = document.getElementById('navLinks');

toggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});