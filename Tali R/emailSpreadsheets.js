// append jquery link to head/----------------
if (window.jQuery) {
  $ = window.jQuery;
  mainJS()
} else {
  var script = document.createElement("SCRIPT");
  script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
  script.type = "text/javascript";
  script.onload = function() {
      var $ = window.jQuery;
      mainJS()
  };
  document.getElementsByTagName("head")[0].appendChild(script);
}

function mainJS(){
  // STYLE---------------------------------------------------
$('head').append(`
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
  #subscribeBtn {
      left: 0;
      top: 40%;
      position: fixed;
      z-index: 9999;
      width: 150px;
      height: auto;
      border-radius:5%;
      padding: 10px;
      background-color: ivory;
      box-shadow: sandybrown;
      color: sandybrown;
      text-align: center;
      font-size: 20px;
      justify-content: center;
      justify-content: space-between;
      border-color: none !important;
      display: block;
  }

  #subscribeBtn:hover {
      color: lightcoral;
      border-color: none !important;
      cursor: pointer;
  }

  #emailForm {
      width: 100%;
      bottom: 0;
      position: fixed;
      height: 200px;
      background-color: ivory;
      color: sandybrown;
      padding: 30px;
      box-shadow: sandybrown;
      z-index: 9999;
      display: none;
  }

  #emailFormContent {
      margin: auto !important;
      border-color: none !important;
      text-align: center;
      justify-content: space-between;
  }

  #emailFormHeadline {
      font-size: 20px;
      color: black;
      border-color: none !important;
  }

  #inputStyle {
      font-size: 16px;
      color: black;
      cursor: pointer;
      border-color: none !important;

      #inputStyle:focus,
      textarea:focus {
          background-color: lightcyan;
          cursor: pointer;
          border-color: none !important;
      }

      #submitBtn {
          font-size: 12pt;
          cursor: pointer;
          border-color: none !important;
      }

      #submitBtn:hover {
          color: lightcoral;
          border-color: none !important;
          cursor: pointer;
      }

      #dataInfo {
          font-size: 14px;
          color: tomato;
          cursor: pointer;
      }

      #closeBtn {
          top: 10px !important;
          right: 10px !important;
          font-size: 14px;
          color: black !important;
      }
      #thankYouForm {
          width: 100%;
          bottom: 0;
          position: fixed;
          height: 200px;
          background-color: ivory;
          color: sandybrown;
          padding: 30px;
          box-shadow: sandybrown;
          z-index: 9999;
          display: none;
      }
  
      #thankYouFormContent {
          margin: auto !important;
          border-color: none !important;
          text-align: center;
          justify-content: space-between;
      }
  
      #thankYouFormHeadline {
          font-size: 20px;
          border-color: none !important;
      }
  

</style>`);
// append html to body-----------
$('body').append(`
<div id="subscribeBtn">
  <i class="fa fa-envelope" style="envelope"><br>Subscribe</br></i>
</div>

<div id="emailForm" class="modal">
  <a class="close">X</a>
  <section id="emailFormContent">
      <h1 id="emailFormHeadline">Newsletter Subscription</h1>
      <br>
      <form name="form1" id="talisForm">
          <h3 id="inputStyle"><input id="emails" type='email' name='email1'placeholder='Type Your Email Here'></h3>
      </form>
      </br>
  </section>
</div>

<div id="thankYouForm" class="modal2">
  <a class="close2">X</a>
  <section id="thankYouFormContent">
      <h1 id="thankYouFormHeadline">Thank You!<br> You're now part of our Subscription List!</h1>
      <br>
      <p id="dataInfo">Find your data
          <a href="https://docs.google.com/spreadsheets/d/1QldP4PSHaEcqC-fCwawIG9i2-Woyru2PgnReazOZzNo/edit?usp=sharing">here</a>
      </p>
      </br>
  </section>
</div>`);

// get Elements------------------------------------------
let modal = document.getElementById("emailForm");
let btn = document.getElementById("subscribeBtn");
let span = document.getElementsByClassName("close");
let span2 = document.getElementsByClassName("close2");
let emails = document.getElementById("emails");
let modal2 = document.getElementById("thankYouForm");
// When the user clicks the button, open the modal 
btn.onclick = function() {
  console.log("click");
modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
modal.style.display = "none";
}
// Close Thank You Modal
span2.onclick = function() {
  modal2.style.display = "none";
}

// send emails to spreadSheet-------------------------
let talisForm = document.querySelector("#talisForm")
talisForm.addEventListener("submit", function(event){
  event.preventDefault()
  fetch("https://api.apispreadsheets.com/data/9382/", {
      method: "POST",
      body: JSON.stringify({"data": {"Email":emails.value}}),
  }).then(res =>{
if (res.status === 201){
  alert('You are now part of our Subscription List');
      modal.style.display="none";
      modal2.style.display="block";
}
else{
      alert('Oops! Something went wrong! Please try again.');
  modal.style.display="none";
}
})});

}
