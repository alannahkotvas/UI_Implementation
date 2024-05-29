document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const query = document.querySelector('.search-input').value.trim().toLowerCase();

    if (query) {
        // Check for specific queries and redirect accordingly
        if (query.includes('birthday')) {
            window.location.href = 'products.html'; // Fix: URL should be a string
        } else {
            // Navigate to a generic search results page with the query as a URL parameter
            window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
        }
    }
});

