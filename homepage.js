// =================== SEARCH BAR ======================== //

// Add an event listener to the search form
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the search query, trim it, and convert it to lowercase
    const query = document.querySelector('.search-input').value.trim().toLowerCase();

    // Check if the query is not empty
    if (query) {
        // Check for what is being searched and redirect accordingly
        if (query.includes('birthday')) {
            window.location.href = 'products.html'; // Redirect to products page if query includes 'birthday'
        } else {
            window.location.href = 'notfoundpage.html'; // Redirect to "not found" page for other queries
        }
    }
});

// ==================== NAVBAR ============================ //

// Get the toggle button and nav links elements
const toggleButton = document.getElementById('toggleButton');
const navLinks = document.getElementById('navLinks');

// Add an event listener to the toggle button to show/hide nav links
toggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// ================ NUMBER OF ITEMS IN CART ================ //

// Selecting all elements with the class 'shop-item-button'
let carts = document.querySelectorAll('.shop-item-button');

// Function to update the number next to the cart icon when the page loads
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    // Check if there are product numbers in local storage
    if (productNumbers) {
        // Set the cart icon's text content to the number of products in the cart
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

// Load the cart numbers when the page loads
onLoadCartNumbers();
