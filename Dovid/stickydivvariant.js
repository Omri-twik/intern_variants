let selector = '';

let stickyDiv = document.querySelector(selector);
let parentDiv = stickyDiv.parentElement;


const stickyStyles = window.getComputedStyle(stickyDiv);
const selectHeight = stickyStyles.height;
const selectPosition = stickyStyles.position;
const selectTop = stickyStyles.top;
const selectLeft = stickyStyles.left;
const selectWidth = stickyStyles.width;
const parentStyles = window.getComputedStyle(parentDiv);


const divRectPosition = stickyDiv.getBoundingClientRect();
const parentRectPosition = parentDiv.getBoundingClientRect();

let divTop = stickyDiv.offsetTop;
let divWidth = divRectPosition.width + 'px';
const divLeft = divRectPosition.left + parseFloat(stickyStyles.paddingLeft || stickyStyles.padding.width) + 'px';

let blankDiv = document.createElement('div');
blankDiv.setAttribute('id', 'blankDiv');
blankDiv.style.cssText = `
width: ${divWidth};
height: ${stickyStyles.height};
background-color: ${parentStyles.getPropertyValue('background-color')};`;


function getDocTopDistance(element){
    let distance = 0;
    if (element.offsetParent){
        while(element){
            distance += element.offsetTop;
            element = element.offsetParent;
        }
    }
    return distance >= 0 ? distance : 0;
}
let divTopDistance = getDocTopDistance(stickyDiv);
let parentTopDistance = getDocTopDistance(parentDiv);
let fixedTop = divTopDistance - parentTopDistance + 'px';


var count = 0;
window.addEventListener('scroll', () => {
    if(window.pageYOffset > divTopDistance && window.pageYOffset < parentTopDistance + parseFloat(parentStyles.height) - parseFloat(selectHeight)){
        if(count == 0){
            parentDiv.replaceChild(blankDiv, stickyDiv);
            document.body.appendChild(stickyDiv);
            stickyDiv.style.position = 'fixed';
            stickyDiv.style.top = '0px';
            stickyDiv.style.left = divLeft;
            stickyDiv.style.width = selectWidth;
            count++
        }
    } else {
        if(count == 1){
            document.body.removeChild(stickyDiv);
            parentDiv.replaceChild(stickyDiv, blankDiv);
            stickyDiv.style.position = selectPosition;
            stickyDiv.style.top = selectTop;
            stickyDiv.style.left= selectLeft;
            count = 0; 
        }
    }
})
   