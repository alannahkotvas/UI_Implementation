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


//getting the items to appear in cart
