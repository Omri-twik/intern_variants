// INSTRUCTIONS
//
// The following contact us banner and bubble are connected to Google Spreadsheets via "API Spreadsheets".
//
// It is necessary to acquire an API url and specify it below (e.g. "https://api.apispreadsheets.com/data/8369/")
//
// =========================================================================================================
//
// Select the fields in the contact forms that you want to be required
let required_fields = ["Name", "Phone", "Email", "Message"];
//
// Choose your selector and where you want to add the banner ("before" or "after")
let footerSelector = `body > footer`;
let beforeOrAfterSelector = "before";
//
// Choose the email and the phone to be displayed in the banner
let email = "genericEmail@mail.com";
let phoneNumberCallable = "01234567890";
let phoneNumberToDisplay = "+012 (3) 456-7890";
//
// Choose the colors for the background and for text
let bubbleColor = "grey";
let bubbleBackgroundColor = "white";
let bubbleFieldTextColor = "red";
let bubbleHeaderTextColor = "purple";
let bubbleSubmitButtonColor = "yellow";
let bubbleSubmitButtonTextColor = "orange";
let bubbleBorderColor = "green";
let bannerLeftTextColor = "blue";
let bannerBackgroundColor = "darkgreen";
let bannerFieldTextColor = "lightblue";
let bannerSubmitButtonColor = "darkblue";
let thankYouMessageTextColor = "pink";
let thankYouMessageBackgroundColor = "brown";
//
// Choose the maximum height (pixels) to which the message boxes may expand
let bubbleMessageMaxHeight = 150;
let bannerMessageMaxHeight = 150;
//
// Customize the HTML of the Thank You message to be displayed on submission
let thankYouMessageText = `<h3>Thank you</h3><p>We will contact you shortly</p>`;
//
// Select the image for the checkmark to be displayed on submission, as well as the width and the height
let checkmarkImageSrc =
  "https://i.postimg.cc/1RMpXwyc/pngfind-com-kiss-mark-png-1695521.png";
let checkmarkImageWidth = 70;
let checkmarkImageHeight = 70;
//
// Enter the API Spreadsheets url here
let apiSpreadsheet = "https://api.apispreadsheets.com/data/8369/";
//
// Customize the position of the contact us bubble
let contactUsBubblePosition = `
right: 26px;
bottom: 120px;
`;
// =========================================================================================================
// START OF FUNCTIONALITY
// =========================================================================================================

