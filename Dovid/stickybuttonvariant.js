let selector = '#product-47041 > div.summary.entry-summary.bidded-product.has_no_sale_price > form > button';

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
position: fixed; 
left: 0px; 
top: 65vh;
z-index: 999;`

sticky.style.cssText = stickyStyle;

document.body.append(sticky);

// if(clone.style.backgroundColor ==''){
//     clone.style.backgroundColor='whitesmoke';
// }
clone.classList.add('sticky-button');
clone.style.setProperty("border-radius", "0px 5px 5px 0px", "important");
clone.style.setProperty("padding-left", "10px", "important");
clone.style.setProperty("padding-right", "10px", "important");
clone.style.setProperty("height", "60px", "important");
sticky.appendChild(clone);

sticky.addEventListener('click', () => {button.click()});

window.addEventListener('scroll', function(){
    if(isInViewport(button)){
        sticky.style.visibility = "hidden";
    } else {
        
        sticky.style.visibility = "visible";
        
    }
})
    


// #MainContent > div.page-width.use-body-bgcolor.page-width--no-padding > form > div > div > input
// #shopify-section-header > header > div.links > div > div.header-link.additional-links-right > a