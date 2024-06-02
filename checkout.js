// ==================== NAVBAR ============================ //

// Get the toggle button and nav links elements
const toggleButton = document.getElementById('toggleButton');
const navLinks = document.getElementById('navLinks');

// Add an event listener to the toggle button to show/hide nav links
toggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// ======= CHOOSING BETWEEN PICKUP AND DELIVERY OPTIONS ======= //

// Function to toggle the delivery form visibility based on the selected shipping option
function toggleDeliveryForm() {
    let shipOption = document.getElementById("ship"); // Get the ship option checkbox
    let deliveryForm = document.getElementById("deliveryForm"); // Get the delivery form

    // Check if the ship option is checked
    if (shipOption.checked) {
        deliveryForm.style.display = "block"; // Show the delivery form
    } else {
        deliveryForm.style.display = "none"; // Hide the delivery form
    }
}

