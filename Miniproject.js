//introduction
alert("Are you ready to draw?To begin just create a starting point anywhere in the canvas! Use the buttons to continue the rest of your drawing.")

const canvas = document.getElementById("Maincanvas");
const ctx = canvas.getContext("2d");
//setting up the x and y variable 
let x = 0;
let y = 0;
//drawing the intial dot on the canvas
canvas.addEventListener('click', getCoordinates, true)
function getCoordinates(e) {
    // x and y values for the initial click
    x = e.clientX;
    y = e.clientY;
    drawDot();
};
function drawDot() {
    const newDot = document.createElement('div');
    newDot.className = 'dot';
    newDot.style.left = x + 'px';
    newDot.style.top = y + 'px';
    document.body.appendChild(newDot); //add Dot to DOM
}
//set up the functions to create the pathway 
function left(){
    x -= 10; // move 10 pixels to the left
     drawDot();
}
function right(){
    x += 10;
    drawDot()
}
function up(){
    y -= 10; //something is wrong with the y because this goes up 
    drawDot()
}
function down(){
    y += 10 // this goes down 
    drawDot()
}

// wowww hihi 
//fjoewijfiowj