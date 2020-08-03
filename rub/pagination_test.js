function getpagination(){
if (document.getElementsByClassName("Pagination__Nav").length > 0) {
	pagebar= document.getElementsByClassName("Pagination__Nav")

}	else {
	pagebar = document.getElementsByClassName("pagination")
}
return pagebar
}

function addpaginationbutton(){
pagebar[0].appendChild(pagebar_btn)
}

let pagebar
getpagination()

let pagebar_btn= document.createElement('button')
pagebar_btn.setAttribute("id", "dropdown_pagebar_btn")

addpaginationbutton()

let pagebar_max= pagebar[0].childNodes[1].childNodes[1].childNodes.length - 4
maximum_string = pagebar[0].childNodes[1].childNodes[1].childNodes[pagebar_max].innerText
maximum_pages= Number(maximum_string.slice(-2,))


function addItems() {
	for (let i = 0; i < maximum_pages; i++) {
    let ele = document.createElement("a");
    ele.classList = "dropdown-item";
    let path_url= window.location.pathname
    let root_new= path_url+"?page="+(i+1)
    ele.href = root_new
    ele.innerText = i+1;
    document.querySelector("#dropdown_pagebar_btn").appendChild(ele);
  }
}

addItems()





