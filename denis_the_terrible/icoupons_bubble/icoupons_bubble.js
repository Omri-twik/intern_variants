// INSTRUCTIONS
//
// The following contact us banner and bubble are connected to Google Spreadsheets via "API Spreadsheets".
//
// It is necessary to acquire an API url and specify it below (e.g. "https://api.apispreadsheets.com/data/8369/")
//
// =========================================================================================================
//
// Select the fields in the contact forms that you want to be required
let bubbleColor = "#00979d";
let bubbleBackgroundColor = "white";
let bubbleFieldTextColor = "black";
let bubbleHeaderTextColor = "black";
let bubbleSubmitButtonColor = "yellow";
let bubbleSubmitButtonTextColor = "orange";
let bubbleShadowColor = "black";
let thankYouMessageTextColor = "pink";
let thankYouMessageBackgroundColor = "brown";
let bubbleMessageMaxHeight = 150;
let checkmarkImageSrc =
  "https://i.postimg.cc/1RMpXwyc/pngfind-com-kiss-mark-png-1695521.png";
//
//
let showThankYou;
let hideThankYou;
let thankYouDiv;
let bubble;
let form;
let contactUsElem;
let hideContactUs;

// =========================================================================================================
// START OF FUNCTIONALITY
// =========================================================================================================

