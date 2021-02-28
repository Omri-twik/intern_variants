let selector = 'Your selector'; //single_add_to_cart_button button alt

let copyBtn = document.querySelector(selector); 

let stickyBtn = document.createElement('div')

let stickyBtnStyle = window.getComputedStyle(copyBtn);


$("head").append(`<style>
<link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
stickyBtn{
  align-items: center;
  justify-content: center;
  height: ${stickyBtnStyle['height']};
  background-color: ${stickyBtnStyle['background-color']};
  color:  ${stickyBtnStyle['color']}; 
  width: 60px;
  left: 0px; 
  top: 45%;
  z-index: 999;
  transition:all 300ms linear;
  margin-top: 50%;
  position:fixed;
}

#stickyBtn .toggle-btn span{
  cursor:pointer;

#copBtn{
  display: none;
}
}

</style>`);

stickyBtn.style.cssText = stickyBtnStyle

document.body.appendChild(stickyBtn);

// Make StickyBtn Visible
let stuck = false;
let rootElement = document.documentElement;
let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
window.onscroll = function(e) {
  let rootElement = document.documentElement;
  let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if ((rootElement.scrollTop / scrollTotal ) > 0.1) {
    stickyBtn.style.display = "block";
    stuck = true;
  } else {
    stickyBtn.style.display = 'none'; 
  }
}

// Toggle Sticky Btn append script
// let stickyScript = document.createElement("script");
// stickyScript.type = "text/javascript";
// stickyScript.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";

$("body").append(
  `<div id="stickyBtn"><i class="fas fa-shopping-basket"></i></div>
  <div id="copyBtn">
      <div CLASS="panel_title" class="copyBtn"></div>
      <div CLASS="panel_item">
          <template:UserControl id="ucCategories" src="UserControls/ProductCategories.ascx"
          />
      </div>
  </div>
  `
);

$("head").append(stickyScript);
// toggle sticky Btn function
$('.stickyBtn').click(function () {
  if($('stickyBtn').is(':visible')){
  $('stickyBtn').fadeOut(function () {
      $('#copyBtn').toggle('slide', {
          direction: 'left'
      }, 1000);
  });
  }
  else{
      $('#copyBtn').toggle('slide', {
          direction: 'left'
      }, 1000, function(){ $('stickyBtn').fadeIn();});
  }
});
