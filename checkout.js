function toggleDeliveryForm() {
    let shipOption = document.getElementById("ship");
    let deliveryForm = document.getElementById("deliveryForm");
    if (shipOption.checked) {
        deliveryForm.style.display = "block";
    } else {
        deliveryForm.style.display = "none";
    }
}