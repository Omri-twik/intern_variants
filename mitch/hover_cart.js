function Get(yourUrl){
    var Httpreq = new XMLHttpRequest();
    async: true;
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}


function find_cart_button() {
	// find all potential elements
	let head_container = document.querySelector("header");
	for (let item of head_container.querySelectorAll("*")) {
	    if (typeof(item) == 'object') {
	        for (let c of item.classList) {
	        	if (c.includes('cart')) {
	        		item.classList.add("cart-button-mn")
	        	}
	        	if (c.includes('bag')) {
	        		item.classList.add("cart-button-mn")
	        	}
	        }
	    }
	}
	// from potentials, find which element is highest and most left on page
	let targets = document.getElementsByClassName("cart-button-mn");
	let highest = 0;
	let leftist = 0;
	let final_element;
	for (let target of targets) {
		var rect = target.getBoundingClientRect();
		if (rect.top > highest) {
			highest = rect.top;
			final_element = target;
		} else if (rect.top == highest) {
			if (rect.left > leftist) {
				leftist = rect.left;
				final_element = target;
			}
		}
	}
	return final_element;
}


function display_cart_box() {
	let table = document.getElementById("cart-table");
	table.style.display = 'block';
	table.style.position = 'absolute';
	table.style.top = '3vh';
	table.style.width = '30vw';
	table.style.right = '3vw';
	table.style.right = ((table.style.width)*-1);
	table.style.zIndex = '10000';
	return
}


function hide_cart_box() {
	let table = document.getElementById("cart-table");
	table.style.display = 'none';
	return
}



let site_json = "/cart.json";
var json_obj = JSON.parse(Get(site_json));
console.log("[+] Capturing cart data...");
var items = json_obj.items;


// capture data that we want to display
let cart_data_mn = []
for (let item of items) {
	let temp_data = {
		'product_title': item.title,
		'image': item.image,
		'price': item.line_price,
		'quantity': item.quantity,
	};
	cart_data_mn.push(temp_data)
}
console.log("[+] Data successfully captured");


// create and style table
let cart_table = document.createElement("TABLE");
cart_table.setAttribute('id', 'cart-table');
cart_table.style.backgroundColor = 'white';
cart_table.style.color = 'black';
cart_table.style.border = '1px solid black';
cart_table.style.padding = '15px';
cart_table.style.display = 'none';
console.log("[+] Cart table created: ");


// access shopping cart button on site and add hover attributes
let cart_mn = find_cart_button()
cart_mn.setAttribute('onmouseover', 'display_cart_box()');
cart_mn.setAttribute('onmouseout', 'hide_cart_box()');
console.log(cart_mn);


// append our shopping cart table to correct area of page (underneath shopping cart icon)
cart_mn.appendChild(cart_table);


// create title rows
let head_row = cart_table.insertRow(0);
head_row.style.fontWeight = 'bold';
head_row.style.textDecoration = 'underline';
head_row.style.fontSize = '1.25em';

let pic_head = head_row.insertCell(0);
pic_head.innerText = "Item";

let header1 = head_row.insertCell(1);
header1.innerText = "";

let header2 = head_row.insertCell(2);
header2.innerText = "Quantity";

let header3 = head_row.insertCell(3);
header3.innerText = "Price";


// populate table with cart data
for (let dict of cart_data_mn) {
	let item_row;
	item_row = cart_table.insertRow(-1);

	let item_pic = item_row.insertCell(0);
	let picture = document.createElement("IMG");
	picture.setAttribute("src", dict['image']);
	picture.setAttribute("width", "100px");
	picture.setAttribute("height", "100px");
	picture.setAttribute("alt", "PIC");
	item_pic.append(picture);

	let item_title = item_row.insertCell(1);
	item_title.innerText = dict['product_title'];

	let item_quantity = item_row.insertCell(2);
	item_quantity.innerText = dict['quantity'];

	let item_price = item_row.insertCell(3);
	let the_price = String(dict['price']);
	let before_dec = the_price.substr(0, (the_price.length - 1));
	let after_dec = the_price.substr((the_price.length - 2), the_price.length);
	item_price.innerText = before_dec + "." + after_dec + " " + String(Shopify.currency.active);

}
console.log("[+] Cart data successfully populated");


// additional styling/reformatting table properties
let cells = document.getElementsByTagName('TD');
for (let cell of cells) {
    cell.setAttribute('style', 'padding-right: 20px; padding-left: 20px; padding-bottom: 20px');
}
console.log("[+] Hover cart ready");
