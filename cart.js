let carts = document.querySelectorAll('.shop-item-button'); //targets the add to cart button

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
        Object.values(cartItems).map(item =>{
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