$(document).ready(function ($) {
  if (typeof jQuery === "undefined") {
    let jQuerySrc =
      "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
    let jqueryScript = document.createElement("SCRIPT");
    jqueryScript.src = jQuerySrc;
    document.head.appendChild(jqueryScript);
  }

  preferred_font = window.getComputedStyle(document.body)["font-family"];

  $("head").append(
    `
  <style>

    .formBox {
        background: white;
        bottom: 24px;
        right: 24px;
        border: 1px solid ${bubbleBorderColor};
        border-radius: 6px;
        position:
            fixed;
        z-index: 11111;
        width: 300px;
        box-shadow: 0px 6px 12px rgb(0 0 0 / 18%);
        font-family:
            system-ui;
    }

    .formBox h1 {
        margin: 0;
        padding: 0;
        text-align: center;
        margin-bottom: 50px;
        text-transform: uppercase;
        font-size: 48px;
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

    .contact-left ul li img {
        margin-right: 18px;
    }

    .contact-left h2 {
        margin-bottom: 18px !important;
        width: 190px;
        color: black;
        text-align: center;
    }

    .exitButton {
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

    .container-fluid {
        z-index: 9999999999 !important;
    }



    .chat-bubble {
        background: ${bubbleColor};
        position: fixed;
        z-index: 2272;
        ${contactUsBubblePosition}
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

    input.chatBubbleContact:-webkit-autofill,
    input.chatBubbleContact:-webkit-autofill:hover,
    input.chatBubbleContact:-webkit-autofill:focus,
    input.chatBubbleContact:-webkit-autofill:active {
        color: ${bubbleFieldTextColor};
        -webkit-box-shadow: 0 0 0 30px ${bubbleBackgroundColor} inset !important;
        -webkit-text-fill-color: ${bubbleFieldTextColor};
    }

    .fieldAlert {
        z-index: 999;
        position: absolute;
    }

    .footerContact {
        position: relative;
        font-size: 16px;
        line-height: 20px;
        font-family: ` +
      `${preferred_font}` +
      `;
      color: ${bannerFieldTextColor};
    }


    .contactContainer {
        margin-bottom: 10px;
        padding: 0 0px;
        max-width: 1180px;
        margin: auto;
    }

    .icon--sm {
        margin-right: 12px;
    }

    .contact-contents {
        display: flex;
        align-items: center;
        padding: 15px;
    }

    #contact-us-bubble-div {
      margin: 15px;
    }
    
    #contactFormContainer .contact-left h2 {
        margin-bottom: 18px !important;
        color: ${bannerLeftTextColor};
        text-align: left;
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

    .genarel-inputs {
        width: 100%;
        padding: 0 15px;
        box-sizing: border-box;
    }


    .genarel-inputs input, .genarel-inputs textarea {
        background: transparent;
        color: ${bannerFieldTextColor};
        height: 36px;
        border: none;
        padding: 0 10px;
        border-radius: 0;
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 10px;
        border-bottom: 1px solid ${bannerFieldTextColor};
        border-radius: 0;
        resize: none;
    }

    .messageBoxDiv {
        overflow-y: auto;
        cursor: default !important;
        margin-top: 7px;
    }

    .genarel-inputs input::placeholder,
    .genarel-inputs textarea::placeholder,
    .genarel-inputs select::placeholder {
        color: ${bannerFieldTextColor};
    }

    #sdMessageBubbleDiv::-webkit-scrollbar {
        cursor: pointer !important;
        width: 12px;
        background-color: ${bubbleBackgroundColor}; 
    }

    #bannerMessageDiv::-webkit-scrollbar {
        cursor: pointer !important;
        width: 12px;
        background-color: ${bannerBackgroundColor}; 
    }

    
    #sdMessageBubbleDiv::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: ${bubbleFieldTextColor};
    }
    
    #sdMessageBubbleDiv:hover::-webkit-scrollbar-thumb {
        cursor: pointer !important;
    }    


    #bannerMessageDiv::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: ${bannerFieldTextColor};
    }
    
    #bannerMessageDiv:hover::-webkit-scrollbar-thumb {
        cursor: pointer !important;
    }    




    .genarel-inputs input:focus,
    .genarel-inputs textarea:focus
    .genarel-inputs select:focus {
        outline: none;
    }

    .genarel-inputs select {
        cursor: pointer;
        color: ${bubbleFieldTextColor};
    }

    .genarel-inputs select option {
        padding: 10px !important;
    }

    #sdMessageFooter {
        resize: none; 
        overflow: hidden;
        padding-top: 5px;
    }

    #sdMessageFooter:focus {
        outline: none;
    }

    #form-submit-contact-us-button {
        width: 100%;
        background: transparent;
        border: 1px solid ${bannerSubmitButtonColor};
        color: ${bannerSubmitButtonColor};
        font-size: 18px;
        border-radius: 4px;
        padding: 10px;
        cursor: pointer;
        box-sizing: border-box;
        height: fit-content;
        font-family: ` +
      `${preferred_font}` +
      `
    }

    .contact-right .select-box::after {
        background: transparent;
    }


    .contact-left ul li a {
        text-decoration: none;
        color: ${bannerLeftTextColor};
        font-size: 17px;
        font-family: ` +
      `${preferred_font}` +
      `;
    }

    .genarel-inputs-row {
        display: flex;
        justify-content: space-between;
    }

    .genarel-inputs-row>div {
        width: 31%;
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

    .vc_row-full-width.vc_clearfix {
        background: ${bannerBackgroundColor};
    }

    #contactFormContainer .alert.alert-success,
    #test {
        display: none;
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

    input.footerContact:-webkit-autofill,
    input.footerContact:-webkit-autofill:hover,
    input.footerContact:-webkit-autofill:focus,
    input.footerContact:-webkit-autofill:active {
        -webkit-text-fill-color: ${bannerFieldTextColor};
        -webkit-box-shadow: 0 0 0 30px ${bannerBackgroundColor} inset !important;
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
    #contactFormContainer .thank-you-div div {
        color: ${thankYouMessageTextColor};
    }

    #formBox .thank-you-div div {
        color: ${thankYouMessageTextColor};
        font-size: 40px;
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

    .formBoxContainer {
        position: relative;
        z-index: 99999999999999999999999999;
    }

    .cntct {
        position: absolute;
    }

    @media (max-width: 1499px) {
        .formBox {
            width: 320px;
        }

        .formBox .col-sm-6 {
            min-width: 100%;
        }

        .contact-left ul {
            flex-direction: column;
        }
    }

    @media only screen and (max-width: 600px) {
        .formBoxContainer {

            width: 100%;
            height: 100%;
        }

        .chat-bubble {
            right: 5px;
            bottom: 50px;
        }

        .formBox {
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

    @media all and (max-width: 992px) {
        .contact-contents {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        .contact-right {
            width: 100%;
        }

        .contact-left {
            width: 100%;
            margin-bottom: 15px;
        }

                
        .formBoxContainer {
            width: 100%;
            height: 100%;
        }


        .genarel-inputs-row {
            flex-direction: column;
        }

        .genarel-inputs-row > div {
            width: 100%;
        }
    }

    @media all and (max-width: 600px) {

    .chat-bubble {
        right: 5px;
        bottom: 50px;
    }

    .formBox {
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

</style>`
  );

  // chat bubble html
  let chatBubbleHTML = `
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
    `;

  let chatBubbleFormHTML = `
            <div class="cntct container-fluid">
              <div class="container">
                <div class="formBoxContainer">
                  <div class="formBox" id="formBox">
                    <button id="exitButton" class="exitButton">
                      <svg class="mi-close" id="mi-close" viewBox="0 0 25 25">
                        <path
                          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                        </path>
                      </svg>
                    </button>
                    <div id="contact-us-bubble-div">
                      <form name="contact-us-bubble-form" id="contact-us-bubble">
                        <div id="contact-us-bubble-inputs-box-container">
                          <div id="contact-us-bubble-inputs-box">
                            <div class="bubble-header">
                              <h3>Contact Us</h3>
                            </div>
                            <div class="inputBox">
                              <input type="text" class="contactUsField chatBubbleContact" name="Name" id="sdNameBubble"
                                class="input" placeholder="Name">
                            </div>
                            <div class="inputBox">
                              <input type="text" class="contactUsField chatBubbleContact" name="Phone" id="sdTelBubble"
                                class="input" placeholder="Phone">
                            </div>
                            <div class="inputBox">
                              <input type="email" class="contactUsField chatBubbleContact" name="Email"
                                id="sdEmailBubble" class="input" placeholder="Email">
                            </div>
                            <div class="inputBox messageBoxDiv" id="sdMessageBubbleDiv">
                              <textarea class="contactUsField chatBubbleContact messageBox" name="Message"
                                id="sdMessageBubble" placeholder="Message" rows="1" contenteditable></textarea>
                            </div>
                            <input id="bubbleFormSubmit" type="submit" class="contactUsSubmit submitButtonBubble"
                              value="SUBMIT">
                          </div>
                      </form>
                    </div>
                  </div>
              `;

  let bannerHTML = `
              <div id="contactFormContainer" class="vc_row-full-width vc_clearfix">
              <div class="contactContainer">
                <div class="contact-contents" id="contact-contents">
                  <div class="contact-left">
                    <h2>Contact Us</h2>
                    <ul>
                      <li>
                        <i class="icon--sm icon-Envelope color--white"></i>
                        <a href="mailto:${email}">${email}</a>
                      </li>
                      <li>
                        <i class="icon--sm icon-Phone color--white"></i>
                        <a href="callto:${phoneNumberCallable}">${phoneNumberToDisplay}</a>
                      </li>
                    </ul>
                  </div>
                  <div class="contact-right">
                    <form id="contact-us-form" method="post">
            
                      <div class="inputs">
                        <div class="genarel-inputs">
                          <div class="genarel-inputs-row">
                            <div id="nameParent">
                              <input class="contactUsField footerContact" type="text" name="Name" id="sdNameFooter" placeholder="Name">
                            </div>
                            <div id="phoneParent">
                              <input class="contactUsField footerContact" type="text" name="Phone" id="sdTelFooter" placeholder="Phone">
                            </div>
                            <div id="emailParent">
                              <input class="contactUsField footerContact" type="email" name="Email" id="sdEmailFooter" placeholder="Email">
                            </div>
                          </div>
                          <div id="bannerMessageDiv" class="messageBoxDiv">
                            <textarea class="contactUsField footerContact messageBox" name="Message" id="sdMessageFooter" placeholder="Message" type="text" rows="1"
                            contenteditable></textarea>
                          </div>
                          <div class="genarel-inputs-row">
                          </div>
                        </div>
                      </div>
                      <div class="form-submit" id="form-submit-contact-us">
                        <input class="contactUsSubmit" type="submit" value="SUBMIT" id="form-submit-contact-us-button" />
                      </div>
                    </form>
                  </div>
                </div>
                <div class="alert alertFooter alert-success mb-0" style="border-radius: 2;background-color: rgb(127, 209, 125);">
                  Thank you! Your message has been sent.</div>
              </div>
            </div>
                  `;

  if (beforeOrAfterSelector === "before") {
    console.log("before");
    $(bannerHTML).insertBefore(footerSelector);
  } else if (beforeOrAfterSelector === "after") {
    console.log("after");
    $(bannerHTML).insertAfter(footerSelector);
  }
  $("body").append(chatBubbleHTML);
  $("body").append(chatBubbleFormHTML);

  function closeBubble() {
    sessionStorage.setItem("formSubmitted", "formSubmitted");
    $(".cntct").fadeOut();
    setTimeout(showBubble, 100);
  }

  $("#exitButton").on("click", closeBubble);

  function showBubble() {
    $(".chat-bubble").show();
  }

  $(".chat-bubble").on("click", function () {
    $(".chat-bubble").hide();
    $(".cntct").fadeIn();
  });

  $(".cntct").hide();

  // autoexpandable textarea
  function isOverflown(element) {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }

  function showThankYou(elem) {
    elemJQ = $(`#${elem.id}`);
    let elemChildren = elem.getElementsByClassName("contactUsField");
    for (let child of elemChildren) {
      child.value = "";
    }
    let thankYouHTML =
      `
        <div class="thank-you-div" style="height:${
          window.getComputedStyle(elem).height
        };">
            <img width="` +
      `${checkmarkImageWidth}` +
      `" height="` +
      `${checkmarkImageHeight}` +
      `" src=` +
      `${checkmarkImageSrc}` +
      `>
            <div>` +
      `${thankYouMessageText}` +
      `</div>
        </div>
        `;
    elemJQ.empty();
    elemJQ.append(thankYouHTML);
    elem.style.backgroundColor = thankYouMessageBackgroundColor;
  }

  function hideThankYou(elem, children, originalElemStyle) {
    elemJQ = $(`#${elem.id}`);
    elemJQ.empty();
    elemJQ.append(children);

    elem.style.backgroundColor = originalElemStyle;

    // restore the original CSS of the message box
    try {
      let messageBox = document.querySelector("#sdMessageBubble");
      let messageBoxDiv = document.querySelector("#sdMessageBubbleDiv");
      let siblingInputElem = document.querySelector("#sdEmailBubble");
      let originalBubbleMessageBoxDivStyles = window.getComputedStyle(
        messageBoxDiv
      );
      restoreMessageCSS(
        messageBox,
        messageBoxDiv,
        originalBubbleMessageBoxDivStyles,
        siblingInputElem
      );
      $("#exitButton").on("click", closeBubble);
    } catch {}

    try {
      let messageBox = document.querySelector("#sdMessageFooter");
      let messageBoxDiv = document.querySelector("#bannerMessageDiv");
      let siblingInputElem = document.querySelector("#sdEmailFooter");
      let originalBannerMessageBoxDivStyles = window.getComputedStyle(
        messageBoxDiv
      );
      restoreMessageCSS(
        messageBox,
        messageBoxDiv,
        originalBannerMessageBoxDivStyles,
        siblingInputElem
      );
    } catch {}
  }

  function restoreMessageCSS(
    messageBox,
    messageBoxDiv,
    originalBoxDivStyle,
    siblingInputElem
  ) {
    messageBox.style.height = window.getComputedStyle(siblingInputElem).height;
    messageBoxDiv.style.height = "auto";
    messageBoxDiv.style.overflow = originalBoxDivStyle.overflow;
    messageBoxDiv.style.overflowY = originalBoxDivStyle.overflowY;
  }

  function addExpandableTextArea(textArea, maxHeight) {
    textArea.addEventListener("keydown", () => {
      textArea.parentElement.style.maxHeight = `${maxHeight}px`;
      let lineHeight_str = window.getComputedStyle(textArea).lineHeight;
      let textAreaHeight_str = window.getComputedStyle(textArea).height;
      let reg = /\d+/;
      let lineHeight_number = parseInt(lineHeight_str.match(reg)[0]);
      let textAreaHeight_number = parseInt(textAreaHeight_str.match(reg)[0]);
      if (isOverflown(textArea)) {
        textArea.style.height = `${
          textAreaHeight_number + lineHeight_number
        }px`;
      } else if (textAreaHeight_number >= maxHeight) {
        textArea.parentElement.style.overflowY = "scroll";
      }
    });
  }

  let bubbleTextArea = document.querySelector("#sdMessageBubble");
  let bannerTextArea = document.querySelector("#sdMessageFooter");
  addExpandableTextArea(bubbleTextArea, bubbleMessageMaxHeight);
  addExpandableTextArea(bannerTextArea, bannerMessageMaxHeight);

  function contactUsSubmitFunctionality(
    formElem,
    thankYouParentElem,
    closeElem = false
  ) {
    let fields = formElem.getElementsByClassName("contactUsField");

    formElem.addEventListener("submit", (e) => {
      e.preventDefault();
      let formData = {};
      for (field of fields) {
        formData[field.name] = field.value;
      }
      let children = $(`#${thankYouParentElem.id}`).children();
      let originalThankYouParentElemBackgroundColor = window.getComputedStyle(
        thankYouParentElem
      )["background-color"];
      showThankYou(thankYouParentElem);

      fetch(`${apiSpreadsheet}`, {
        method: "POST",
        body: JSON.stringify({ data: formData }),
      }).then((res) => {
        if (closeElem) {
          closeBubble();
        }
        if (res.status === 201) {
          // SUCCESS
          setTimeout(() => {
            hideThankYou(
              thankYouParentElem,
              children,
              originalThankYouParentElemBackgroundColor
            );
          }, 500);
        } else {
          // ERROR
          setTimeout(() => {
            hideThankYou(
              thankYouParentElem,
              children,
              originalThankYouParentElemBackgroundColor
            );
          }, 500);
        }
      });
    });
  }
  contactUsSubmitFunctionality(
    document.getElementById("contact-us-bubble"),
    document.querySelector("#formBox"),
    $("#exitButton")
  );
  contactUsSubmitFunctionality(
    document.getElementById("contact-us-form"),
    document.querySelector("#contactFormContainer")
  );

  // setting required
  for (field of document.querySelectorAll(".contactUsField")) {
    console.log(field.name);
    if (required_fields.includes(field.name)) {
      field.setAttribute("required", "");
    }
  }
});
