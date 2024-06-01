//selecting the button element
let carts = document.querySelectorAll('.shop-item-button');

// Define the products object
let products = {
    'bubbleballoons': {
        name: 'Personalised Bubble Balloon',
        tag: 'bubbleballoons',
        price: 75,
        inCart: 0
    },
    'birthdayballoons': {
        name: 'Birthday Balloons',
        tag: 'birthdayballoons',
        price: 99,
        inCart: 0
    }
};

// Add event listeners to each cart button using a for loop
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        // Get the product tag from the data attribute
        let productTag = carts[i].getAttribute('data-product');
        // Update cart numbers and total cost
        cartNumbers(products[productTag]);
        totalCost(products[productTag]);
    });
}

// Function for updating the number next to the cart icon
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

// Function to update the number of items in the cart
function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers) || 0;

    if (action === "decrease") {
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
    } else {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }

    setItems(product);
}

// Function to set the items in the cart and update local storage
function setItems(product) {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart')) || {};

    if (!cartItems[product.tag]) {
        product.inCart = 1;
        cartItems[product.tag] = product;
    } else {
        cartItems[product.tag].inCart += 1;
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

// Function to update the total cost of the cart
function totalCost(product, action) {
    let cartCost = parseInt(localStorage.getItem('totalCost')) || 0;

    if (action === "decrease") {
        localStorage.setItem('totalCost', cartCost - product.price);
    } else {
        localStorage.setItem('totalCost', cartCost + product.price);
    }
}
// Function to display the cart items
function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart')) || {};
    let productContainer = document.querySelector('.products');
    let cartCost = parseInt(localStorage.getItem('totalCost')) || 0;

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';

        // Using a for loop instead of Object.values
        for (let key in cartItems) {
            if (cartItems.hasOwnProperty(key)) {
                let item = cartItems[key];
                productContainer.innerHTML += `
                <div class='productAll'>
                    <img class="product-image" src="./cartimages/${item.tag}.png">
                        <div class='product'>
                            <span class="item-name">${item.name}</span>
                            <span name="close" class="remove-item" data-tag="${item.tag}"> Remove from cart</span>

                            <div class="quantity">
                                <ion-icon class="decrease" name="remove-circle-outline" data-tag="${item.tag}"></ion-icon>
                                <span>${item.inCart}</span>
                                <ion-icon class="increase" name="add-circle-outline" data-tag="${item.tag}"></ion-icon>
                            </div>

                            <div class="total">
                            ${'total cost: $' + item.inCart * item.price}
                            </div>

                        </div>
                    
                </div>
                `;
            }
        }

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotal">Estimated total: $${cartCost}</h4>
                <span>shipping calculated at checkout</span>
            </div>
        `;
    }
    manageQuantity();
    deleteButtons();
}

// Function to manage quantity adjustments
function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let cartItems = JSON.parse(localStorage.getItem('productsInCart')) || {};

    // for loop for decrease button
    for (let i = 0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', function() {
            let productTag = this.getAttribute('data-tag');
            if (cartItems[productTag].inCart > 1) {
                cartItems[productTag].inCart -= 1;
                cartNumbers(cartItems[productTag], "decrease");
                totalCost(cartItems[productTag], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });
    }

    // for loop for increase button
    for (let i = 0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener('click', function() {
            let productTag = this.getAttribute('data-tag');
            cartItems[productTag].inCart += 1;
            cartNumbers(cartItems[productTag]);
            totalCost(cartItems[productTag]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

// Function to handle item removal from the cart
function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.remove-item');
    let cartItems = JSON.parse(localStorage.getItem('productsInCart')) || {};

    // for loop for delete button
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', function() {
            let productTag = this.getAttribute('data-tag');
            let productNumbers = localStorage.getItem('cartNumbers');
            let cartCost = localStorage.getItem('totalCost');

            localStorage.setItem('cartNumbers', productNumbers - cartItems[productTag].inCart);
            localStorage.setItem('totalCost', cartCost - (cartItems[productTag].price * cartItems[productTag].inCart));

            delete cartItems[productTag];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        });
    }
}

// Load the cart numbers when the page loads
onLoadCartNumbers();
// Display the cart items when the page loads
displayCart();
