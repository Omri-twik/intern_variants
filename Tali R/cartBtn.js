let selector = '#product-4457 > div.summary.entry-summary.has-no-bid-product.has_no_sale_price > form > button'
// Get the element
let copyBtn = document.querySelector(selector);
// Create a copy of it
let cloneBtn = copyBtn.cloneNode(true);

// append jquery link to head
// // append jquery link to head

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


let stickyBtn = window.getComputedStyle(copyBtn);
  
$('head').append(`<style>
<link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
#cloneBtnId{
  left: 0px;
  top: 50%;
  z-index: 999;
  transition:all 300ms linear;
  margin-top: 50%;
  position:fixed;

  width:${stickyBtn['width']};
  display: block;
}

#stickyBtn{
    margin: auto;
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

#copyBtn{
  display: none;
  margin-top: 50%;
  display: none;
  position:fixed;
}

</style>`);


// // Inject it into the DOM
// // Create new div for stickyButton
$('body').append(
    `<div  id="stickyBlock">
     <i class="fas fa-shopping-basket"  id="stickyBtn"></i>
    </div>
    <div id='cloneBtnId'> </div>`);

    
let purchaseBtn = document.getElementById("cloneBtnId");
purchaseBtn.innerHTML += cloneBtn ;


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

// Additional examples for other use cases
// Is true false whether an array of elements are all in view
$.fn.allInView = function(){
    var all = [];
    this.forEach(function(){
        all.push( $(this).inView() );
    });
    return all.indexOf(false) === -1;
};

// Only the class elements in view
$('.some-class').filter(function(){
    return $(this).inView();
});

// Only the class elements not in view
$('.some-class').filter(function(){
    return !$(this).inView();
});


$(window).on('scroll',function(){

    if($(copyBtn).inView() ) {
        // Do cool stuff
        stickyBlock.style.display = 'none';
        stuck = true;
    } else {
        stickyBlock.style.display = 'block'; 
    }
});


$(document).ready(function () {
    $('#cloneBtnId').hide();
    var el = '#stickyBlock';
    $('#stickyBlock').hover(function () {
        $(el).stop(true, true).fadeOut("slow", function () {
            el = el == '#stickyBlock' ? '#cloneBtnId' : '#stickyBlock';
            $(el).stop(true, true).fadeIn();
        });
    });
});

let test = document.querySelector("#stickyBlock")