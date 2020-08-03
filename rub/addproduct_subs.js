let all_products = [];
let all_products_id = [];

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest();
    async: true;
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

function find_products() {
		let more_pages = true;
		counter = 1;
		while (more_pages == true) {
			let site_json = "/products.json?limit=250&page=" + counter;
			var json_obj = JSON.parse(Get(site_json));
			if (json_obj["products"].length > 0) {
				console.log("[+] Capturing products data page " + counter + "...");
				var items = json_obj["products"];
				for (let item of items) {
					for (variant of item["variants"]){
						if (variant["available"] == false) {
							all_products.push(item);
						}
					}
				}
				counter += 1;
			} else {
				console.log("[+] Product capture complete (" + all_products.length + " items)");
				more_pages = false;
			}
		}
	return console.log(all_products);
}

function find_products_id(products){
	for (i in products){
		id = products[i]["id"]
		all_products_id.push(id)
	}
	return all_products_id
}


function notify_button() {
//Grab the Form
	let pform= document.querySelector("form[action='/cart/add']")
// Grab the button "SOLD OUT"
	let sold_btn
	if (pform.querySelector("button[type='submit']")) {
		sold_btn= pform.querySelector("button[type='submit']")
	} else {
		sold_btn= pform.querySelector("input[type='button']")
	}
// remove the button
	sold_btn.remove()

// get product details
	let product_details = window.location.href+".js"
	var json_product_details = JSON.parse(Get(product_details))
	let product_name= json_product_details["title"]
	let product_id= json_product_details["id"]

//Create Form
	let notify_form= document.createElement("form")
	notify_form.setAttribute('method',"post")
	notify_form.setAttribute('action',"/contact#contact_form")
	notify_form.setAttribute('accept-charset',"UTF-8")

	let notify_input1=document.createElement("input")
	notify_input1.setAttribute('type',"hidden")
	notify_input1.setAttribute('name',"form_type")
	notify_input1.setAttribute('value',"customer")

	let notify_input2=document.createElement("input")
	notify_input2.setAttribute('type',"hidden")
	notify_input2.setAttribute('name',"utf8")
	notify_input2.setAttribute('value',"✓")

	let notify_input3=document.createElement("input")
	notify_input3.setAttribute('required',"required")
	notify_input3.setAttribute('type',"email")
	notify_input3.setAttribute('name',"contact[email]")
	notify_input3.setAttribute('placeholder',"Email address")
	notify_input3.setAttribute('class',"Form__Input")
	notify_input3.style.display= "inline"
	notify_input3.style.width= "70%"

	let notify_input4=document.createElement("input")
	notify_input4.setAttribute('type',"hidden")
	notify_input4.setAttribute('name',"contact[body]")
	notify_input4.setAttribute('value',"Please notify me when this is back in stock: "+product_name+" / "+product_id)
	console.log(notify_input4.value)

	let notify_input5=document.createElement("input")
	notify_input5.setAttribute('type',"submit")
	notify_input5.setAttribute('value',"Notify me!")
	notify_input5.setAttribute('style',copyStyles_sold_btn)
	notify_input5.style.display= "inline"
	notify_input5.style.width= "30%"

	notify_form.appendChild(notify_input1)
	notify_form.appendChild(notify_input2)
	notify_form.appendChild(notify_input3)
	notify_form.appendChild(notify_input4)
	notify_form.appendChild(notify_input5)

	pform.appendChild(notify_form)
	return pform
}

function notify_run(){

	let product_view = window.location.href+".js"
	var json_product_view = JSON.parse(Get(product_view))
	if (all_products_id.indexOf(json_product_view["id"]) != -1){
		notify_button()
		console.log(all_products_id.indexOf(json_product_view["id"]))
	}
}



let pform= document.querySelector("form[action='/cart/add']")

let sold_btn
	if (pform.querySelector("button[type='submit']")) {
		sold_btn= pform.querySelector("button[type='submit']")
	} else {
		sold_btn= pform.querySelector("input[type='button']")
	}

let copyStyles_pform = window.getComputedStyle(pform);
let copyStyles_sold_btn = window.getComputedStyle(sold_btn);

find_products();
find_products_id(all_products);
notify_run()
notify_button()