function main_js() {
  preferred_font = window.getComputedStyle(document.body)["font-family"];

  $("head").append(
    `
  <style>

    .contactUsBubbleFormDiv {
        background: white;
        bottom: 24px;
        right: 24px;
        box-shadow: 0px 0px 2px ${bubbleShadowColor};
        border-radius: 3px;
        position: fixed;
        z-index: 11111;
        width: 300px;
        box-shadow: 0px 6px 12px rgb(0 0 0 / 18%);
        font-family: system-ui;
    }

    .inputBox {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        font-size: 20px;
        line-height: 2;
        font-family: ` +
      `${preferred_font}` +
      `;
    }


    .inputBox input {
        position: relative;
        width: 100%;
        background: transparent;
        border: none;
        outline: none;
        border-bottom: 1px solid ${bubbleFieldTextColor};
        color: ${bubbleFieldTextColor};
        border-radius: 0;
        margin-bottom: 10px;
        padding: 0;
        font-size: inherit;
        line-height: inherit;
        font-family: ` +
      `${preferred_font}` +
      `;
    }

    .inputBox textarea {
        position: relative;
        width: 100%;
        background: transparent;
        border: none;
        outline: none;
        border-bottom: 1px solid ${bubbleFieldTextColor};
        color: ${bubbleFieldTextColor};
        border-radius: 0;
        padding: 0;
        font-size: inherit;
        line-height: inherit;
        resize: none;
        overflow: hidden;
        font-family: ` +
      `${preferred_font}` +
      `;
    }


    .submitButtonBubble {
        width: 100% !important;
        height: 50px;
        border: none !important;
        outline: none;
        background: ${bubbleSubmitButtonColor};
        color: ${bubbleSubmitButtonTextColor};
        cursor: pointer;
        font-family: ` +
      `${preferred_font}` +
      `;
    }

    .contact-left {
        justify-content: center;
        width: 30%;
        padding-right: 10px;
    }

    .contact-left ul li {
        display: flex;
        align-items: center;
        margin-top: 10px;
        margin-right: 10px;
        margin-bottom: 12px;

    }

    .success-chack-mark {
        width: 70px;
        height: 70px;
    }

    .contact-left ul li img {
        margin-right: 18px;
    }

    .contact-left h2 {
        margin-bottom: 18px !important;
        width: 190px;
        color: black;
        text-align: center;
    }

    .contactUsBubbleForm_exitBtn {
        background: white;
        border: 0;
        border-radius: 0;
        color: #202124;
        cursor: pointer;
        font-size: 34px;
        height: 24px;
        padding: 0;
        position: absolute;
        right: 0;
        top: 0;
        margin-bottom: 2px;
        width: 27px;
    }

    .contactUsBubbleForm_exitBtn:active {
        border: none;
    }

    .container-fluid {
        z-index: 9999999999 !important;
    }



    .chat-bubble {
        background: ${bubbleColor};
        position: fixed;
        z-index: 2272;
        right: 26px;
        bottom: 120px;
        padding: 14px;
        border-radius: 1000px;
        box-shadow: 0px 4px 8px rgb(0 0 0 / 14%);
        transition: 80ms;
        cursor: pointer;
    }

    .chat-icon {
        height: 24px;
        width: 24px;
    }

    .chatBubbleContact {
        margin-bottom: 15px;
        font-size: 15px !important;
        color: ${bubbleFieldTextColor};
    }

    .chatBubbleContact::placeholder {
      color: ${bubbleFieldTextColor};
    }

    .thank-you-message-div {
        padding: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
    }

    input.chatBubbleContact:-webkit-autofill,
    input.chatBubbleContact:-webkit-autofill:hover,
    input.chatBubbleContact:-webkit-autofill:focus,
    input.chatBubbleContact:-webkit-autofill:active {
        color: ${bubbleFieldTextColor};
        -webkit-box-shadow: 0 0 0 30px ${bubbleBackgroundColor} inset !important;
        -webkit-text-fill-color: ${bubbleFieldTextColor};
    }

    .icon--sm {
        margin-right: 12px;
    }


    .bubbleFormSubmit {
        background-color: #00979d !important;
    }

    #contact-us-form-div {
      margin: 15px;
    }

    .contact-left ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: block;
    }

    .contact-right {
        width: 70%;
    }

    .inputs {
        display: flex;
    }

    .messageBoxDiv {
        overflow-y: auto;
        cursor: default !important;
        margin-top: 7px;
    }

    #sdMessageBubbleDiv::-webkit-scrollbar {
        cursor: pointer !important;
        width: 12px;
        background-color: ${bubbleBackgroundColor}; 
    }
    
    #sdMessageBubbleDiv::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: ${bubbleFieldTextColor};
    }
    
    #sdMessageBubbleDiv:hover::-webkit-scrollbar-thumb {
        cursor: pointer !important;
    }    

    .contact-right .select-box::after {
        background: transparent;
    }

    .contactUsBubbleForm_exitBtn {
        border-radius: 3px;
    }

    .field-w100 {
        width: 100%;
    }

    .form-submit {
        width: 100%;
        padding: 0 15px;
    }

    .select-box {
        position: relative;
    }

    .select-box::after {
        content: "";
        right: 0;
        top: 0;
        position: absolute;
        height: 45px;
        width: 23px;
        background: #eee;
        border-radius: 0 4px 4px 0;
        z-index: 0;
    }

    .select-box::before {
        content: "";
        right: 5px;
        top: 20px;
        position: absolute;
        height: 0;
        width: 0;
        border-radius: 0 4px 4px 0;
        border: 8px solid #c4c4c4;
        border-bottom: 8px solid transparent;
        border-right: 8px solid transparent;
        border-left: 8px solid transparent;
        z-index: 0;
    }

    .button_container {
        display: flex;
        align-items: center;
    }

    .contact-left .icon--sm {
        font-family: 'iconsmind' !important;
        font-size: 28px;
    }

        #contact-us-bubble-inputs-box-container {
            display: flex;
            justify-content: center;
        }

    #contact-us-bubble-inputs-box {
        display: flex;
        flex-direction: column;
        width: 90%;
    }

    .thank-you-div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        flex-wrap: nowrap;
    }
    #contact-contents .thank-you-div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .thank-you-div h3 {
        text-align:center;
        font-size:26px !important;
    }

    .thank-you-div p {
        text-align: center;
        font-size:14px !important;
      }

    .thank-you-div img {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .contact-left h2 {
        width: 100%;
        font-family: ` +
      `${preferred_font}` +
      `;
    }

    .bubble-header {
        margin-bottom: 12px;
        color: ${bubbleFieldTextColor};
    }

    .bubble-header h3 {
        font-family: ` +
      `${preferred_font}` +
      `;
      color: ${bubbleHeaderTextColor};
    }

    .contactUsSubmit {
        margin-top: 10px;
    }


    @media (max-width: 1499px) {
        .contactUsBubbleFormDiv {
            width: 320px;
        }

        .contactUsBubbleFormDiv .col-sm-6 {
            min-width: 100%;
        }

        .contact-left ul {
            flex-direction: column;
        }
    }

    @media only screen and (max-width: 600px) {

        .chat-bubble {
            right: 5px;
            bottom: 50px;
        }

        .contactUsBubbleFormDiv {
            margin: auto;
            margin-bottom: 50px !important;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            height: fit-content;

        }
    }

    @media all and (max-width: 992px) {

        .contact-right {
            width: 100%;
        }

        .contact-left {
            width: 100%;
            margin-bottom: 15px;
        }
    }

    @media all and (max-width: 600px) {

    .chat-bubble {
        right: 5px;
        bottom: 50px;
    }

    .contactUsBubbleFormDiv {
        position: fixed;
        margin: auto;
        margin-bottom: 50px !important;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: fit-content;
    }
}

</style>
`
  );

  // chat bubble html
  let chatBubbleHTML = `
  <div class="chat-bubble-div">
    <div id='envelope' class="chat-bubble">
        <div class="chat-icon">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <style type="text/css">
                    .st0 {
                        fill: #FFFFFF;
                    }
                </style>
                <g>
                    <g>
                        <path class="st0" d="M467,76H45C20.1,76,0,96.3,0,121v270c0,24.9,20.3,45,45,45h422c24.7,0,45-20,45-45V121
        C512,96.3,491.9,76,467,76z M460.7,106c-9.2,9.1-167.4,166.5-172.9,172c-8.5,8.5-19.8,13.2-31.8,13.2s-23.3-4.7-31.8-13.2
        C220.5,274.3,64,118.6,51.3,106H460.7z M30,384.9V127.1l129.6,129L30,384.9z M51.3,406l129.6-128.8l22.1,21.9
        c14.2,14.2,33,22,53,22s38.9-7.8,53-21.9l22.1-22L460.7,406H51.3z M482,384.9L352.4,256.1l129.6-129V384.9z"></path>
                    </g>
                </g>
            </svg></div>
    </div>
  </div>
    `;

  let chatBubbleFormHTML = `
  <div class="contactUsBubbleFormDiv_container">
  <div class="contactUsBubbleFormDiv" id="contactUsBubbleFormDiv" style="display: none">
      <div id="contactUsBubbleForm_exitBtn" class="contactUsBubbleForm_exitBtn">
          <svg class="mi-close" id="mi-close" viewBox="0 0 25 25">
              <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
              </path>
          </svg>
      </div>
      <div id="contact-us-form-div">
          <form action="https://www.icoupons.co.il/?na=s" method="post" name="contact-us-bubble-form"
              id="contact-us-bubble">
              <input type="hidden" name="nr" value="widget">
              <input type="hidden" name="nlang" value="">
              <div id="contact-us-bubble-inputs-box-container">
                  <div id="contact-us-bubble-inputs-box">
                      <div class="bubble-header">
                          <h3>צור קשר</h3>
                      </div>
                      <div class="inputBox">
                          <input type="email" class="contactUsField chatBubbleContact" name="Email" id="sdEmailBubble"
                              class="input" placeholder="אמייל" required>
                      </div>
                      <input id="bubbleFormSubmit" type="submit" class="contactUsSubmit submitButtonBubble"
                          value="הרשמה לניוזלייטר">
                  </div>
              </div>
          </form>
          <div class="thank-you-message-div" style="display: none">
              <img src="${checkmarkImageSrc}" class="success-chack-mark" alt="success-chack-mark">
              <div class="thank-you-message">
                  <h3>תודה!</h3>
              </div>
          </div>
      </div>
  </div>
</div>
              `;

  document.body.insertAdjacentHTML("beforeend", chatBubbleHTML);
  document.body.insertAdjacentHTML("beforeend", chatBubbleFormHTML);

  thankYouDiv = document.querySelector(".thank-you-message-div");
  bubble = document.querySelector(".chat-bubble");
  contactUsElem = document.querySelector(".contactUsBubbleFormDiv");
  form = document.querySelector("#contact-us-bubble");

  showThankYou = () => {
    $(form).hide();
    $(thankYouDiv).show();
  };

  hideThankYou = () => {
    $(form).show();
    $(thankYouDiv).hide();
  };

  bubble.addEventListener("click", () => {
    $(bubble).fadeOut("fast");
    $(contactUsElem).fadeIn("fast");
    thankYouDiv.style.width = window.getComputedStyle(form)["width"];
    thankYouDiv.style.height = window.getComputedStyle(form)["height"];
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    showThankYou();
    sessionStorage.setItem("formSubmitted", "true");
    setTimeout(() => {
      $(bubble).fadeIn("fast");
      $(contactUsElem).fadeOut("fast");
      setTimeout(() => {
        hideThankYou();
      }, 500);
    }, 1500);
  });

  document
    .querySelector(".contactUsBubbleFormDiv_container")
    .addEventListener("click", (e) => {
      e.stopPropagation();
    });
  document.querySelector(".chat-bubble-div").addEventListener("click", (e) => {
    e.stopPropagation();
  });

  window.addEventListener("click", () => {
    $(bubble).fadeIn("fast");
    $(contactUsElem).fadeOut("fast");
  });

  document
    .querySelector(".contactUsBubbleForm_exitBtn")
    .addEventListener("click", () => {
      $(bubble).fadeIn("fast");
      $(contactUsElem).fadeOut("fast");
    });
}

if (window.jQuery) {
  $ = window.jQuery;
  main_js();
} else {
  var script = document.createElement("SCRIPT");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
  script.type = "text/javascript";
  // this is doc.ready
  //-------------------
  script.onload = function () {
    var $ = window.jQuery;
    main_js();
  };
  document.head.appendChild(script);
}
