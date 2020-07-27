

(function init_page() {
	// create and add icon cdn to document head
	let icon_link = document.createElement("LINK");
	icon_link.setAttribute("rel", "stylesheet");
	icon_link.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
	document.head.appendChild(icon_link);

	// append buttons to all search boxes that are inside of forms
	set_dictate_buttons();

	// set event for window resize
	let body = document.getElementsByTagName("BODY")[0];
	body.setAttribute("onresize", "recalc_button_position()");





// ***************************************************************************************************************
	// handle search bar icons
	let all_buttons = document.getElementsByTagName("BUTTON");
	for (let b of all_buttons) {
		for (let c of b.classList) {
			if (c.includes('search')) {
				// b.setAttribute("onmouseover", "recalc_button_position()");
				b.setAttribute("onmouseout", "set_dictate_buttons()");
			}
		}
	}
// ***************************************************************************************************************





})()


function set_dictate_buttons() {
	let textInputs = document.getElementsByTagName("INPUT");
	for (let ti in textInputs) {
		if (check_for_form_parent(textInputs[ti]) == true) {
			let container = textInputs[ti].parentElement;
			if (textInputs[ti]['placeholder']) {
				if (textInputs[ti]['type'] == 'text' || textInputs[ti]['type'] == 'email' || textInputs[ti]['type'] == 'search') {
					let btn = create_button();
					btn.setAttribute("ID", "button_for_" + ti);
					btn.addEventListener('click', function() {
						recognition.start();
						sessionStorage.setItem("current_text_box", "search_target_" + ti);
						let mics = document.getElementsByClassName("fa-microphone");
						for (let mic of mics) {
							mic.style.color = '#8b0000'
						}
						container.addEventListener("click", function(event){
							event.returnValue = false;
						});
					});

					set_button_position(textInputs[ti], btn);
					document.body.appendChild(btn);

					textInputs[ti].setAttribute("ID", "search_target_" + ti);
					textInputs[ti].removeAttribute('autocomplete');
					textInputs[ti].classList.add("ti_tw");
					console.log("[+] Dictate button created");
				}
			}
		}
	}
}


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


function set_button_position(target, button) {
	if (isElementInViewport(button) == true && target) {
		let search_rect = target.getBoundingClientRect();
		let btn_rect = button.getBoundingClientRect();

		let right = search_rect.right;
		let right_pct = (right / window.innerWidth) * 100;
		let button_left = right_pct;

		let top = search_rect.top;
		let button_top = (top + 3);

		if (document.getElementsByTagName("HEADER")[0].style.position == 'FIXED') {
			button.style.position = 'fixed';
		} else {
			button.style.position = 'absolute';
		}

		let size = window.innerWidth;
		// 1080 ///////////////////////////////////////////////////////////
		if (size >= 1600) {
			button.style.left = (button_left - 1.5) + "%";
		} else if (1400 <= size < 1600) {
			button.style.left = (button_left - 1.8) + "%";
		} else if (1080 <= size < 1400) {
			button.style.left = (button_left - 3.8) + "%";
		} else if (960 <= size < 1080) {
			button.style.left = (button_left - 5) + "%";
			console.log(button_left);
		} else if (900 <= size < 960) {
			button.style.left = (button_left - 10) + "%";
		} else if (600 <= size < 900) {
			button.style.left = (button_left - 5) + "%";
		} else if (size < 600) {
			button.style.left = (button_left - 40) + "%";
		}

		button.style.top = (button_top + 1.4) + "px";
	} else {
		button.style.display = "none";
	}
}


function recalc_button_position() {
	console.log("[+] Calc");
	let buttons = document.getElementsByClassName("dictate_btn");
	for (let button of buttons) {
		button.style.display = "none";
		console.log("true");
	}
	var rtime;
	var timeout = false;
	var delta = 200;
	$(window).resize(function() {
		console.log("RE");
	    rtime = new Date();
	    if (timeout === false) {
	        timeout = true;
	        setTimeout(resizeend, delta);
	    }
	});

	function resizeend() {
		console.log("end");
	    if (new Date() - rtime < delta) {
	        setTimeout(resizeend, delta);
	    } else {
	        timeout = false;

	        let btns = document.getElementsByClassName("dictate_btn");
			for (let btn of btns) {
				let btn_id = btn.id;
				let id_num = btn_id.slice(-1);
				let tar = document.getElementById("search_target_" + id_num);
				set_button_position(tar, btn);
				btn.style.display = 'block';
			}
			console.log("done");
	    }               
	}
}


function display_buttons() {
	console.log("[+] Disp");
	let btns = document.getElementsByClassName("dictate_btn");
	for (let btn of btns) {
		if (isElementInViewport(btn)) {
			btn.style.display = 'block';
		}
	}
}


function isElementInViewport(el) {
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
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






