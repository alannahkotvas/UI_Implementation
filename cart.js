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

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers) || 0;

    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;

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

function totalCost(product) {
    let cartCost = parseInt(localStorage.getItem('totalCost')) || 0;

    localStorage.setItem('totalCost', cartCost + product.price);
}

function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart')) || {};
    let productContainer = document.querySelector('.products');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';

        Object.values(cartItems).forEach(item => {
            productContainer.innerHTML += `
                <div class='product'>
                <ion-icon name="close"></ion-icon>
                <img src="./cartimages/${item.tag}.png">
                <span>${item.name}</span>
                </div>
                <div class = "price">${item.price}</div>
                <div class = "quantity">
                    <ion - icon class="decrease"
                    name="arrow-dropleft-circle"><ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon class="increase"
                    name="arrow-dropright-circle"></ion-icon>
                </div>

            `;
        });
    }
}

onLoadCartNumbers();
displayCart();
