let popExitTimeout;
let timeIdle = 0;
let timeLimit = 30;
let timer;

let clickRef = "tel:*2666";

function resetTimeIdle() {
  timeIdle = 0;
}

function setButtonFunctionalities() {
  let clalActivationButtons = document.querySelectorAll(
    "#carToGoStep1 .BannerContent fieldset, .CarToGo3.buttonSubmit, .buttonSubmit.CarToGo2"
  );

  clalActivationButtons.forEach((btn) => {
    if (!btn.classList.contains("twik_popup_listener")) {
      // console.log("added listener");
      btn.addEventListener("click", resetPopTimeFunctionality);
      btn.classList.add("twik_popup_listener");
    }
  });

  let clalBackButtons = document.querySelectorAll(".LeftHeader .backLogo");

  clalBackButtons.forEach((btn) => {
    if (!btn.classList.contains("twik_popup_listener")) {
      // console.log("added listener");
      btn.addEventListener("click", () => {
        // console.log("back click");
        if (
          window
            .getComputedStyle(document.querySelector(".progressLogo"))
            ["backgroundImage"].match(/[234]_4/)
        ) {
          resetPopTimeFunctionality();
        } else {
          deactivatePopUpTimeFunctionality();
        }
      });
      btn.classList.add("twik_popup_listener");
    }
  });
}

setInterval(setButtonFunctionalities, 300);

function resetPopTimeFunctionality() {
  // console.log("resetPopTimeFunctionality");
  resetTimeIdle();
  deactivatePopUpTimeFunctionality();
  activatePopTimeFunctionality();
}

function activatePopTimeFunctionality() {
  // console.log("activatePopTimeFunctionality");
  // if (sessionStorage.getItem("time_pop_seen") == null) {
  window.addEventListener("click", resetTimer);
  window.addEventListener("mouseup", resetTimer);
  window.addEventListener("mousedown", resetTimer);
  window.addEventListener("mousemove", resetTimer);
  window.addEventListener("scroll", resetTimer);
  window.addEventListener("keydown", resetTimer);

  timer = setInterval(() => {
    timeIdle = timeIdle + 1;
    // console.log("timeIdle", timeIdle);
    if (timeIdle == timeLimit) {
      // alert("popup");
      if (sessionStorage.getItem("time_pop_seen") == null) {
        popUpRun();
        deactivatePopUpTimeFunctionality();
      }
    }
  }, 1000);
  // }
}

function deactivatePopUpTimeFunctionality() {
  // console.log("deactivatePopUpTimeFunctionality");
  try {
    window.removeEventListener("click", resetTimer);
    window.removeEventListener("mouseup", resetTimer);
    window.removeEventListener("mousedown", resetTimer);
    window.removeEventListener("mousemove", resetTimer);
    window.removeEventListener("scroll", resetTimer);
    window.removeEventListener("keydown", resetTimer);

    clearInterval(timer);
  } catch {}
}

function resetTimer() {
  timeIdle = 0;
}

let popupHTML = `
          <div class="regularsection _100vh">
              <div>
                  <div>
                      <div class="sm-overlay">
                      </div>
                      <div class="sm-popup" style="background: transparent none repeat scroll 0% 0%; margin: auto; padding: 0px; animation-duration: 0.4s; text-align: center; animation-delay: 0.2s;">
                          <div class="sm-button">
                              <img src="https://p.kindpng.com/picc/s/214-2149190_line-symbol-material-property-close-icon-png-gray.png">
                              </div>
                          <div id="popup-container" class="popup-container">
                              <div class="twik-popup-main">
                                  <div class="twik-popup-title">לפני שאתם עוזבים</div>
                                  <div class="twik-popup-illustration"><img class="image"
                                          src="https://i.imgur.com/DCXzuUp.png"></div>
                                  <div>רצינו לעדכן שיש לנו נציג זמין לדבר איתך עכשיו</div>
                                  <a href="${clickRef}">לשיחה מיידית לחצו כאן</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          `;
