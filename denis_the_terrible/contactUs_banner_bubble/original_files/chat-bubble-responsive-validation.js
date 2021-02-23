let footerSelector = `body > footer`;

let email = "genericEmail@mail.com";
let phoneNumberCallable = "01234567890";
let phoneNumberToDisplay = "+012 (3) 456-7890";

let bannerBackgroundColor = "grey";
let bubbleBackgroundColor = "white";
let TextColor_banner = "white";
let TextColor_bubble = "black";

let apiSpreadsheet = "https://api.apispreadsheets.com/data/8369/";

jQuery(document).ready(function ($) {
  $("head").append(`
  <style>

    .formBox {
        background: white;
        bottom: 24px;
        right: 24px;
        border: 1px solid #E2E2E2;
        border-radius: 6px;
        position:
            fixed;
        padding: 15px;
        z-index: 11111;
        width: 320px;
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
        margin-bottom: 2px;
        width: 100%;
        font-size: 20px;
        line-height: 30px;
    }


    .inputBox input {
        position: relative;
        width: 100%;
        background: transparent;
        border: none;
        outline: none;
        border-bottom: 1px solid hsl(0deg 0% 62% / 50%);
        border-radius: 0;
        margin-bottom: 10px;
        padding: 0;
        font-size: inherit;
        line-height: inherit;
    }

    .inputBox textarea {
        position: relative;
        width: 100%;
        background: transparent;
        border: none;
        outline: none;
        border-bottom: 1px solid hsl(0deg 0% 62% / 50%);
        border-radius: 0;
        padding: 0;
        font-size: inherit;
        line-height: inherit;
        resize: none;
        overflow: hidden;
    }


    .submitButtonBubble {
        width: 100% !important;
        height: 50px;
        border: none !important;
        outline: none;
        background: ${bannerBackgroundColor};
        color: #fff;
    }

    .submitButtonBubble:hover {
        box-shadow: 0px 0px 5px ${bannerBackgroundColor};
        text-shadow: 0px 0px 5px ${TextColor_banner};

    }

    .contact-left {
        justify-content: center;
        width: 30%;
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
        background: ${bannerBackgroundColor};
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

    .chat-bubble:hover {
        box-shadow: 0px 0px 5px ${bannerBackgroundColor};
    }


    input.chatBubbleContact:-webkit-autofill,
    input.chatBubbleContact:-webkit-autofill:hover,
    input.chatBubbleContact:-webkit-autofill:focus,
    input.chatBubbleContact:-webkit-autofill:active {
        color: ${TextColor_bubble};
        -webkit-box-shadow: 0 0 0 30px ${bubbleBackgroundColor} inset !important;

    }

    .fieldAlert {
        z-index: 999;
        position: absolute;
    }

    .footerContact {
        position: relative;
    }

    .footerContact:hover {
        position: relative;
        text-shadow: 0px 0px 10px ${TextColor_banner};
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


    #contactFormContainer .contact-left h2 {
        margin-bottom: 18px !important;

        color: ${TextColor_banner};
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
        color: white;
        height: 36px;
        border: none;
        padding: 0 10px;
        border-radius: 0;
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 10px;
        border-bottom: 1px solid #d6d6d6;
        border-radius: 0;
        resize: none;
    }

    #sdMessageBubbleDiv {
        overflow-y: auto;
        cursor: default !important;
    }

    .genarel-inputs input::placeholder,
    .genarel-inputs textarea::placeholder,
    .genarel-inputs select::placeholder,
    .contact-right .text-area textarea,
    .contact-right .text-area textarea::placeholder {
        color: ${TextColor_banner};
    }
    .genarel-inputs input:hover::placeholder,
    .genarel-inputs textarea:hover::placeholder,
    .genarel-inputs select:hover::placeholder,
    .contact-right .text-area textarea,
    .contact-right .text-area textarea:hover::placeholder {
        text-shadow: 0px 0px 2px ${TextColor_banner};
    }

    #sdMessageBubbleDiv::-webkit-scrollbar {
        cursor: pointer !important;
        width: 12px;
        background-color: #F5F5F5; 
    }

    
    #sdMessageBubbleDiv::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: ${bannerBackgroundColor};
    }
    
    #sdMessageBubbleDiv:hover::-webkit-scrollbar-thumb {
        cursor: pointer !important;
    }    
    .genarel-inputs input:focus,
    .genarel-inputs textarea:focus
    .genarel-inputs select:focus,
    .text-area textarea:focus {
        outline: none;
    }

    .genarel-inputs select {
        cursor: pointer;
        color: #585858;
    }

    .genarel-inputs select option {
        padding: 10px !important;
    }

    .text-area {
        width: 50%;
        box-sizing: border-box;
    }

    .text-area textarea {
        width: 100%;
        background: #eee;
        border: none;
        padding: 10px;
        box-sizing: border-box;
        height: 100px;
        border-radius: 4px;
    }

    #form-submit-contact-us-button {
        width: 100%;
        background: transparent;
        border: 1px solid ${TextColor_banner};
        color: white;
        font-size: 18px;
        border-radius: 4px;
        padding: 10px;
        cursor: pointer;
        box-sizing: border-box;
        margin-top: 0;
        height: fit-content;
    }

    #form-submit-contact-us-button:hover {
        box-shadow: 0px 0px 10px 1px ${TextColor_banner};
        text-shadow: 0px 0px 1px ${TextColor_banner};
    }


    .contact-right input[type="submit"]::placeholder {
        color: white;
    }

    .contact-right .select-box::after {
        background: transparent;
    }


    .contact-left ul li a {
        text-decoration: none;
        color: white;
        font-size: 17px;
    }

    .contact-left ul li a:hover {
        text-shadow: 0px 0px 2px ${TextColor_banner};
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

    .contact-right .text-area textarea {
        background: #f1f1f1;
        border-bottom: 1px solid #d6d6d6;
        border-radius: 0;
    }

    .contact-right .text-area {
        margin-right: 15px;
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



    .newFooter {
        background-color: #da1d53;
        position: fixed;
        bottom: 0;
        margin-bottom: 0px;
        width: 100%;
        height: 150px;
        text-align: center;
        z-index: 3;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }

    .contactBtn {
        background-color: white;
        z-index: 3;
        margin-top: 0;
        margin-right: 12px;
        box-shadow: 0px 4px 8px rgb(0 0 0 / 0.18);
        padding: 8px 24px;
        color: black;
    }

    .NewFooter a.btn {
        margin-top: 0 !important;
    }

    .button_container {
        display: flex;
        align-items: center;
    }

    .contact-left .icon--sm {
        font-family: 'iconsmind' !important;
        font-size: 28px;
    }

    a.dismiss_text {
        color: white;
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
        -webkit-text-fill-color: ${TextColor_banner};
        -webkit-box-shadow: 0 0 0 30px ${bannerBackgroundColor} inset !important;
    }

    .thank-you-div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #contact-contents .thank-you-div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    #contact-contents .thank-you-div div {
        color: ${TextColor_banner};
        font-size: 60px;
    }
    #contact-us-bubble-div .thank-you-div div {
        color: ${TextColor_bubble};
        font-size: 40px;

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
        .inputs {
            display: flex;
            flex-direction: column;
        }

        .genarel-inputs {
            width: 100%;
            padding: 0;
        }

        .text-area {
            width: 100%;
        }

        .form-submit {
            width: 100%;
            padding: 0;
            margin-top: 10px;
        }
    }

    @media all and (max-width: 778px) {
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

    @media all and (max-width: 575px) {
        .genarel-inputs-row {
            flex-direction: column;
        }

        .genarel-inputs-row>div {
            width: 100%;
        }
    }



</style>`);

  // chat bubble html
  $("body").append(`
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
      `);

  $("body").append(`
    <div class="cntct container-fluid">
        <div class="container">
            <div class="formBoxContainer">
                <div class="formBox">
                    <button id="exitButton" class="exitButton">
                        <svg class="mi-close" id="mi-close" viewBox="0 0 25 25">
                            <path
                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                            </path>
                        </svg>
                    </button>
                    <div id="contact-us-bubble-div">
                    <form name="contact-us-bubble-form" id="contact-us-bubble">
                        <div class="contact-left">
                            <h2>Contact Us</h2>
                        </div>
                        <div id="contact-us-bubble-inputs-box-container">
                            <div id="contact-us-bubble-inputs-box">
                                <div class="inputBox">
                                    <input type="text" class="contactUsField chatBubbleContact" name="Name" id="sdNameBubble"
                                        class="input" placeholder="Name">
                                </div>
                                <div class="inputBox">
                                    <input type="text" class="contactUsField chatBubbleContact" name="Phone" id="sdTelBubble"
                                        class="input" placeholder="Phone">
                                </div>
                                <div class="inputBox">
                                    <input type="email" class="contactUsField chatBubbleContact" name="Email" id="sdEmailBubble"
                                        class="input" placeholder="Email">
                                </div>
                                <div class="inputBox" id="sdMessageBubbleDiv">
                                    <textarea class="contactUsField chatBubbleContact" name="Message" id="sdMessageBubble"
                                        placeholder="Message" rows="1" contenteditable></textarea>
                                    </div>
                                <input id="formSubmit" type="submit" class="contactUsSubmit submitButtonBubble" value="SUBMIT">
                            </div>
                    </form>
                    </div>
                </div>
      `);

  $("body").append(`
      <div class='alertSection'>
      </div>
      <div class="alert alertBubble alert-success mb-0" style="background-color: #7FD17D;">Thank you! Your message has
          been sent.</div>
      </div>
      `);

  // footer banner html

  $(`${footerSelector}`).before(`
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
              <div class="field-w100">
                <input class="contactUsField footerContact" name="Message" id="sdMessageFooter" placeholder="Message" type="text">
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
      `);

  $("#exitButton").on("click", function () {
    sessionStorage.setItem("formSubmitted", "formSubmitted");
    $(".cntct").fadeOut();
    setTimeout(showBubble, 100);
  });

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
    console.log(window.getComputedStyle(elem).height);
    let thankYouHTML = `
        <div class="thank-you-div" style="height:${
          window.getComputedStyle(elem).height
        }">
            <div>Thank you</div>
        </div>
        `;
    elemJQ.empty();
    elemJQ.append(thankYouHTML);
  }

  function hideThankYou(elem, children) {
    elemJQ = $(`#${elem.id}`);
    elemJQ.empty();
    elemJQ.append(children);
  }

  function addExpandableTextArea(textArea, maxHeight) {
    textArea.addEventListener("keydown", () => {
      let textAreaParent = textArea.parentElement;
      textAreaParent.style.maxHeight = `${maxHeight}px`;
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
        textAreaParent.style.overflowY = "scroll";
      }
    });
  }
  let bubbleTextArea = document.getElementById("sdMessageBubble");
  addExpandableTextArea(bubbleTextArea, 150);

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
      showThankYou(thankYouParentElem);

      fetch(`${apiSpreadsheet}`, {
        method: "POST",
        body: JSON.stringify({ data: formData }),
      }).then((res) => {
        if (closeElem) {
          closeElem.trigger("click");
        }
        if (res.status === 201) {
          // SUCCESS
          setTimeout(() => {
            hideThankYou(thankYouParentElem, children);
          }, 200);
        } else {
          // ERROR
          setTimeout(() => {
            hideThankYou(thankYouParentElem, children);
          }, 200);
        }
      });
    });
  }
  contactUsSubmitFunctionality(
    document.getElementById("contact-us-bubble"),
    document.getElementById("contact-us-bubble-div"),
    $("#exitButton")
  );
  contactUsSubmitFunctionality(
    document.getElementById("contact-us-form"),
    document.getElementsByClassName("contact-contents")[0]
  );
});
