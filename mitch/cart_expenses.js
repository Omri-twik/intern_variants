// sale_point will be updated according to site admin specs
const sale_point = 10;


function Get(yourUrl){
    var Httpreq = new XMLHttpRequest();
    async: true;
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}


function find_cart_targets() {
	let site_json = "/cart.json";
	var json_obj = JSON.parse(Get(site_json));
	console.log("[+] Capturing cart data...");
	var items = json_obj;

	let cart_targets = {};
	cart_targets['currency'] = items['currency'];
	cart_targets['total_price'] = items['total_price'];

	return cart_targets;
}


function currency_convert_to_USD(currency, amount) {
		let currency_json = JSON.parse(Get("https://api.exchangeratesapi.io/latest"));
		console.log(currency_json);
		let euro_conversion_rate = currency_json['rates'][currency];
		let euro_amount = amount / euro_conversion_rate / 100;
		let usd_amount = euro_amount * currency_json['rates']['USD'];
		
		return usd_amount;
}


function generatePopup() {
    if (window.jQuery) {
        $ = window.jQuery;
        $("html")
            .attr("data-wf-page", "5d0752128518927d140033ab")
            .attr("data-wf-site", "5b27ad71f471c80738d206f5");
        if (
            $("link").filter(
                "[href='https://public.twik.io/css/popup-bundle.min.css']"
            ).length == 0
        ) {
            $(
                '<link href="https://public.twik.io/css/popup-bundle.min.css" rel="stylesheet" type="text/css">'
            ).appendTo("head");
        }
        if ($("div.regularsection").length == 0) {
            $('<div class="regularsection _100vh">').appendTo("body");
        }
        $(
            '<div class="relativepopup "><div id="popup-container" class="popup-container image-on-top" data-sm-init="true" data-state="success"><div class="popup-half-column"><div class="popup-title bigger-title" style="color: #000000">25% OFF</div><p class="popup-description" style="color: #686868">Enjoy 25% off your entire order. No exclusions.</p><div class="popup-discount"><div class="popup-discount-code popup-subtitle" style="color: #d93434">SAVE25</div></div><div id="temp-countdown" class="placeholder-section"></div><div class="button-group round vertical"><a href="/shop" class="popup-button popup-main-button w-button popup-button1" style="color: #ffffff;background-color: #D93434;">Shop now</a><div id="temp-button2" class="placeholder-section"></div></div><p style="font-size: 14px; color: #868686; margin-bottom: 24px; margin-top: -12px;">© Free <a href="https://www.twik.io/resources/popup-generator/" target="_blank" style="text-decoration: none; font-size: 14px; color: #868686;">popup generator</a> by Twik</p></div><div class="popup-half-column popup-image-full"><img class="popup-image" src="" sizes="342px" alt=""></div></div></div>'
        ).appendTo("div.regularsection");
        if (
            $("script").filter(
                "[src='https://public.twik.io/js/popup-bundle.min.js']"
            ).length == 0
        ) {
            $.getScript("https://public.twik.io/js/popup-bundle.min.js", function () {
                var params = {
                    popup_type: "instant",
                    popup_position: "center",
                    popup_animation: "slideBottom",
                    popup_closeButtonPlace: "inside",
                    popup_css: {
                        "text-align": "center",
                        margin: "0px",
                        padding: "0",
                        background: "transparent",
                    },
                };
                $(".popup-container").SlickModals(params);
            });
        } else {
            var params = {
                popup_type: "instant",
                popup_position: "center",
                popup_animation: "slideBottom",
                popup_closeButtonPlace: "inside",
                popup_css: {
                    "text-align": "center",
                    margin: "0px",
                    padding: "0",
                    background: "transparent",
                },
            };
            $(".popup-container").SlickModals(params);
        }
    } else {
        var script = document.createElement("SCRIPT");
        script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
        script.type = "text/javascript";
        script.onload = function () {
            var $ = window.jQuery;
            $("html")
                .attr("data-wf-page", "5d0752128518927d140033ab")
                .attr("data-wf-site", "5b27ad71f471c80738d206f5");
            if (
                $("link").filter(
                    "[href='https://public.twik.io/css/popup-bundle.min.css']"
                ).length == 0
            ) {
                $(
                    '<link href="https://public.twik.io/css/popup-bundle.min.css" rel="stylesheet" type="text/css">'
                ).appendTo("head");
            }
            if ($("div.regularsection").length == 0) {
                $('<div class="regularsection _100vh">').appendTo("body");
            }
            $(
                '<div class="relativepopup "><div id="popup-container" class="popup-container image-on-top" data-sm-init="true" data-state="success"><div class="popup-half-column"><div class="popup-title bigger-title" style="color: #000000">25% OFF</div><p class="popup-description" style="color: #686868">Enjoy 25% off your entire order. No exclusions.</p><div class="popup-discount"><div class="popup-discount-code popup-subtitle" style="color: #d93434">SAVE25</div></div><div id="temp-countdown" class="placeholder-section"></div><div class="button-group round vertical"><a href="/shop" class="popup-button popup-main-button w-button popup-button1" style="color: #ffffff;background-color: #D93434;">Shop now</a><div id="temp-button2" class="placeholder-section"></div></div><p style="font-size: 14px; color: #868686; margin-bottom: 24px; margin-top: -12px;">© Free <a href="https://www.twik.io/resources/popup-generator/" target="_blank" style="text-decoration: none; font-size: 14px; color: #868686;">popup generator</a> by Twik</p></div><div class="popup-half-column popup-image-full"><img class="popup-image" src="" sizes="342px" alt=""></div></div></div>'
            ).appendTo("div.regularsection");
            if (
                $("script").filter(
                    "[src='https://public.twik.io/js/popup-bundle.min.js']"
                ).length == 0
            ) {
                $.getScript(
                    "https://public.twik.io/js/popup-bundle.min.js",
                    function () {
                        var params = {
                            popup_type: "instant",
                            popup_position: "center",
                            popup_animation: "slideBottom",
                            popup_closeButtonPlace: "inside",
                            popup_css: {
                                "text-align": "center",
                                margin: "0px",
                                padding: "0",
                                background: "transparent",
                            },
                        };
                        $(".popup-container").SlickModals(params);
                    }
                );
            } else {
                var params = {
                    popup_type: "instant",
                    popup_position: "center",
                    popup_animation: "slideBottom",
                    popup_closeButtonPlace: "inside",
                    popup_css: {
                        "text-align": "center",
                        margin: "0px",
                        padding: "0",
                        background: "transparent",
                    },
                };
                $(".popup-container").SlickModals(params);
            }
        };
        document.getElementsByTagName("head")[0].appendChild(script);
    }
}


let cart_data = find_cart_targets();
let usd_price = currency_convert_to_USD(cart_data['currency'], cart_data['total_price']);


if (usd_price > sale_point) {
	generatePopup();
}
