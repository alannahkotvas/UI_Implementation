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

function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart')) || {};
    let productContainer = document.querySelector('.products');
    let cartCost = parseInt(localStorage.getItem('totalCost')) || 0;

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';

        Object.values(cartItems).forEach(item => {
            productContainer.innerHTML += `
                <div class='product'>
                    <ion-icon name="close"></ion-icon>
                    <img src="./cartimages/${item.tag}.png">
                    <span>${item.name}</span>
                </div>
                <div class="price">${item.price}</div>
                <div class="quantity">
                    <ion-icon class="decrease" name="remove-circle-outline"></ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon class="increase" name="add-circle-outline"></ion-icon>
                </div>
                <div class="total">
                    ${item.inCart * item.price}
                </div>
            `;
        });

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

// code aint working from here on T^T in console it says "cannot read properties of undefined"
// it says inCart is undefined. 



//function for increase and decrease items

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

// function to remove items in cart
function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

onLoadCartNumbers();
displayCart();
