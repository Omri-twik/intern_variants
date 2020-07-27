// Problems:
// 1. Hiding extra "out of place" buttons that sometimes get rendered from media queries
//	      a. button_validity_check(x,y) doesn't work properly for every situation yet
// 2. Displaying buttons on sites like https://colourpop.com/, where the search box is
//	  rendered upon clicking the search icon
// 3. On scroll, some sites have fixed search area and some move with the scroll of the page


function init_page() {
	// create and add icon cdn to document head
	let icon_link = document.createElement("LINK");
	icon_link.setAttribute("rel", "stylesheet");
	icon_link.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
	document.head.appendChild(icon_link);

	// set event for window resize
	let body = document.getElementsByTagName("BODY")[0];
	body.setAttribute("onresize", "recalc_button_position()");
}


function find_visible_search_boxes() {
	let textInputs = document.getElementsByTagName("INPUT");
	for (let ti in textInputs) {
		if (textInputs[ti].offsetWidth > 0 && textInputs[ti].offsetHeight > 0) {
			if (check_for_form_parent(textInputs[ti]) == true) {
				let container = textInputs[ti].parentElement;
				if (textInputs[ti]['placeholder']) {
					if (textInputs[ti]['type'] == 'text' || textInputs[ti]['type'] == 'email' || textInputs[ti]['type'] == 'search') {
						textInputs[ti].setAttribute("ID", "search_target_" + ti);
						textInputs[ti].removeAttribute('autocomplete');
						textInputs[ti].classList.add("search_box_tw");
						console.log("[+] Visible textbox captured");
					}
				}
			}
		}
	}
}


function append_buttons() {
	let search_boxes = document.getElementsByClassName("search_box_tw");
	for (let box of search_boxes) {
		let container = box.parentElement;
		let box_id = box.id.slice(box.id.lastIndexOf('_') + 1, box.id.length);
		let btn = create_button();
		btn.setAttribute("ID", "button_for_" + box_id);
		btn.addEventListener('click', function() {
			recognition.start();
			sessionStorage.setItem("current_text_box", "search_target_" + box_id);
			let mics = document.getElementsByClassName("fa-microphone");
			for (let mic of mics) {
				mic.style.color = '#8b0000'
			}
			container.addEventListener("click", function(event){
				event.returnValue = false;
			});
		});

		set_button_position(box, btn);
		document.body.appendChild(btn);
	}
	// find and remove extra buttons
	// for (let box of search_boxes) {
	// 	let box_id_num = box.id.slice(-1);
	// 	let corr_btn = document.getElementById("button_for_" + box_id_num);
	// 	button_validity_check(box, corr_btn);
	// 	let final_button = document.getElementById("button_for_" + box_id_num);
	// 	if (final_button) {
	// 		final_button.style.display = 'block';
	// 	}
	// }
}


// bugs - sometimes removes target button *************************************************
function button_validity_check(s_box, button) {
	console.log("current", button);
	let search_rect = s_box.getBoundingClientRect();
	let s_top = search_rect.top;
	let s_right = search_rect.right;
	let s_bottom = search_rect.bottom;
	let s_left = search_rect.left;

	let all_buttons = document.getElementsByClassName("dictate_btn");
	for (let b of all_buttons) {
		console.log(b, button);
		if (b != button) {
			let b_left_str = b.style.left;
			let b_left = Number(b_left_str.slice(0, -1));
			b_left = (b_left / 100) * window.innerWidth;
			b_right = b_left + b.offsetWidth;
			let b_top_str = b.style.top;
			let b_top = Number(b_top_str.slice(0, -2));
			b_bottom = b_top + b.offsetHeight;
			console.log(b_top, b_right, b_bottom, b_left);
			if (b_left > s_left && b_right < s_right) {
				if (b_top < s_top || b_bottom > s_bottom) {
					b.style.display = 'none';
					b.remove();
					console.log("removed", b);
				}
			}
		}
	}
}


// executions
init_page();
find_visible_search_boxes();
append_buttons();


function check_for_form_parent(el) {
	let parent = el.parentElement;
	for (let i=0; i<4; i++) {
		try {
			if (parent.tagName == 'FORM') {
				return true;
			}
			parent = parent.parentElement;
		}
		catch {
			return false;
		}
	}
	return false;
}


function create_button() {
	let btn = document.createElement("BUTTON");
	btn.setAttribute("CLASS", "dictate_btn");
	btn.style.zIndex = 100;
	btn.style.borderRadius = '50%';
	btn.style.backgroundColor = 'none';
	btn.style.border = '0px';
	let microphone = document.createElement("i");
	microphone.classList.add("fa");
	microphone.classList.add("fa-microphone");
	microphone.style.fontSize = '24px';
	microphone.style.color = 'red';
	btn.appendChild(microphone);
	return btn;
}


function set_button_position(s_box, button) {
	let search_rect = s_box.getBoundingClientRect();

	let right = search_rect.right;
	let right_pct = (right / window.innerWidth) * 100;
	let button_left = right_pct;

	let top = search_rect.top;
	let button_top = (top + 3);

	button.style.left = (button_left - 1.5) + "%";
	button.style.top = (button_top + 1.4) + "px";
	button.style.position = 'absolute';
	// button.style.display = 'none';
	button.style.display = 'block';
}


function recalc_button_position() {
	let buttons = document.getElementsByClassName("dictate_btn");
	for (let button of buttons) {
		button.remove();
	}
	var rtime;
	var timeout = false;
	var delta = 200;
	$(window).resize(function() {
	    rtime = new Date();
	    if (timeout === false) {
	        timeout = true;
	        setTimeout(resizeend, delta);
	    }
	});

	function resizeend() {
	    if (new Date() - rtime < delta) {
	        setTimeout(resizeend, delta);
	    } else {
	        timeout = false;
	        find_visible_search_boxes();
			append_buttons();
	    }               
	}
}





// speech-to-text
var message = "";
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var grammar = '#JSGF V1.0;';

var recognition = new SpeechRecognition();
var SpeechRecognitionGrammarList = new SpeechGrammarList();
SpeechRecognitionGrammarList.addFromString(grammar, 1);

recognition.grammars = SpeechRecognitionGrammarList;
recognition.lang = 'en-US';
recognition.interimResults = false;


recognition.onresult = function(event) {
	let mics = document.getElementsByClassName("fa-microphone");
		for (let mic of mics) {
			mic.style.color = 'red'
		}
	var last = event.results.length -1;
	var command = event.results[last][0].transcript;
	message = command;
	let box_id = sessionStorage.getItem("current_text_box");
	let target = document.getElementById(box_id);
	target.value = message;
	console.log(message);
	
	// reactivate form submission capability
	for (let el of target.parentElement.children) {
		if (el['type'] == 'submit') {
			el.addEventListener("click", function(event){
				target.parentElement.submit();
			});
		}
	}
	target.addEventListener("keypress", function(event){
		console.log(target);
		if (event.keyCode == 13) {
			console.log("YES");
			target.parentElement.submit();
		}
	});
}


recognition.onspeechend = function() {
	recognition.stop();
}


recognition.onerror = function(event) {
	message = 'Error occurred in recognition: ' + event.error;
}
