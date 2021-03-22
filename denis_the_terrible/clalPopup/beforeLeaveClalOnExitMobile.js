setTimeout(startTrackingScrollUp, 3000);
var distanceScrolledUp = 0;
var oldValue;
var newValue;
let time = () => {
  return new Date();
};
let clickRef = "tel:0723307629";
(() => {
  if (
    time().getDay() >= 0 &&
    time().getDay() <= 4 &&
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
    } else if (
      (currentUrl.match(/gdn/g) && !currentUrl.match(/gdn_r/g)) ||
      !currentUrl.match(/gdn_s/g) ||
      !currentUrl.match(/gdn_g/g)
    ) {
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
let popupStyleMobile = `
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
            font-size: 20px;
            display: none;
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
            box-sizing: border-box;
            cursor: pointer;
            position: absolute;
            z-index: 999;
            transition: all .1s ease;
            opacity: .5;
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
            background-color: #fff;
            box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .24), 0 30px 70px 0 rgba(0, 0, 0, .24);
            }
    
            .twik-popup-main {
            -webkit-text-size-adjust: 100%;
            -webkit-tap-highlight-color: transparent;
            font-weight: 400;
            font-family: AssistantRegular;
            visibility: visible;
            display: flex;
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
            text-align: center;
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
            text-align: center;
            border-style: none;
            vertical-align: middle;
            height: 250px;
            box-sizing: border-box;
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
            text-align: center;
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
            touch-action: manipulation;
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
            width: 990px;
            height: 1425px;
            }
            .sm-button {
            font-size: 18px;
            width: 72px;
            height: 72px;
            right: 5px !important;
            top: 5px !important;
            }
    
            .sm-button>img {
            width: inherit;
            height: inherit;
            }
    
            #popup-container {
            border-radius: 2px;
            font-size: 16px;
            line-height: 24px;
            width: 990px;
            height: 1425px;
            }
    
            .twik-popup-main {
            width: 820px;
            margin-right: 18px;
            margin-left: 18px;
            padding: 32px;
            font-size: 28px;
            line-height: 24px;
            }
    
            .twik-popup-title {
            font-size: 78px;
            line-height: 78px;
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
            width: 990px;
            height: 690px;
            }
    
            .twik-popup-main>div:nth-child(3) {
            line-height: 68px;
            font-size: 68px;
            margin-top: 50px;
    
            }
    
            .twik-popup-main>a {
            font-size: 68px;
            line-height: 68px;
            margin-top: 50px;
            padding: 20px 48px !important;
            border-radius: 1000px !important;
            }
              
    
            @media only screen and (max-width: 1000px) {
            .sm-popup {
            width: 890px;
            height: 1280px;
            }
            .sm-button {
            font-size: 18px;
            width: 72px;
            height: 72px;
            right: 5px !important;
            top: 5px !important;
            }
    
            .sm-button>img {
            width: inherit;
            height: inherit;
            }
    
            #popup-container {
            border-radius: 2px;
            font-size: 16px;
            line-height: 24px;
            width: 890px;
            height: 1280px;
            }
    
            .twik-popup-main {
            width: 100%;
            width: 720px;
            margin-right: 18px;
            margin-left: 18px;
            padding: 32px;
            font-size: 28px;
            line-height: 24px;
            }
    
            .twik-popup-title {
            font-size: 76px;
            line-height: 76px;
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
            width: 890px;
            height: 618px;
            }
    
            .twik-popup-main>div:nth-child(3) {
            line-height: 58px;
            font-size: 58px;
            margin-top: 30px;
            }
    
            .twik-popup-main>a {
            font-size: 58px;
            line-height: 58px;
            margin-top: 52px;
            padding: 20px 48px !important;
            border-radius: 1000px !important;
            }
            }
    
            @media only screen and (max-width: 900px) {
            .sm-popup {
            width: 790px;
            height: 1140px;
            }
            .sm-button {
            font-size: 18px;
            width: 52px;
            height: 52px;
            right: 4px !important;
            top: 4px !important;
            }
    
            .sm-button>img {
            width: inherit;
            height: inherit;
            }
    
            #popup-container {
            border-radius: 2px;
            font-size: 16px;
            line-height: 24px;
            width: 790px;
            height: 1140px;
            }
    
            .twik-popup-main {
            width: 100%;
            width: 670px;
            margin-right: 18px;
            margin-left: 18px;
            padding: 32px;
            font-size: 28px;
            line-height: 24px;
            }
            .twik-popup-title {
            font-size: 68px;
            line-height: 68px;
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
            width: 790px;
            height: 550px;
            }
    
            .twik-popup-main>div:nth-child(3) {
            line-height: 54px;
            font-size: 54px;
              margin-top: 30px;
            }
    
            .twik-popup-main>a {
            font-size: 54px;
            line-height: 54px;
            margin-top: 48px;
            padding: 18px 48px !important;
            border-radius: 1000px !important;
            margin-top: 35px;
            }
            }
    
            @media only screen and (max-width: 800px) {
            .sm-popup {
            width: 690px;
            height: 990px;
            }
            .sm-button {
            font-size: 18px;
            width: 46px;
            height: 46px;
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
            width: 690px;
            height: 990px;
            }
    
            .twik-popup-main {
            width: 100%;
            width: 590px;
            margin-right: 18px;
            margin-left: 18px;
            padding: 32px;
            font-size: 28px;
            line-height: 24px;
            }
            .twik-popup-title {
            font-size: 64px;
            line-height: 64px;
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
            width: 690px;
            height: 480px;
            }
    
            .twik-popup-main>div:nth-child(3) {
            line-height: 48px;
            font-size: 48px;
            margin-top: 0px;
    
            }
    
            .twik-popup-main>a {
            font-size: 48px;
            line-height: 48px;
            margin-top: 45px;
            padding: 16px 42px !important;
            border-radius: 1000px !important;
            }
            }
    
            @media only screen and (max-width: 700px) {
            .sm-popup {
            width: 590px;
            height: 850px;
            }
            .sm-button {
            font-size: 18px;
            width: 46px;
            height: 46px;
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
            width: 590px;
            height: 850px;
            }
    
            .twik-popup-main {
            width: 100%;
            width: 490px;
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
            width: 590px;
            height: 410px;
            }
    
            .twik-popup-main>div:nth-child(3) {
            line-height: 42px;
            font-size: 42px;
    
            }
    
            .twik-popup-main>a {
            font-size: 42px;
            line-height: 42px;
            margin-top: 40px;
            padding: 16px 42px !important;
            border-radius: 1000px !important;
            }
            }
    
            @media only screen and (max-width: 600px) {
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
            margin-top: 0px;
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
            font-size: 28px;
            line-height: 28px;
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
let popupStyleDesktop = `
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
            font-size: 20px;
            display: none;
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
            box-sizing: border-box;
            cursor: pointer;
            position: absolute;
            z-index: 999;
            transition: all .1s ease;
            opacity: .5;
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
            background-color: #fff;
            box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .24), 0 30px 70px 0 rgba(0, 0, 0, .24);
            }
    
            .twik-popup-main {
            -webkit-text-size-adjust: 100%;
            -webkit-tap-highlight-color: transparent;
            font-weight: 400;
            font-family: AssistantRegular;
            visibility: visible;
            display: flex;
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
            text-align: center;
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
            text-align: center;
            border-style: none;
            vertical-align: middle;
            height: 250px;
            box-sizing: border-box;
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
            text-align: center;
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
            touch-action: manipulation;
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
            font-size: 28px;
            line-height: 28px;
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
          </style>
    
        `;
document.body.insertAdjacentHTML("beforeend", popupHTML);
if (
  /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  document.head.insertAdjacentHTML("beforeend", popupStyleMobile);
} else {
  document.head.insertAdjacentHTML("beforeend", popupStyleDesktop);
}

function mainJS() {
  let $regularsection_100vh = $(".regularsection._100vh");
  let $overlay = $(".sm-overlay");
  let $popup = $(".sm-popup");

  function displayPopup() {
    $regularsection_100vh.css({ display: "block" });
    $overlay.fadeIn();
    $popup.fadeIn();
    $popup.animate({ bottom: "0px" });
  }

  function hidePopup() {
    $overlay.fadeOut();
    $popup.animate({
      bottom: "-3000px",
    });
    $popup.fadeOut();
    setTimeout(() => {
      $regularsection_100vh.css({
        display: "none",
      });
    }, 500);
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
    sessionStorage.setItem("pop_seen", "true");
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

function scrollTracking() {
  // Get the new Value
  newValue = window.pageYOffset;

  //Subtract the two and conclude
  if (oldValue - newValue > 0) {
    distanceScrolledUp = distanceScrolledUp + (oldValue - newValue);
    if (distanceScrolledUp >= 300) {
      if (sessionStorage.getItem("pop_seen") == null) {
        popUpRun();
        window.removeEventListener("scroll", scrollTracking);
      }
    }
  } else {
    distanceScrolledUp = 0;
  }

  // Update the old value
  oldValue = newValue;
}

function startTrackingScrollUp() {
  window.addEventListener("scroll", scrollTracking);
}
