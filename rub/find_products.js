
let all_products = [];

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
		return all_products;
	}

find_products();
