let selector = '#product-4457 > div.summary.entry-summary.has-no-bid-product.has_no_sale_price > form > button'

// Get the element------------------------------
let selectedElem = document.querySelector(selector);

// get element's style---------------------------
let selectedElemStyle = window.getComputedStyle(selectedElem);

// Clone element-------------------------------
let cloneBtn = selectedElem.cloneNode(true);

// append jquery link to head/----------------
if (window.jQuery) {
    $ = window.jQuery;
} else {
    var script = document.createElement("SCRIPT");
    script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
    script.type = "text/javascript";
    script.onload = function() {
        var $ = window.jQuery;
    };
    document.getElementsByTagName("head")[0].appendChild(script);
}

// STYLE---------------------------------------------------
$('head').append(`<style>
#newBlock{
  background-color: ${selectedElemStyle['background-color']};
  color:  ${selectedElemStyle['color']};
  padding: 20px;
  left: 0px;
  top: 50%;
  position: fixed;
  border-radius: 3px;
  background:${selectedElemStyle['background']};
  font-family:${selectedElemStyle['font-family']};
  z-index: 9999;
}
#newBlock:hover{ 
  cursor: pointer;
}
#btnClone{
  margin: auto;
  font-size: 30px !important;
  display: none;
}
#blockIcon{
  font-size: 25px;
  font-style: normal !important;
  margin: auto;
}
</style>`);

// Create new div with Id to append cloneBtn--------------
$('body').append(
    `<div  id="newBlock">
        <button id="blockIcon" class="${[...selectedElem.classList].join(' ')}" ></button>
        <div id='btnClone'> </div>
    </div>`
);

//append cloneBtn to id-----------------------
let buttonClone = $(selector).clone(true);
buttonClone.appendTo("#btnClone");

//append events to cloneBtn id-----------------------
$(document).on('click', '#btnClone', function() {
  $(selector).click();
});

// Purchase Btn Visibility Function -------------------------
$.fn.inView = function(){
    if(!this.length) 
        return false;
    var rect = this.get(0).getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
};

//window scroll display Function ------------------------------
$(window).on('scroll',function(){

    if($(selectedElem).inView() ) {
        newBlock.style.display = 'none';
        stuck = true;
    } else {
        newBlock.style.display = 'block'; 
    }
});

//mouse hover ------------------------------------------
$("#newBlock").on({
    mouseenter: function () {
        $("#blockIcon").css("display", "none");
        $("#btnClone").css("display", "block");
    },
    mouseleave: function () {
        $("#blockIcon").css("display", "block");
        $("#btnClone").css("display", "none");
    }
});