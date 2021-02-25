let selector = "enter your selector here";

let targetElement = document.querySelector(selector);
targetElement.innerHTML = document.createElement("div");

$("head").append(
  `<style><link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
  #cartBtn{
    height: 8vh;
    display: block;
    background: orange;  
    width: 8vh;
    display: none;
    transition:all 300ms linear;
  }
  
  
  #cartBtn .toggle-btn span{
    cursor:pointer;
    height: 8vh;
    display: block;
    background: orange;  
    width: 20vh;
    display: none;
    ursor:pointer;
  }
  
 .pay{
    height: 8vh;
    display: block;
    background: orange;  
    width: 20vh;
    
  } </style>`
);

$("body").append
(`<button id="cartBtn" class="fas fa-shopping-basket" onclick="cartBtnToggle(this)">
<div class="pay"> ${payBtn}</div>
</button>`);


let cartBtn = document.getElementById("cartBtn");
let stuck = false;
let rootElement = document.documentElement;
let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
let payBtn = appendChild.getElementsByName("add-to-cart")

window.onscroll = function(e) {
  let rootElement = document.documentElement;
  let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if ((rootElement.scrollTop / scrollTotal ) > 0.1) {
    cartBtn.style.marginTop= '50%';
    cartBtn.style.position = 'fixed';
    cartBtn.style.display = "block";
    stuck = true;
  } else {
    cartBtn.style.display = 'none'; 
  }
}



// function mOver(obj) {
//   cartBtn.innerHTML = "expand"
// }

// function mOut(obj) {
//   cartBtn.innerHTML = "Mouse Over Me"
// }

// cartBtn.onclick = function() {clicked()};

// function clicked() {
//   cartBtn.innerHTML = "expand cart";
// }


// function cartBtnToggle(ref){
//   cartBtn.classList.toggle('active');
// }

// cartBtn.onclick = function() {clicked()};

// function clicked() {
//   cartBtn.innerHTML = "expand cart";
// }

function cartBtnToggle(ref){
  cartBtn.classList.toggle('active');
  if(cartBtn.classList.toggle('active'))
  return payClick
}


