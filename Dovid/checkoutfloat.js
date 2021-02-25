let selector = 'YOUR SELECTOR';

var button = document.querySelector(selector);

let styles = window.getComputedStyle(button);

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        )
}

let sticky = document.createElement('div');
let clone = button.cloneNode(true);
let stickyStyle = `visibility: hidden; 
background-color: ${styles.getPropertyValue('background-color')};
color: ${styles.getPropertyValue('color')};
font-family: ${styles.getPropertyValue('font-family')};
margin: auto;
text-align: center; 
display: flex;
align-items: center;
justify-content: center;
height: 60px; 
width: 60px; 
position: fixed; 
left: 0px; 
top: 45%;
z-index: 999;`
sticky.style.cssText = stickyStyle;
sticky.innerHTML = button.innerHTML;
document.body.append(sticky);

sticky.addEventListener('click', function(){
    sticky.innerHTML = '';
    clone.style.height = '60px';
    sticky.appendChild(clone);
    sticky.addEventListener('click', () => {button.click()});
    sticky.style.cssText = styles;
    sticky.style.width = '120px';
    sticky.style.height = '60px';
    sticky.style.position = 'fixed';
    sticky.style.left = '0px';
    sticky.style.top = '45%';
    setTimeout(() => {
        sticky.textContent = '';
        sticky.innerHTML = button.innerHTML;
        sticky.style.cssText = stickyStyle;
        sticky.style.visibility = "visible";
    }, 2000);
})

window.addEventListener('scroll', function(){
    if(isInViewport(button)){
        sticky.style.visibility = "hidden";
    } else {
        
        sticky.style.visibility = "visible";
        
    }
})
    