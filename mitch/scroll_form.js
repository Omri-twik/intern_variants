
function elementInViewport(el) {
	var top = el.offsetTop;
	var left = el.offsetLeft;
	var width = el.offsetWidth;
	var height = el.offsetHeight;

	while(el.offsetParent) {
		el = el.offsetParent;
		top += el.offsetTop;
    	left += el.offsetLeft;
  	}
	console.log("[+] Form element detected");
  	return (
    	top >= window.pageYOffset &&
    	left >= window.pageXOffset &&
    	(top + height) <= (window.pageYOffset + window.innerHeight) &&
    	(left + width) <= (window.pageXOffset + window.innerWidth)
  	);
}


function getParentElement(el) {
	return el.parentElement;
}


function find_form() {
	let page_forms = document.getElementsByTagName("FORM");
	for (let form of page_forms) {
		if (form.style.visibility != 'hidden' && elementInViewport(form)) {
			form.classList.add("target-form-mn");
		}
	}
	console.log("[+] Form element found");
	return document.getElementsByClassName("target-form-mn")[0];
}


function find_form_container(form) {
	let page_elements = document.querySelectorAll("*");
	for (let element of page_elements) {
		for (let c of element.classList) {
			if (c.includes('form')) {
	        		element.classList.add("potential-relation-mn");
	        	}
		}
		if (element.getAttribute('id')) {
			if (element.getAttribute('id').includes('form')) {
				element.classList.add("potential-relation-mn");
				console.log(element);
			}
		}
	}

	let target_form = document.getElementsByClassName("target-form-mn")[0];

	let form_container = getParentElement(target_form);
	let previous_container;
	let final = false;
	while (final == false) {
		if (form_container.classList.contains('potential-relation-mn')) {
			previous_container = form_container;
			form_container = getParentElement(previous_container);
		} else {
			final = true;
		}
	}

	if ((previous_container.offsetHeight - target_form.offsetHeight) > 60) {
		previous_container = previous_container.childNodes[0];
	}
	console.log("[+] Form container found");
	return previous_container;
}


function find_bottom_position(target_form) {
	let rect = target_form.getBoundingClientRect();
	return (rect.bottom);
}



// Create stylesheet and append to page 
var style = document.createElement('style');
style.innerHTML =
	'.popout-left:not(.clicked) {' +
		'position: fixed;' +
		'width: 22vw;' +
		'top: 100px;' +
		'left: 10px;' +
		'z-index: 10000;' +
		'opacity: 1;' +
	'}' + 
	'.popout-right:not(.clicked) {' +
		'position: fixed;' +
		'width: 22vw;' +
		'top: 100px;' +
		'right: 10px;' +
		'z-index: 10000;' +
		'opacity: 1;' +
	'}' + 
	'.clicked {' +
		'color: transparent;' +
		'font-size: 0;' +
	'}';

var ref = document.querySelector('script');
ref.parentNode.insertBefore(style, ref);

// find form and then select its container
let form_mn = find_form();
let form_container = find_form_container(form_mn);
let y = find_bottom_position(form_container);

// create hide button
let hide = document.createElement('a');
hide.style.visibility = 'hidden';
hide.innerHTML = '[hide]';
hide.style.color = 'black';
hide.style.cursor = 'pointer';
hide.setAttribute('onclick', "form_container.classList.remove('popout-right')");
hide.setAttribute('onclick', "form_container.classList.remove('popout-left')");
hide.setAttribute('onclick', "form_container.classList.add('clicked')");
form_container.appendChild(hide);

// get form side of page
let rect = form_container.getBoundingClientRect();
let onLeft;
if (rect.left > (window.screen.width / 2)) {
	onLeft = true;
} else {
	onLeft = false;
}


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	if (document.body.scrollTop > y || document.documentElement.scrollTop > y) {
    	if (onLeft) {
    		form_container.classList.add('popout-left');
    		hide.style.visibility = 'visible';
    	} else {
    		form_container.classList.add('popout-right');
    		hide.style.visibility = 'visible';
    	}

	} else {
		form_container.classList.remove('popout-left');
		form_container.classList.remove('popout-right');
		hide.style.visibility = 'hidden';
	}
}