let popupStyle = `
          <style>
              body>div.regularsection._100vh {
          display: none;

              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
              font-weight: 400;
              line-height: 1.5;
              color: #292b2c;
              direction: rtl;
              font-family: AssistantRegular;
              text-align: right;
              visibility: visible;
              box-sizing: inherit;
              font-size: 20px;
              }
      
              body>div.regularsection._100vh>div {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
              font-weight: 400;
              line-height: 1.7;
              color: #292b2c;
              direction: rtl;
              font-family: AssistantRegular;
              text-align: right;
              visibility: visible;
              box-sizing: inherit;
              font-size: 18px;
              }
      
              body>div.regularsection._100vh>div>div {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
              font-weight: 400;
              line-height: 1.5;
              color: #292b2c;
              direction: rtl;
              font-family: AssistantRegular;
              text-align: right;
              visibility: visible;
              box-sizing: inherit;
              font-size: 18px;
              position: fixed;
              z-index: 99999997;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              display: block;
              }
      
              body>div.regularsection._100vh>div>div>div.sm-overlay {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
              font-weight: 400;
              line-height: 1.5;
              color: #292b2c;
              direction: rtl;
              font-family: AssistantRegular;
              text-align: right;
              display: none;
              font-size: 18px;
              box-sizing: border-box;
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              content: "";
              z-index: 99999998;
              cursor: pointer;
              animation-iteration-count: 1;
              animation-timing-function: ease;
              animation-fill-mode: both;
              animation-direction: normal;
              backface-visibility: hidden;
              transform-style: preserve-3d;
              animation-name: sm-fadeIn;
              background: rgba(0, 0, 0, 0.8);
              animation-duration: 0.4s;
              animation-delay: 0s;
              }
      
              .sm-popup {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
              font-weight: 400;
              line-height: 1.5;
              color: #292b2c;
              direction: rtl;
              font-family: AssistantRegular;
              visibility: visible;
              font-size: 18px;
              box-sizing: border-box;
              z-index: 99999999;
              display: inline-block;
              width: 450px;
              height: 650px;
              animation-iteration-count: 1;
              animation-timing-function: ease;
              animation-fill-mode: both;
              animation-direction: normal;
              backface-visibility: hidden;
              transform-style: preserve-3d;
              left: 0;
              right: 0;
              top: 0;
              bottom: -3000px;
              animation-name: sm-slideBottom;
              background: transparent;
              margin: auto;
              padding: 0px;
              animation-duration: 0.4s;
              text-align: center;
              animation-delay: 0.2s;
              position: absolute;
              }
      
              .sm-button {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
              font-weight: 400;
              line-height: 1.5;
              color: #292b2c;
              direction: rtl;
              font-family: AssistantRegular;
              visibility: visible;
              text-align: center;
              font-size: 18px;
              width: 24px;
              height: 24px;
              right: 4px !important;
              top: 4px;
              box-sizing: border-box;
              cursor: pointer;
              position: absolute;
              z-index: 999;
              transition: all .1s ease;
              opacity: .5;
              }
      
              .sm-button>img {
              width: 28px;
              height: 28px;
              }
      
              #popup-container {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
              font-weight: 400;
              color: #292b2c;
              direction: rtl;
              font-family: AssistantRegular;
              visibility: visible;
              text-align: center;
              box-sizing: border-box;
              display: flex;
              overflow: hidden;
              -webkit-box-pack: center;
              justify-content: center;
              -webkit-box-align: stretch;
              align-items: stretch;
              border-radius: 2px;
              background-color: #fff;
              box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .24), 0 30px 70px 0 rgba(0, 0, 0, .24);
              font-size: 16px;
              line-height: 24px;
              height: 650px;
              width: 450px;
              }
      
              .twik-popup-main {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
              font-weight: 400;
              font-family: AssistantRegular;
              visibility: visible;
              display: flex;
              width: 100%;
              width: 380px;
              margin-right: 18px;
              margin-left: 18px;
              padding: 32px;
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              flex-direction: column;
              -webkit-box-pack: center;
              justify-content: center;
              -webkit-box-align: center;
              align-items: center;
              border-style: solid;
              border-width: 1px;
              border-color: #eee;
              background-color: #fff;
              box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.12);
              direction: rtl;
              color: #2f425a;
              font-size: 18px;
              line-height: 24px;
              text-align: center;
              box-sizing: border-box;
              }
      
              .twik-popup-title {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
              font-weight: 400;
              font-family: AssistantRegular;
              visibility: visible;
              -webkit-box-direction: normal;
              direction: rtl;
              color: #2f425a;
              text-align: center;
              font-size: 32px;
              line-height: 32px;
              box-sizing: border-box;
              }
      
              .twik-popup-illustration {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
              font-weight: 400;
              font-family: AssistantRegular;
              visibility: visible;
              -webkit-box-direction: normal;
              direction: rtl;
              color: #2f425a;
              line-height: 24px;
              text-align: center;
              font-size: 18px;
              margin-top: 28px;
              margin-bottom: 28px;
              box-sizing: border-box;
              }
      
              .twik-popup-illustration>img {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
              font-weight: 400;
              font-family: AssistantRegular;
              visibility: visible;
              -webkit-box-direction: normal;
              direction: rtl;
              color: #2f425a;
              line-height: 24px;
              text-align: center;
              font-size: 18px;
              border-style: none;
              vertical-align: middle;
              height: 250px;
              margin-bottom: 18px;
              box-sizing: border-box;
              width: 450px;
              height: 314px;
              }
      
              .twik-popup-main>div:nth-child(3) {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
              font-weight: 400;
              font-family: AssistantRegular;
              visibility: visible;
              -webkit-box-direction: normal;
              direction: rtl;
              color: #2f425a;
              line-height: 24px;
              text-align: center;
              font-size: 24px;
              box-sizing: border-box;
              }
      
              .twik-popup-main>a {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
              font-weight: 400;
              font-family: AssistantRegular;
              visibility: visible;
              -webkit-box-direction: normal;
              direction: rtl;
              text-align: center;
              font-size: 24px;
              touch-action: manipulation;
              margin-top: 30px;
              padding: 10px 32px !important;
              border-radius: 1000px !important;
              background-color: #1b26b6 !important;
              box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12);
              display: inline-block;
              color: white;
              border: 0;
              line-height: inherit;
              text-decoration: none;
              cursor: pointer;
              box-sizing: border-box;
              }
      
              .sm-popup {
              width: 740px;
              height: 1065px;
              }
              .sm-button {
              font-size: 18px;
              width: 62px;
              height: 62px;
              right: 3px !important;
              top: 3px !important;
              }
      
              .sm-button>img {
              width: inherit;
              height: inherit;
              }
      
              #popup-container {
              border-radius: 2px;
              font-size: 16px;
              line-height: 24px;
              width: 740px;
              height: 1065px;
              }
      
              .twik-popup-main {
              width: 100%;
              width: 600px;
              margin-right: 18px;
              margin-left: 18px;
              padding: 32px;
              font-size: 28px;
              line-height: 24px;
              }
              .twik-popup-title {
              font-size: 58px;
              line-height: 58px;
              }
      
              .twik-popup-illustration {
              line-height: 24px;
              font-size: 18px;
              margin-top: 28px;
              margin-bottom: 28px;
              }
      
              .twik-popup-illustration>img {
              line-height: 24px;
              font-size: 18px;
              height: 250px;
              margin-bottom: 18px;
              width: 740px;
              height: 513px;
              }
      
              .twik-popup-main>div:nth-child(3) {
              line-height: 52px;
              font-size: 52px;
              }
      
              .twik-popup-main>a {
              font-size: 52px;
              line-height: 52px;
              margin-top: 46px;
              padding: 16px 42px !important;
              border-radius: 1000px !important;
              }
      
              @media only screen and (max-width: 1000px) {
              .sm-popup {
              width: 740px;
              height: 1065px;
              }
              .sm-button {
              font-size: 18px;
              width: 62px;
              height: 62px;
              right: 3px !important;
              top: 3px !important;
              }
      
              .sm-button>img {
              width: inherit;
              height: inherit;
              }
      
              #popup-container {
              border-radius: 2px;
              font-size: 16px;
              line-height: 24px;
              width: 740px;
              height: 1065px;
              }
      
              .twik-popup-main {
              width: 100%;
              width: 600px;
              margin-right: 18px;
              margin-left: 18px;
              padding: 32px;
              font-size: 28px;
              line-height: 24px;
              }
              .twik-popup-title {
              font-size: 58px;
              line-height: 58px;
              }
      
              .twik-popup-illustration {
              line-height: 24px;
              font-size: 18px;
              margin-top: 28px;
              margin-bottom: 28px;
              }
      
              .twik-popup-illustration>img {
              line-height: 24px;
              font-size: 18px;
              height: 250px;
              margin-bottom: 18px;
              width: 740px;
              height: 513px;
              }
      
              .twik-popup-main>div:nth-child(3) {
              line-height: 52px;
              font-size: 52px;
              }
      
              .twik-popup-main>a {
              font-size: 52px;
              line-height: 52px;
              margin-top: 46px;
              padding: 16px 42px !important;
              border-radius: 1000px !important;
              }
              }
      
              @media only screen and (max-width: 750px) {
              .sm-popup {
              width: 480px;
              height: 700px;
              }
              .sm-button {
              font-size: 18px;
              width: 42px;
              height: 42px;
              right: 3px !important;
              top: 3px !important;
              }
      
              .sm-button>img {
              width: inherit;
              height: inherit;
              }
      
              #popup-container {
              border-radius: 2px;
              width: 480px;
              height: 700px;
              }
      
              .twik-popup-main {
              width: 100%;
              width: 380px;
              margin-right: 18px;
              margin-left: 18px;
              padding: 32px;
              font-size: 18px;
              line-height: 24px;
              }
              .twik-popup-title {
              font-size: 38px;
              line-height: 38px;
              }
      
              .twik-popup-illustration {
              line-height: 24px;
              font-size: 28px;
              margin-top: 28px;
              margin-bottom: 28px;
              }
      
              .twik-popup-illustration>img {
              line-height: 24px;
              font-size: 18px;
              height: 250px;
              margin-bottom: 18px;
              width: 480px;
              height: 333px;
              }
      
              .twik-popup-main>div:nth-child(3) {
              line-height: 35px;
              font-size: 35px;
              }
      
              .twik-popup-main>a {
              font-size: 34px;
              line-height: 34px;
              margin-top: 26px;
              padding: 10px 32px !important;
              border-radius: 1000px !important;
              }
              }
      
              @media only screen and (max-width: 500px) {
              .sm-popup {
              width: 380px;
              height: 550px;
              }
              .sm-button {
              font-size: 18px;
              width: 22px;
              height: 22px;
              right: 2px !important;
              top: 2px !important;
              }
      
              .sm-button>img {
              width: inherit;
              height: inherit;
              }
      
              #popup-container {
              border-radius: 2px;
              font-size: 16px;
              line-height: 24px;
              width: 380px;
              height: 550px;
              }
      
              .twik-popup-main {
              width: 380px;
              margin-right: 18px;
              margin-left: 18px;
              padding: 32px;
              font-size: 18px;
              line-height: 24px;
              }
      
              .twik-popup-main {
              width: 100%;
              width: 330px;
              margin-right: 18px;
              margin-left: 18px;
              padding: 32px;
              font-size: 18px;
              line-height: 24px;
              }
              .twik-popup-title {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
              font-weight: 400;
              font-family: AssistantRegular;
              visibility: visible;
              -webkit-box-direction: normal;
              direction: rtl;
              color: #2f425a;
              text-align: center;
              font-size: 28px;
              line-height: 28px;
              box-sizing: border-box;
              }
      
              .twik-popup-illustration {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
              font-weight: 400;
              font-family: AssistantRegular;
              visibility: visible;
              -webkit-box-direction: normal;
              direction: rtl;
              color: #2f425a;
              line-height: 24px;
              text-align: center;
              font-size: 18px;
              margin-top: 28px;
              margin-bottom: 28px;
              box-sizing: border-box;
              }
      
              .twik-popup-illustration>img {
              line-height: 24px;
              font-size: 18px;
              height: 250px;
              margin-bottom: 18px;
              width: 380px;
              height: 265px;
              }
      
              .twik-popup-main>div:nth-child(3) {
              line-height: 24px;
              font-size: 24px;
              }
      
              .twik-popup-main>a {
              font-size: 22px;
              margin-top: 26px;
              padding: 10px 32px !important;
              border-radius: 1000px !important;
              }
              }
      
              @media only screen and (max-width: 400px) {
              .sm-popup {
              width: 300px;
              height: 440px;
              }
              .sm-button {
              font-size: 18px;
              width: 18px;
              height: 18px;
              right: 2px !important;
              top: 2px;
              }
      
              .sm-button>img {
              width: inherit;
              height: inherit;
              }
      
              #popup-container {
              border-radius: 2px;
              font-size: 16px;
              line-height: 24px;
              height: 440px;
              width: 300px;
              }
      
              .twik-popup-main {
              width: 260px;
              margin-right: 18px;
              margin-left: 18px;
              padding: 32px;
              font-size: 18px;
              line-height: 24px;
              }
      
              .twik-popup-title {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
              font-weight: 400;
              font-family: AssistantRegular;
              visibility: visible;
              -webkit-box-direction: normal;
              direction: rtl;
              color: #2f425a;
              text-align: center;
              font-size: 24px;
              line-height: 24px;
              box-sizing: border-box;
              }
      
              .twik-popup-illustration {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
              font-weight: 400;
              font-family: AssistantRegular;
              visibility: visible;
              -webkit-box-direction: normal;
              direction: rtl;
              color: #2f425a;
              line-height: 24px;
              text-align: center;
              font-size: 18px;
              margin-top: 18px;
              margin-bottom: 18px;
              box-sizing: border-box;
              }
      
              .twik-popup-illustration>img {
              line-height: 24px;
              font-size: 18px;
              height: 250px;
              margin-bottom: 18px;
              width: 300px;
              height: 208px;
              }
      
              .twik-popup-main>div:nth-child(3) {
              line-height: 18px;
              font-size: 20px;
              }
      
              .twik-popup-main>a {
              font-size: 16px;
              margin-top: 15px;
              padding: 7px 22px !important;
              border-radius: 1000px !important;
              }
              }
      
              @media only screen and (max-width: 400px) {
              .sm-popup {
              width: 300px;
              height: 440px;
              }
              .sm-button {
              font-size: 18px;
              width: 18px;
              height: 18px;
              right: 2px !important;
              top: 2px;
              }
      
              .sm-button>img {
              width: inherit;
              height: inherit;
              }
      
              #popup-container {
              border-radius: 2px;
              font-size: 16px;
              line-height: 24px;
              height: 440px;
              width: 300px;
              }
      
              .twik-popup-main {
              width: 260px;
              margin-right: 18px;
              margin-left: 18px;
              padding: 32px;
              font-size: 18px;
              line-height: 24px;
              }
      
              .twik-popup-title {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
              font-weight: 400;
              font-family: AssistantRegular;
              visibility: visible;
              -webkit-box-direction: normal;
              direction: rtl;
              color: #2f425a;
              text-align: center;
              font-size: 24px;
              line-height: 24px;
              box-sizing: border-box;
              }
      
              .twik-popup-illustration {
              -webkit-text-size-adjust: 100%;
              -webkit-tap-highlight-color: transparent;
              font-weight: 400;
              font-family: AssistantRegular;
              visibility: visible;
              -webkit-box-direction: normal;
              direction: rtl;
              color: #2f425a;
              line-height: 24px;
              text-align: center;
              font-size: 18px;
              margin-top: 18px;
              margin-bottom: 18px;
              box-sizing: border-box;
              }
      
              .twik-popup-illustration>img {
              line-height: 24px;
              font-size: 18px;
              height: 250px;
              margin-bottom: 18px;
              width: 300px;
              height: 208px;
              }
      
              .twik-popup-main>div:nth-child(3) {
              line-height: 18px;
              font-size: 20px;
              }
      
              .twik-popup-main>a {
              font-size: 16px;
              margin-top: 15px;
              padding: 7px 22px !important;
              border-radius: 1000px !important;
              }
              }
              </style>
          `;
document.body.insertAdjacentHTML("beforeend", popupHTML);
document.head.insertAdjacentHTML("beforeend", popupStyle);

function mainJS() {
  let $overlay = $(".sm-overlay");
  let $popup = $(".sm-popup");

  function displayPopup() {
    $overlay.fadeIn();
    $popup.fadeIn();
    $(".regularsection._100vh").fadeIn();
    $popup.animate({ bottom: "0px" });
  }

  function hidePopup() {
    $overlay.fadeOut();
    $popup.animate({ bottom: "-3000px" });
    $popup.fadeOut();
    $(".regularsection._100vh").fadeOut();
  }

  $overlay.click(() => {
    hidePopup();
  });
  $(".sm-button").click(() => {
    hidePopup();
  });

  displayPopup();
}

function popUpRun() {
  try {
    sessionStorage.setItem("time_pop_seen", "true");
  } catch {}

  if (window.jQuery) {
    $ = window.jQuery;
    mainJS();
  } else {
    var script = document.createElement("SCRIPT");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
    script.type = "text/javascript";
    // this is doc.ready
    //-------------------
    script.onload = function () {
      var $ = window.jQuery;
      mainJS();
    };
    document.getElementsByTagName("head")[0].appendChild(script);
  }
}
