let selector = "enter your selector here";
let rootDiv = document.getElementById('root');
let coButtons = document.querySelector(selector);
let contentDiv = document.getElementById('content');
let stickyDiv = document.createElement('div');
let iconCart = document.createElement('span');
let rootElement = document.documentElement;
let cssStyle = document.createElement('style');
cssStyle.innerHTML = `
.CheckOutButtons {
    display: flex;
}

.sticky {
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    width: min-content;
    padding: 0 1vw;
    height: 6vh;
    margin-top: 25%;
    position: fixed;
    align-items: center;
    justify-content: center;
    display: flex;
    top: 0;
    left: 0;
    bottom: 0;
    opacity: 1;
    background-color: orangered;
    z-index: 1;
    border-radius: 0 25% 25% 0;
}

.iconCart {
    font-size: 30px;
    color: white;
}

.expand {
    /* transition: min-content 0.5s ease; */
    padding: 0 1vw;
    border-radius: 0 5% 5% 0;
    /* width: 20%; */
    /* padding: 0 5px; */
    height: 6vh;
    width: min-content;
    transform: scaleX(1);
    transform-origin: left;
}

.sticky.hide {
    overflow: hidden;
    transition:transform 1s ease-in;
    opacity: 0;
    transform: scaleX(0);
}
`;
let fontAwesome = `<script async defer src="https://kit.fontawesome.com/08ab31cae7.js" crossorigin="anonymous"></script>`;
document.head.insertAdjacentHTML("beforeend", fontAwesome);
document.head.appendChild(cssStyle);
iconCart.classList.add('iconCart');
iconCart.innerHTML = `<i class="fas fa-shopping-cart"></i>`;
stickyDiv.appendChild(iconCart);
stickyDiv.classList.add('sticky', 'hide');
rootDiv.appendChild(stickyDiv);
function handleScroll() {
    let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if ((rootElement.scrollTop / scrollTotal) > 0.05) {
        stickyDiv.classList.remove('hide');
    } else {
        stickyDiv.classList.add('hide');
        rootDiv.insertBefore(coButtons);
        stickyDiv.classList.remove('expand');
    }
}
document.addEventListener("scroll", handleScroll);

stickyDiv.addEventListener('mouseenter', event => {
    stickyDiv.classList.add('expand');
    stickyDiv.appendChild(coButtons);
    stickyDiv.removeChild(iconCart);
})

stickyDiv.addEventListener('mouseleave', event => {
    stickyDiv.classList.remove('expand');
    stickyDiv.removeChild(coButtons);
    stickyDiv.appendChild(iconCart);  
})