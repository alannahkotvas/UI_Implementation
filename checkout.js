//navbar 
const toggleButton = document.getElementById('toggleButton');
const navLinks = document.getElementById('navLinks');

toggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});



//chosing between pickup and delivery options 
function toggleDeliveryForm() {
    let shipOption = document.getElementById("ship");
    let deliveryForm = document.getElementById("deliveryForm");
    if (shipOption.checked) {
        deliveryForm.style.display = "block";
    } else {
        deliveryForm.style.display = "none";
    }
}


