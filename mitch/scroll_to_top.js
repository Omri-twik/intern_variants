
// Initialize button
let scroll_to_top_button = document.createElement("BUTTON");
scroll_to_top_button.innerHTML = "^";
scroll_to_top_button.style.fontSize = "2.5em";
scroll_to_top_button.style.display = 'none';
scroll_to_top_button.style.position = 'fixed';
scroll_to_top_button.style.bottom = '15px';
scroll_to_top_button.style.right = '50%';
scroll_to_top_button.style.backgroundColor = '#27556C';
scroll_to_top_button.style.color = 'white';
scroll_to_top_button.style.borderRadius = '50%';
scroll_to_top_button.style.border = '1px solid black';
scroll_to_top_button.style.boxShadow = "10px 8px 10px -5px black;"
scroll_to_top_button.style.height = '75px';
scroll_to_top_button.style.width = '75px';
scroll_to_top_button.style.scrollBehavior = 'smooth';
scroll_to_top_button.style.zIndex = '1';
scroll_to_top_button.setAttribute("onclick", "topFunction()");
scroll_to_top_button.setAttribute("id", "scroll_btn");
document.body.appendChild(scroll_to_top_button);


window.onscroll = function() {scrollFunction()};

// When the user scrolls down 10px from the top of the document, show the button
function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    scroll_to_top_button.style.display = "flex";
    scroll_to_top_button.style.justifyContent = "center";
    scroll_to_top_button.style.alignItems = "center";
    scroll_to_top_button.style.textAlign = "center";
    scroll_to_top_button.style.overflow = "hidden";
  } else {
    scroll_to_top_button.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
}


