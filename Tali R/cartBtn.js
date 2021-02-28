let selector = 'Your selector'; //single_add_to_cart_button button alt
let copyBtn = document.querySelector(selector); 
let stickyBtn = window.getComputedStyle(copyBtn);
// let stickyBtn = document.querySelector(selector); 
// Create Style
$('head').append(`<style>
<link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
#stickyBtn{
  align-items: center;
  justify-content: center;
  height: ${stickyBtn['height']};
  background-color: ${stickyBtn['background-color']};
  color:  ${stickyBtn['color']}; 
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
}
#copyBtn{
  display: none;
  margin-top: 50%;
  display: none;
  position:fixed;
}
</style>`);

// Create new div for stickyButton
$('body').append(
  `<div id="stickyBtn"><i class="fas fa-shopping-basket"></i></div>
  <div id="copyBtn" >
      <div CLASS="panel_title" class="copyBtn"></div>
      <div CLASS="panel_item">
          <template:UserControl id="ucCategories" src="UserControls/ProductCategories.ascx"
          />
      </div>
  </div>`);

// clone Pay Button inside new div
  const init = function(){
    let divBtn = document.getElementById('copyBtn');
    cloneBtn = document.querySelector('.copyBtn');
        divBtn.appendChild(cloneBtn.cloneNode(true) );
  }
  document.addEventListener('DOMContentLoaded', init)

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


// toggle sticky Btn function
$('head').append(stickyScript);
$('#stickyBtn').click(function () {
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




// Toggle Sticky Btn append script
// let stickyScript = document.createElement("script");
// stickyScript.type = "text/javascript";
// stickyScript.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";

