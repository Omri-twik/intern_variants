let rootDiv = document.getElementById('root');
let coButtons = document.getElementById('mainCheckOut');
let contentDiv = document.getElementById('content');
let stickyDiv = document.createElement('div');
let iconCart = document.createElement('span');
iconCart.classList.add('iconCart');
iconCart.innerHTML = `<i class="fas fa-shopping-cart"></i>`;
stickyDiv.appendChild(iconCart);
stickyDiv.classList.add('sticky', 'hide');
rootDiv.appendChild(stickyDiv);
let rootElement = document.documentElement;
console.log(rootElement.scrollHeight);
console.log(rootElement.clientHeight);
function handleScroll() {
    let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if ((rootElement.scrollTop / scrollTotal) > 0.05) {
        stickyDiv.classList.remove('hide');
    } else {
        stickyDiv.classList.add('hide');
        rootDiv.insertBefore(coButtons, contentDiv);
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
    stickyDiv.appendChild(iconCart)  ;  
})

