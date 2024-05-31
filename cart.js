let carts = document.querySelectorAll('.shop-item-button');

let products = [
    {
        name: 'Personalised Bubble Balloon',
        tag: 'bubbleballoons',
        price: 75,
        inCart: 0
    },
    {
        name: 'Birthday Balloons',
        tag: 'birthdayballoons',
        price: 99,
        inCart: 0
    }
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

// Function for updating the number next to cart icon
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

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

// Updating the cart
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

function totalCost(product, action) {
    let cartCost = parseInt(localStorage.getItem('totalCost')) || 0;

    if (action === "decrease") {
        localStorage.setItem('totalCost', cartCost - product.price);
    } else {
        localStorage.setItem('totalCost', cartCost + product.price);
    }
}


/*function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart')) || {};
    let productContainer = document.querySelector('.products');
    let cartCost = parseInt(localStorage.getItem('totalCost')) || 0;

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';

        for (let item in cartItems) {
            productContainer.innerHTML += `
                <div class='product'>
                    <ion-icon name="close" class="remove-item" data-tag="${cartItems[item].tag}"></ion-icon>
                    <img src="./cartimages/${cartItems[item].tag}.png">
                    <span>${cartItems[item].name}</span>
                </div>
                <div class="price">${cartItems[item].price}</div>
                <div class="quantity">
                    <ion-icon class="decrease" name="remove-circle-outline" data-tag="${cartItems[item].tag}"></ion-icon>
                    <span>${cartItems[item].inCart}</span>
                    <ion-icon class="increase" name="add-circle-outline" data-tag="${cartItems[item].tag}"></ion-icon>
                </div>
                <div class="total">
                    ${cartItems[item].inCart * cartItems[item].price}
                </div>
            `;
        }

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">$${cartCost}</h4>
            </div>
        `;
    }
    manageQuantity();
    deleteButtons();
}
//<div class="price">${item.price}</div> used to be on line 125
*/
function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart')) || {};
    let productContainer = document.querySelector('.products');
    let cartCost = parseInt(localStorage.getItem('totalCost')) || 0;

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';

        Object.values(cartItems).forEach(item => {
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
        });

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
// shenaniganery over ;p

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let cartItems = JSON.parse(localStorage.getItem('productsInCart')) || {};

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

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.remove-item');
    let cartItems = JSON.parse(localStorage.getItem('productsInCart')) || {};

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

onLoadCartNumbers();
displayCart();
