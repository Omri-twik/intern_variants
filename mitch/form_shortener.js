// https://go.cyberbit.com/free-remote-cyber-range-training-may-2020/
// https://cannx.org/contact-us/?g-recaptcha-response=03AGdBq26BR2A7Dw_I6W6F6dKFrp24CeKqECCqA_arHC5B67eDDBeDTlkqjc0YPKZDmKM9NM_mFWAniSnHW6N6SB9LQnzoLLkfzrG9r3NFNSwx54npVBRPFe263h1v4XHVhrMrcBA4WhijUWXtd7rrwivJWp7XAUPewifVo1JJKdfJ1O9kVC4ZOXUWOSC6L4-9Xq-EYfvbzU244-jJWwmBpY5jXLqOr18in3U8o6YCIldfe4zZjIvFpPW6reJcQGqcLf2HU0ARYIw-WmDNrfsYPrPfpWXJAK1b_0Y2-GiOJftZS6YwGE3bt7JesEhintWYvgouHxxzsUtdAyk82ykx3bfjUrjB6sn0yUPQu5x-9l9-z78epMaDJgoL4B1byhkClMhiVUL6Iw9OK73uOUDYwMOPCJWDU2NXIo16jHuXEGmm2nGKPAKq2QWdI8efak8-8bA5oV_Q6EW2#1563968033321-469e182a-bf95


const tw_form = document.getElementsByTagName("FORM")[0];
const form_action = tw_form.getAttribute('action');
const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const email = document.getElementById("work_email");
const company = document.getElementById("company");
const phone = document.getElementById("phone_number");
const job_title = document.getElementById("job_title");
const soc = document.getElementById("soc_team_size");
const apply_btn = document.getElementById("lp-pom-button-506");
const bottom_txt = document.getElementById("lp-pom-text-511");
const form_wrap = document.getElementById("lp-pom-box-504");


function hide_element(element) {
	element.style.display = "none";
}


function email_valid(domain) {
    var bad_emails = ['gmail', 'icloud', 'mail', 'mail.ru', 'aol', 'yahoo', 'zoho', 'outlook', 'gmx', 'lycos', 'yandex'];
	if (bad_emails.includes(domain)) {
		return false;
	} else {
		return true;
	}
}


function email_check_and_alert() {
	let email_data = email.value;
	let company_name = email_data.substring((email_data.indexOf('@') + 1), email_data.lastIndexOf('.'))
	if (!email_valid(company_name)) {
		alert("Invalid email domain - please provide a company email");
		email.value = "";
	}
}


function dom_manipulate_form() {
	// combine name fields
	first_name.setAttribute('placeholder', "Full Name");
	hide_element(document.getElementById("container_last_name"));
	last_name.removeAttribute('required');

	// hide company field
	hide_element(document.getElementById("container_company"));
	company.removeAttribute('required');

	// fix positioning
	email.parentElement.style.top = '52px';
	phone.parentElement.style.top = '104px';
	job_title.parentElement.style.top = '156px';
	soc.parentElement.style.top = '208px';
	apply_btn.style.top = '260px';
	bottom_txt.style.top = '420px';
	form_wrap.style.height = '498px';

	// add email check
	email.setAttribute("onfocusout", "email_check_and_alert()");

	// prep form for submission delay
	tw_form.removeAttribute("action");
	tw_form.removeAttribute("method");
	tw_form.setAttribute("ID", "form_tw");

	tw_form.addEventListener("submit", (e) => {
		e.preventDefault();

		const request = new XMLHttpRequest();
		request.open("post", form_action);

		// organize form data for back end
		request.onload = function () {
			alert(first_name.value);
			alert(last_name.value);
			alert(email.value);
			alert(company.value);

			
			let full_name_data = first_name.value;
			let first_name_data = full_name_data.substring(0, full_name_data.indexOf(' '));
			let last_name_data = full_name_data.substring((full_name_data.indexOf(' ') + 1), full_name_data.length);

			first_name.value = first_name_data;
			last_name.value = last_name_data;

			let email_data = email.value;
			let company_name = email_data.substring((email_data.indexOf('@') + 1), email_data.lastIndexOf('.'))

			if (email_valid(company_name)) {
				company.value = company_name;

				alert("GOOD");
				alert(first_name.value);
				alert(last_name.value);
				alert(email.value);
				alert(company.value);

				request.send(new FormData(tw_form));
			} else {
				alert("Email must be a company email");
				return false;
			}
		}
	});
}

// execute:
dom_manipulate_form();







// cannx

// const tw_form = document.getElementById("wpforms-form-5643");
// const form_action = tw_form.getAttribute('action');
// // const form_method = "POST";

// const first_name = document.getElementById("wpforms-5643-field_0");
// const last_name = document.getElementById("wpforms-5643-field_0-last");
// const email = document.getElementById("wpforms-5643-field_1");


// function hide_element(element) {
// 	element.style.display = "none";
// }


// function dom_manipulate_form() {
// 	// combine name fields
// 	first_name.setAttribute('placeholder', "Full Name");
// 	hide_element(document.getElementsByClassName("wpforms-field-row-block wpforms-one-half")[1]);



// 	// prep form for submission delay
// 	tw_form.removeAttribute("action");
// 	tw_form.removeAttribute("method");
// 	tw_form.setAttribute("ID", "form_tw");

// 	tw_form.addEventListener("submit", (e) => {
// 		e.preventDefault();

// 		const request = new XMLHttpRequest();

// 		request.open("post", form_action);

// 		request.onload = function () {
// 			alert(first_name.value);
// 			alert(last_name.value);
// 			alert(email.value);

// 			let full_name_data = first_name.value;
// 			let first_name_data = full_name_data.substring(0, full_name_data.indexOf(' '));
// 			let last_name_data = full_name_data.substring((full_name_data.indexOf(' ') + 1), full_name_data.length);

// 			first_name.value = first_name_data;
// 			last_name.value = last_name_data;

// 			let email_data = email.value;
// 			let company_name = email_data.substring((email_data.indexOf('@') + 1), email_data.lastIndexOf('.'))


//             if (email_valid(company_name)) {
// 				company.value = company_name;
// 				alert("GOOD");
// 			} else {
// 				alert("Email must be a company email");
// 				return false;
// 			}




// 			alert(first_name.value);
// 			alert(last_name.value);
// 			alert(email.value);
// 			alert(company_name);

// 		}

// 		request.send(new FormData(tw_form));
// 	});
// }

// function email_valid(domain) {
//     var bad_emails = ['gmail', 'icloud', 'mail', 'mail.ru', 'aol', 'yahoo', 'zoho', 'outlook', 'gmx', 'lycos', 'yandex'];

// 	if (bad_emails.includes(domain)) {
// 		return false;
// 	} else {
// 		return true;
// 	}

// }

// dom_manipulate_form();