let selector = "body > div.content > div > div.sidebar > div.sidebar__content";

// Get the element------------------------------
let selectedElem = document.querySelector(selector);

// get element's style---------------------------
let selectedElemStyle = window.getComputedStyle(selectedElem);

// ####################################################################
// message from Denis:
// the code block below should be used differently. As of now it only appends jQuery.
// It has to both append jQuery and fire jQuery functions only when jQuery is loaded.
// The way you have it now will give errors as you will be executing jQuery before it loaded.
// You need to put all of your code into a function, for example mainJS(),
// and put it in two spots in the code block below.
// This function has to be activated after lines "$ = window.jQuery;" and after "var $ = window.jQuery;"
// ####################################################################

// append jquery link to head/----------------
if (window.jQuery) {
  $ = window.jQuery;
} else {
  var script = document.createElement("SCRIPT");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
  script.type = "text/javascript";
  script.onload = function () {
    var $ = window.jQuery;
  };
  document.getElementsByTagName("head")[0].appendChild(script);
}

// STYLE---------------------------------------------------
$("head").append(`<style>
.float-attribute{
    z-index: 9999;
    position: fixed;
    display: block;
}
</style>`);

// ####################################################################
// message from Denis:
// I am pretty sure this will remove all other classes on the element,
// which is not what you want. Better use jQuery's methods "addClass" and "removeClass"
// ####################################################################
//Append class to selector
$(selector).attr("class", "float-attribute");

//stop view
$(document).scroll(function () {
  if (
    $(selector).offset().top + $(selector).height() >=
    $("footer").offset().top - 10
  )
    $(selector).css({ position: "fixed", bottom: 0 });

  if ($(document).scrollTop() + $(selector).height() < $("footer").offset().top)
    $(selector).css({ position: "fixed", bottom: "auto" }); // restore when you scroll up
});

// //Closest Element
// scrollObj= document.getElementsByClassName("float-attribute");
// let scrollDisplay = $(selector).closest(Element);

// //  Visibility Function -------------------------
// $.fn.inView = function(){
//     if(!this.length)
//         return false;
//     var rect = this.get(0).getBoundingClientRect();
//     return (
//         rect.top >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
//     );
// };

// //window scroll display parameters ------------------------------
// $(window).on('scroll',function(){
//     if(scrollDisplay.inView() ) {
//         scrollObj.style.display = 'none';
//     } else {
//         scrollObj.style.display = 'block';
//     }
// });
