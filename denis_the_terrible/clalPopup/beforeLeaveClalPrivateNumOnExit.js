let time = () => {
  return new Date();
};

let clickRef = "tel:0723307629";
(() => {
  if (
    time().getDay() >= 1 &&
    time().getDay() <= 5 &&
    time().getHours() >= 8 &&
    time().getHours() <= 17
  ) {
    let currentUrl = window.location.href;
    if (currentUrl.match(/facebook_cpc/g)) {
      clickRef = "tel:0723305853";
    } else if (currentUrl.match(/facebook_rmkt/g)) {
      clickRef = "tel:0723307251";
    } else if (currentUrl.match(/search_generic/g)) {
      clickRef = "tel:0723306335";
    } else if (currentUrl.match(/search_brand/g)) {
      clickRef = "tel:0723307344";
    } else if (currentUrl.match(/search_competitors/g)) {
      clickRef = "tel:0723308296";
    } else if (currentUrl.match(/gdn/g) && !currentUrl.match(/gdn_/g)) {
      clickRef = "tel:0723319183";
    } else if (currentUrl.match(/gdn_rm/g)) {
      clickRef = "tel:0723310482";
    } else if (currentUrl.match(/gdn_smart/g)) {
      clickRef = "tel:0723311628";
    } else if (currentUrl.match(/gdn_gsp/g)) {
      clickRef = "tel:0723310889";
    } else if (currentUrl.match(/instagram_cpc/g)) {
      clickRef = "tel:0723306745";
    }
  } else {
    clickRef = "https://www.clalbit.co.il/metrazcontact/";
  }
})();

let popupHTML = `
<div class="regularsection _100vh">
    <div>
        <div>
            <div class="sm-overlay">
            </div>
            <div class="sm-popup" style="width: 356px; height: 500px; background: transparent none repeat scroll 0% 0%; margin: auto; padding: 0px; animation-duration: 0.4s; text-align: center; animation-delay: 0.2s;">
                <div class="sm-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill:rgba(0, 0, 0, 1);transform:;-ms-filter:"><path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z"></path></svg>                    </div>
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
    }

    body>div.regularsection._100vh>div {
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

    body>div.regularsection._100vh>div>div>div.sm-popup {
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
        width: -webkit-max-content !important;
        height: -webkit-max-content !important;
        animation-iteration-count: 1;
        animation-timing-function: ease;
        animation-fill-mode: both;
        animation-direction: normal;
        backface-visibility: hidden;
        transform-style: preserve-3d;
        left: 0;
        right: 0;
        top: 0;
        bottom: -2000px;
        animation-name: sm-slideBottom;
        background: transparent;
        margin: auto;
        padding: 0px;
        animation-duration: 0.4s;
        text-align: center;
        animation-delay: 0.2s;
        position: absolute;
    }

    body>div.regularsection._100vh>div>div>div.sm-popup>div.sm-button {
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
        box-sizing: border-box;
        cursor: pointer;
        position: absolute;
        z-index: 999;
        transition: all .1s ease;
        width: 24px;
        height: 24px;
        opacity: .5;
        right: -2.5px !important;
        top: 0;
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
        max-width: 100vw;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: stretch;
        align-items: stretch;
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .24), 0 30px 70px 0 rgba(0, 0, 0, .24);
        font-size: 16px;
        line-height: 24px;
    }

    #popup-container>div {
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: transparent;
        font-weight: 400;
        font-family: AssistantRegular;
        visibility: visible;
        display: flex;
        width: 100%;
        max-width: 320px;
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

    #popup-container>div>div.twik-popup-title {
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
        line-height: 32px;
        box-sizing: border-box;
    }

    #popup-container>div>div.twik-popup-illustration {
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
        margin-top: 24px;
        margin-bottom: 24px;
        box-sizing: border-box;
    }

    #popup-container>div>div.twik-popup-illustration>img {
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
    }

    #popup-container>div>div:nth-child(3) {
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
        box-sizing: border-box;
    }

    #popup-container>div>a {
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: transparent;
        font-weight: 400;
        font-family: AssistantRegular;
        visibility: visible;
        -webkit-box-direction: normal;
        direction: rtl;
        text-align: center;
        font-size: 18px;
        touch-action: manipulation;
        margin-top: 18px;
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
    </style>
`;
document.body.insertAdjacentHTML("beforeend", popupHTML);
document.head.insertAdjacentHTML("beforeend", popupStyle);

function popUpRun() {
  sessionStorage.setItem("pop_seen", "true");

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

  function mainJS() {
    let $overlay = $(".sm-overlay");
    let $popup = $(".sm-popup");

    function displayOverlay() {
      $overlay.fadeIn();
    }
    function hideOverlay() {
      $overlay.fadeOut();
    }

    function displayPopup() {
      displayOverlay();
      $popup.animate({ bottom: "0px" });
    }
    function hidePopup() {
      hideOverlay();
      $popup.animate({ bottom: "-3000px" });
    }

    $overlay.click(() => {
      hidePopup();
    });
    $(".sm-button").click(() => {
      hidePopup();
    });

    displayPopup();
  }
}

window.addEventListener("mousemove", (e) => {
  if (e.y <= 10 && sessionStorage.getItem("pop_seen") == null) {
    popUpRun();
  }
});
