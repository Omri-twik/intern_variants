let selector = '#product-4457 > div.summary.entry-summary.has-no-bid-product.has_no_sale_price > form > button'
// Get the element
let copyBtn = document.querySelector(selector);
// Clone selector 
let cloneBtn = copyBtn.cloneNode(true);
cloneBtn.addEventListener('click', () => {copy.click()});

// // append jquery link to head
//----------------------
if (window.jQuery) {
    $ = window.jQuery;
} else {
    var script = document.createElement("SCRIPT");
    script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
    script.type = "text/javascript";
    // this is doc.ready
    //-------------------
    script.onload = function() {
        var $ = window.jQuery;
    };
    document.getElementsByTagName("head")[0].appendChild(script);
}
//------------------------------------
// STYLE

let stickyBtn = window.getComputedStyle(copyBtn);
$('head').append(`<style>
<link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
#cloneBtnId{
  z-index: 999;
  transition:all 300ms linear;
  margin-top: 50%;
  position: fixed !important;
  height:67px;
  margin: auto;
  left: 0px;
  top: 50%;
  position: fixed;
  z-index: 9999;
  display: none;
}
#stickyBtn{
    margin: auto;
    display: block;
    background-color: ${stickyBtn['background-color']};
    color:  ${stickyBtn['color']};
    padding: 11px 20px 11px 20px;
    margin: auto;
    font-weight:${stickyBtn['font-weight']};
    font-size: 30px;
    display: block;
    left: 0px;
    top: 50%;
    position: fixed;
    border-radius: 3px;
    background:${stickyBtn['background']};
    font-family:${stickyBtn['font-family']};
    z-index: 9999;
}
#stickyBlock{
    height:67px;
    background-color: ${stickyBtn['background-color']};
    color:  ${stickyBtn['color']};
    padding: 11px 20px 11px 20px;
    margin: auto;
    font-weight:${stickyBtn['font-weight']};
    font-size: 30px;
    display: block;
    left: 0px;
    top: 50%;
    position: fixed;
    border-radius: 3px;
    background:${stickyBtn['background']};
    font-family:${stickyBtn['font-family']};
    z-index: 9999;
}
#stickyBlock:hover{ 
    cursor: pointer;
}
</style>`);
//-----------------------------------------
// // Create new div for stickyButton
$('body').append(
    `<div  id="stickyBlock" class="block">
        <i class="fas fa-shopping-basket"  id="stickyBtn"></i>
        <div id='cloneBtnId'> </div>
    </div>`
);
//---------------------------
//append clone div to div
let div = document.getElementById("cloneBtnId");
div.appendChild(cloneBtn);
//---------------------------
//append clone to div
$("#cloneBtnId").append(cloneBtn);
//-----------------------------------------------
// Visibility Function
$.fn.inView = function(){
    if(!this.length) 
        return false;
    var rect = this.get(0).getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
};
//--------------------------------------------------------------
//window scroll Function
$(window).on('scroll',function(){

    if($(copyBtn).inView() ) {
        stickyBlock.style.display = 'none';
        stuck = true;
    } else {
        stickyBlock.style.display = 'block'; 
    }
});
//--------------------------------------------------------------
//mouse hover 

$(document).ready(function() {
    $('#stickyBlock').on('hover', function() {
        let icon = document.getElementById("stickyBtn");
        let iconStatus = icon.style.display;
        let btn = document.getElementById("cloneBtnId");
        let btnStatus = btn.style.display;
    
        if (iconStatus === "block") {
            icon.style.display = "none";
            btn.style.display = "block";
        } else {
            icon.style.display = "block";
            btn.style.display = "none";
        }
    });
});

