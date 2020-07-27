// SELECTORS:
// featured section = tw_featured
// featured product = featured_product_twik
// new section = tw_new
// new product = new_product_twik


const target_words = ["best seller", "best sellers", "best-seller", "bestseller", "best selling products", "featured product", "featured-picks", "featured picks", "recommended-products", "suggested-product-section", "ProductListWrapper", "featured", "trending now", "trending", "trending__wrapper", "popular", "favorites", "recent bestsellers", "latest", "just launched", "just dropped", "just released", "new", "whats new", "what's new", "additions", "arrivals", "recent", "slideshow", "slide", "clearance", "essential", "hot", "only at", "oz-homepage__curated_collection", "homepage-collection", "page-width", "index-section", "recommend", "customers love", "daily deals", "other people are loving"];
const mode_target = "featured";
// "bests" determines if product will be categorized as featured rather than new
const bests = ["best-seller_TWIK", "bestseller_TWIK", "featuredproduct_TWIK", "featured_TWIK", "bestsellingproducts_TWIK", "featured-picks_TWIK", "featured_picks_TWIK", "suggested-product-section_TWIK", "trendingnow_TWIK", "trending_TWIK", "trending__wrapper_TWIK", "popular_TWIK", "favorites_TWIK", "slideshow_TWIK", "slide_TWIK", "recent_bestsellers_TWIK", "essential_TWIK", "hot_TWIK", "page-width_TWIK", "recommend_TWIK", "customerslove_TWIK", "daily_deals_TWIK", "clearance_TWIK", "otherpeopleareloving_TWIK"];
// "target_classes" are the common class keywords that shopify sites use for each individual product
const target_classes = ["product", "product-item", "slideshow-slide", "slick-slide", "medium-up--one-quarter", "large-up--one-third", "product-list-card", "product-container", "productid", "lh-product-items", "one-sixth", "medium-up--one-fifth", "thumbnail", "1/4--lap-and-up", "small--one-half", "product-tile__container", "product-card-v2", "column-slider__item", "medium-up--one-third", "Carousel__Cell", "product-tile-container", "findify-components-common--grid__column", "one-fifth", "small--six-twelfths", "owl-item", "productgrid--item", "col-xl-3", "medium-up--one-half", "product-card", "suggested-product", "product-spotlight-carousel-cell", "clerk-design-component-2wOH91CK"];
const excluded_classes = ["aos-init", "blank", "promotion", "seaction_gape", "ugc__slide", "reviews-tt", "reviews-fb", "promo-1", "promo-2", "slideshow__slide--1585125808331", "site-header__dropdown-shop-category", "site-header__dropdown-shop-collection", "slideshow__slide--1591372636856"];
let featured_items;


function check_for_children(elem) {
	try {
		if (elem.children.length > 0) {
			return true;
		} else {
			return false;
		}
	}
	catch {
		return false;
	}	
}


// All target sections will receive the class "final_tw"
// "new" type sections can be acceessed by the class "tw_new"
// "featured" type sections can be acceessed by the class "tw_featured"
(function find_targets() {
	var allElements = document.querySelectorAll('*');
	var myElements = [];
	for (let element of allElements) {
		if (element.style.display != 'none') {
			if (element.tagName == "SECTION" || element.tagName == "DIV" || element.tagName == "H1" || element.tagName == "H2" || element.tagName == "H3" || element.tagName == "H4" || element.tagName == "H5" || element.tagName == "H6") {
				let innerString = String(element['innerHTML']).toLowerCase();
				for (let word of target_words) {
					if (innerString.indexOf(word) != -1 && innerString.indexOf('data-autoplay="true"') == -1 && innerString.indexOf('recently viewed') == -1) {
						if (innerString.indexOf('data-gaip') == -1 || innerString.indexOf('translate3d') == -1) {
							try {
								for (let c of element.classList) {
									if (c.toLowerCase().indexOf(mode_target) != -1 || c.toLowerCase().indexOf("slide") != -1 || c.toLowerCase().indexOf("suggested-product-section") != -1 || c.toLowerCase().indexOf("grid__product-recommendations") != -1 || c.toLowerCase().indexOf("trending__wrapper") != -1 || c.toLowerCase().indexOf("element") != -1 || c.toLowerCase().indexOf("index-section") != -1 || c.toLowerCase().indexOf("section--spacingnormal") != -1 || c.toLowerCase().indexOf("oz-homepage__curated_collection") != -1 || c.toLowerCase().indexOf("homepage-collection") != -1 || c.toLowerCase().indexOf("page-width") != -1 || c.toLowerCase().indexOf("featured-products-section") != -1 || c.toLowerCase().indexOf("simple-collection-section") != -1 || c.toLowerCase().indexOf("featured-picks") != -1 || c.toLowerCase().indexOf("recommended-products") != -1) {
										let innerTxt = String(element['innerText']).toLowerCase();
										for (let word of target_words) {
											if (innerTxt.indexOf(word) != -1) {
												word = word.replace(/\s/g, '');
												let cont = true;
												while (cont == true) {
													let status = check_for_children(element);
													if (status == true) {
														element.classList.add(word + "_TWIK");
														if (!myElements.includes(element)) {
															myElements.push(element);
														}
														cont = false;
													} else {
														try {
															element = element.parentElement.nextElementSibling;
														}

														catch {
															cont = false;
														}
													}
												}
											}
										}
									}
								}
							}
							catch {
								continue;
							}
						}
			        }
				}
			}
		}
	}
	// filter further
	let targets = [];
	for (let elem of myElements) {
		let innerString = String(elem['innerHTML']).toLowerCase();
		if (innerString.indexOf('product') != -1) {
			let outest = true;
			for (let x of myElements) {
				if (x != elem && x.contains(elem)) {
					outest = false;
				}
			}
			if (outest == true) {
				targets.push(elem);
				elem.classList.add("final_tw");

				let classes = elem.classList;
				let group = "new";
				for (let c of classes) {
					if (bests.indexOf(c) != -1) {
						group = "featured";
					}
				}
				elem.classList.add("tw" + "_" + group);
			}
		}
	}
	return targets;
})()


