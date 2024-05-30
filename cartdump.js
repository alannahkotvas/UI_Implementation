//makes sure html is done loading
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

//makes sure remove item from cart removes the entire row 
function ready() {
var removeCartItemButtons = document.getElementsByClassName('btn-danger') //stores all buttons w the class btn-danger
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
}

var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for (var i = 0; i < quantityInputs.length; i++) {
var input = quantityInputs[i]
input.addEventListener('change', quantityChanged)
}

// Remove / Add to cart rahhhh ive been working for 8 hours straight help me pls just work oml im crying ToT
//add to cart - imma kms
var addToCartButtons = document.getElementsByClassName('shop-item-button')
for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
}
}

// remove from cart - working fine
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
}

//changes the price total when the quantity of the item is changed :D
function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <=0){
        input.value = 1
    }
    updateCartTotal()
}

//adds each element of the product to the cart section NOT GOING WELL SEND HELP
function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
}

function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement('div')
    cartRow.innerText = title
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartRowContents = '<div class="cart-item cart-column"><img class="cart-item-image" src="Product Images/PersonalisedBalloon.png"> </div> <div class="cart-text"> <span class="cart-item-title">Personalised Balloon</span> <span class="cart-price cart-column">$75.00</span> <span class="cart-item-message">Happy Birthday</span> <div class="cart-quantity cart-column"><button class="btn btn-danger" type="button">remove from cart</button><input class="cart-quantity-input" type="number" min="1" value="1"></div></div>'
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
}
//changes total cost after items have been changed/ removed

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')
        [0]
        var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}


















let products = [
    {
        name: 'Personalised Bubble Ballon',
        tag: 'bubbleballoons',
        price: 75,
        inCart: 0
    },
    {
        name: 'Birthday Balloons',
        tag: 'birthdayballoons',
        price: 99,
        inCart:0
    }
];

for (let i=0; i<carts.length; i++){
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i])
    })

}

//never gonna run if we dont call. so we call it at the bottom this is so that code will remember the amount of items in cart even when we refresh the page. 
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

//function for updating the number next to cart icon 

function cartNumbers(products) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(products);
}
function setItems(products) {
    let cartItems = localStorage.getItem('productsInCart');   //updating the cart 
    cartItems = JSON.parse(cartItems);

    if(cartItems !=null){    //if cartItems is not zero then something already exist
        if(cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].inCart += 1; 
    }else{
        products.inCart = 1;    //when u are clicking down the first time 
    cartItems = {
        [products.tag]: products  
    }     
    }

    localStorage.setItem('productsInCart', JSON.stringify    //we need to pass this not as a js object but as a JSON object hence we use this here
    (cartItems));
}

function totalCost(products){
//console.log("The product price is", products.price);
    let cartCost = localStorage.getItem('totalCost');
       //make it into a number
    console.log('mary cartcost is', cartCost);
    console.log(typeof cartCost);
    if(cartCost !=null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + products.price);
    }else{
        localStorage.setItem("totalCost", products.price);
    }

}
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products');

    console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class='product'>
                <ion-icon name="close-outline"></ion-icon>
                <img src="./cartimages/${item.tag}.png">
                <span>${item.name}</span>
            </div>
            `
            
        });
    }
}

onLoadCartNumbers(); //call here 
displayCart();