/* This script creates a sticky button on the side of the screen that corresponds to 
the selected button of your choice. The sticky button will have similar styling 
to your original button and will act exactly the same as your original button. 
The sticky button will only appear when when the selected button is 
scrolled out of view. */


// SELECT A BUTTON: 
let selector = 'PASTE YOUR SELECTOR IN THESE QUOTES';

// Declares and clones selected button ---------------------
let selectedButton = document.querySelector(selector);
let clonedButton = selectedButton.cloneNode(true);

// Creates hidden sticky div -------------------------------
let stickyDiv = document.createElement('div');
stickyDiv.style.cssText = `visibility: hidden; 
position: fixed; 
left: 0px; 
top: 65vh;
z-index: 999;`;
document.body.append(stickyDiv);

// Appends clone into hidden sticky div ------------------------------
stickyDiv.appendChild(clonedButton);

// Styles cloned button appropriately --------------------------------
clonedButton.style.setProperty("border-radius", "0px 5px 5px 0px", "important");
clonedButton.style.setProperty("padding-left", "10px", "important");
clonedButton.style.setProperty("padding-right", "10px", "important");
clonedButton.style.setProperty("height", "60px", "important");


// Determines if an element is in view -------------------------------
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        )
}

//Checks if selected button is in view on every scroll ----------------

window.addEventListener('scroll', function(){
    
    // When selected button is in view sticky button is hidden ------------------
    if(isInViewport(selectedButton)){
        stickyDiv.style.visibility = "hidden";
    } 
    
    //When selected button is not in view sticky button becomes visible ---------
    else {
        stickyDiv.style.visibility = "visible";
        
    }
})

// When sticky button is clicked, selected button gets clicked automatically------
clonedButton.addEventListener('click', () => {selectedButton.click()});