// Product selectors:
// "featured_product_twik" & "new_product_twik"
function product_identifier() {
	let news = document.getElementsByClassName('tw_new');
	let featureds = document.getElementsByClassName('tw_featured');
	let new_prods = [];
	let featured_prods = [];

	for (let n of news) {
		for (let t of target_classes) {
			let test = n.getElementsByClassName(t);
			for (let x of test) {
				if (!new_prods.includes(x)) {
					let outest = true;
					for (let n of new_prods) {
						if (n != x && n.contains(x)) {
							outest = false;
						}
					}
					if (outest == true) {
						let c_list = x.classList;
						let approved = true;
						for (let c_l of c_list) {
							if (excluded_classes.includes(c_l)) {
								approved = false;
							}
						}
						if (approved == true) {
							new_prods.push(x);
							x.classList.add("new_product_twik");
						}
					}	
				}
			}
		}
	}
	for (let np of new_prods) {
		for (i=0; i<new_prods.length; i++) {
			if (new_prods[i] != np && new_prods[i].contains(np)) {
				new_prods[i].classList.remove("new_product_twik");
				new_prods.splice(i, 1);
			}
		}
	}

	for (let feature of featureds) {
		for (let t of target_classes) {
			let test = feature.getElementsByClassName(t);
			for (let x of test) {
				if (!featured_prods.includes(x)) {
					let outest = true;
					for (let f of featured_prods) {
						if (f != x && f.contains(x)) {
							outest = false;
						}
					}
					if (outest == true) {
						let c_list = x.classList;
						let approved = true;
						for (let c_l of c_list) {
							if (excluded_classes.includes(c_l)) {
								approved = false;
							}
						}
						if (approved == true) {
							featured_prods.push(x);
							x.classList.add("featured_product_twik");
						}
					}
				}
			}
		}
	}
	for (let fp of featured_prods) {
		for (i=0; i<featured_prods.length; i++) {
			if (featured_prods[i] != fp && featured_prods[i].contains(fp)) {
				featured_prods[i].classList.remove("featured_product_twik");
				featured_prods.splice(i, 1);
			}
		}
	}

	console.log("new", new_prods);
	console.log("feat", featured_prods);
}
product_identifier();




/*
positive tested sites:

https://www.aloyoga.com/
https://www.mvmtwatches.com/
https://mnml.la/
https://www.beeinspiredclothing.com/
https://www.alrugaibfurniture.com/
https://www.fashionnova.com/
https://www.jbhifi.com.au/
https://www.cettire.com/
https://www.vqfit.com/
https://lookslikesummer.com/
https://shopshashi.com/
https://www.jimmyjazz.com/
https://zanerobe.com/
https://www.culturekings.com.au/
https://www.outerknown.com/
https://www.ripndipclothing.com/
https://sinnersattire.com/
https://www.lakenzie.com/
https://www.princesspolly.com.au/
https://www.blacktailor.store/
https://vapejuicedepot.com/
https://www.kingice.com/
https://pearlfeet.com/
https://asrv.co/
https://outofthesandbox.com/
https://www.fangamer.com/
https://5econds.co/
https://www.luminskin.com/
https://skims.com/
https://www.headphonezone.in/
https://www.nomatic.com/
https://fathersonsclothing.com/
https://xlarge.com/
https://www.superpetsofficial.com/
https://www.shethinx.com/
https://www.brooklinen.com/
https://www.quayaustralia.com/
https://untilgone.com/
https://www.pdpaola.com/
https://motiondesign.school/
https://deodap.com/
https://www.exportleftovers.com/
https://www.naturalbabyshower.co.uk/
https://eandeproject.com/
https://www.vitalproteins.com/
https://www.bajaao.com/
https://www.yogaoutlet.com/

next: 140. articture.com


problem sites:


https://www.gymshark.com/
	no products on home page but script gives false positives for new products
https://collins.co.uk/
	captures wrong products
https://www.thecriticalslidesociety.com/
	class names too general to pull out specific sections without ruining script for every other site



Questionables:

https://www.zoofashions.com/ && 
https://www.morphe.com/ &&
https://andi-bagus.com/ &&
https://www.omaze.com/
	outer-most div wraps both new and featured items, so both the new ones and the featured ones get registered as featured

https://hygoshop.com/
	works on featured sections, but because "New Arrivals" section is in a moving slide show we must ignore this section otherwise
	other sites will break

https://rayconglobal.com/ &&
https://www.analuisa.com/ &&
https://thegymking.com/
	works on products but captures a section that is not a product and classes used in too many other sites that we can't add them to the exclude list




*/
