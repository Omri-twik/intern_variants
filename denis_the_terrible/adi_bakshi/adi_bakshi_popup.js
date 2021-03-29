let popupHTML = `

<div class="regularsection _100vh">
    <div class="relativepopup">
      <div class="sm-wrapper sm-active">
        <div class="sm-overlay"></div>
        <div class="sm-popup">
          <div class="sm-button"></div>
          <div id="popup-container" class="popup-container image-on-top" data-sm-init="false" data-state="success">
            <div class="popup-half-column-1">
              <div class="popup-title">!יאיי! 20% הנחה לחג</div>
              <p class="popup-description">:קוד הקופון</p>
              <div class="popup-discount">
                <div class="popup-discount-code">Holiday</div>
              </div>
              <div id="temp-countdown" class="placeholder-section"></div>
              <div class="button-group round vertical"><a href="https://adibakshi.co.il/collections/all-products"
                  class="popup-main-button">לכל האפשרויות</a>
                <div id="temp-button2" class="placeholder-section"></div>
              </div>
              <p class="popup-generator-p">© Free <a class= "popup-generator-link" href="https://www.twik.io/resources/popup-generator/" target="_blank">popup generator</a> by
                Twik</p>
            </div>
            <div class="popup-half-column-2"><img class="popup-image"
                src="https://cdn.shopify.com/s/files/1/0916/6544/files/cover-passover_1944x.jpg?v=1615725825" alt=""></div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

let popupStyleDesktop = `
<style>

body>div.regularsection._100vh {
      color: #000000;
      font-size: 14px;
      font-family: 'Open Sans', sans-serif;
      line-height: 1.6em;
      -webkit-text-size-adjust: 100%;
      box-sizing: border-box;
      margin: 0;
    }

    body>div.regularsection._100vh>div {
      color: #000000;
      font-size: 14px;
      font-family: 'Open Sans', sans-serif;
      line-height: 1.6em;
      -webkit-text-size-adjust: 100%;
      box-sizing: border-box;
      margin: 0;
      zoom: 100%;
    }

    body>div.regularsection._100vh>div>div {
      color: #000000;
      font-size: 14px;
      font-family: 'Open Sans', sans-serif;
      line-height: 1.6em;
      -webkit-text-size-adjust: 100%;
      box-sizing: border-box;
      margin: 0;
      position: fixed;
      z-index: 99999997;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: block;
    }

    body>div.regularsection._100vh>div>div>div.sm-overlay {
      color: #000000;
      font-size: 14px;
      font-family: 'Open Sans', sans-serif;
      line-height: 1.6em;
      -webkit-text-size-adjust: 100%;
      margin: 0;
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
      display: none;
    }

    .sm-popup {
      color: #000000;
      font-size: 14px;
      font-family: 'Open Sans', sans-serif;
      line-height: 1.6em;
      -webkit-text-size-adjust: 100%;
      box-sizing: border-box;
      z-index: 99999999;
      position: absolute;
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
      bottom: -3000px;
      background: transparent;
      margin: auto;
      padding: 0px;
      animation-duration: 0.4s;
      text-align: center;
      animation-delay: 0.2s;
      max-width: 390px;
      min-width: 390px;
      position: fixed;
      height: 651px;
    }

    .sm-popup>div.sm-button {
      opacity: 0.5;
      color: #000000;
      font-size: 14px;
      font-family: 'Open Sans', sans-serif;
      line-height: 1.6em;
      -webkit-text-size-adjust: 100%;
      text-align: center;
      margin: 0;
      box-sizing: border-box;
      cursor: pointer;
      position: absolute;
      z-index: 999;
      transition: all .1s ease;
      width: 30px;
      height: 35px;
      top: 0px;
      right: 2px;
    }

    .sm-button:before, .sm-button:after {
        position: absolute;
        content: ' ';
        height: 33px;
        width: 4px;
        background-color: white;
      }
      .sm-button:before {
        transform: rotate(45deg);
      }
      .sm-button:after {
        transform: rotate(-45deg);
      }

    #popup-container {
      color: #000000;
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      text-align: center;
      margin: 0;
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
      -webkit-box-orient: vertical;
      -webkit-box-direction: reverse;
      flex-direction: column-reverse;
    }

    .popup-half-column-1 {
      color: #000000;
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      font-size: 16px;
      line-height: 24px;
      margin: 0;
      box-sizing: border-box;
      display: flex;
      max-width: 390px;
      min-width: 390px;
      padding: 24px 24px 0;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      text-align: center;
    }

    .popup-title {
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      -webkit-box-direction: normal;
      text-align: center;
      margin: 0;
      box-sizing: border-box;
      margin-bottom: 12px;
      font-weight: 700;
      line-height: 50px;
      letter-spacing: -.4px;
      color: #000000;
      font-size: 30px;
    }

    .popup-description {
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      line-height: 24px;
      -webkit-box-direction: normal;
      text-align: center;
      margin: 0;
      font-size: 14px;
      margin-top: 12px;
      margin-bottom: 24px;
      box-sizing: border-box;
      color: #686868;
    }

    .popup-discount {
      color: #000000;
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      font-size: 16px;
      line-height: 24px;
      -webkit-box-direction: normal;
      text-align: center;
      margin: 0;
      box-sizing: border-box;
      margin-bottom: 24px;
    }

    .popup-discount-code {
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      -webkit-box-direction: normal;
      text-align: center;
      margin: 0;
      box-sizing: border-box;
      margin-bottom: 12px;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 8px 24px;
      border: 1px dashed #000;
      background-color: #f0f0f0;
      font-size: 36px;
      line-height: 48px;
      font-weight: 700;
      color: #d93434;
    }

    #temp-countdown {
      color: #000000;
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      font-size: 16px;
      line-height: 24px;
      -webkit-box-direction: normal;
      text-align: center;
      margin: 0;
      box-sizing: border-box;
      display: none;
    }

    .popup-half-column-1>div.button-group.round.vertical {
      color: #000000;
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      font-size: 16px;
      line-height: 24px;
      -webkit-box-direction: normal;
      text-align: center;
      margin: 0;
      box-sizing: border-box;
      display: flex;
      width: 100%;
      flex-flow: column;
    }

    .popup-main-button {
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      font-size: 16px;
      line-height: 24px;
      -webkit-box-direction: normal;
      outline: 0;
      transition: color .5s ease-in;
      text-decoration: none !important;
      box-sizing: border-box;
      flex: 1 1 auto;
      text-align: center;
      width: 100%;
      padding: 15px 24px 16px;
      margin: 8px 0 24px;
      border: none;
      border-radius: 100px;
      color: #ffffff !important;
      background-color: #D93434;
    }

    #temp-button2 {
      color: #000000;
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      font-size: 16px;
      line-height: 24px;
      -webkit-box-direction: normal;
      text-align: center;
      margin: 0;
      box-sizing: border-box;
      display: none;
    }

    .popup-generator-p {
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      line-height: 24px;
      -webkit-box-direction: normal;
      text-align: center;
      margin: 0;
      box-sizing: border-box;
      font-size: 14px;
      color: #868686;
      margin-bottom: 24px;
      margin-top: -12px;
    }

    .popup-generator-link {
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      line-height: 24px;
      -webkit-box-direction: normal;
      text-align: center;
      margin: 0;
      outline: 0;
      transition: color .5s ease-in;
      text-decoration: none !important;
      box-sizing: border-box;
      font-size: 14px;
      color: #868686;
    }

    .popup-half-column-2 {
      color: #000000;
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      font-size: 16px;
      line-height: 24px;
      margin: 0;
      box-sizing: border-box;
      display: flex;
      max-width: 390px;
      min-width: 390px;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      text-align: center;
      width: 100%;
      padding: 0;
      height: auto;
    }

    .popup-image {
      color: #000000;
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      font-size: 16px;
      line-height: 24px;
      -webkit-box-direction: normal;
      text-align: center;
      margin: 0;
      max-width: 100%;
      border: 0;
      box-sizing: border-box;
      max-height: 280px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      min-height: 280px;
    }
    </style>
`;

let popupStyleMobile = `
<style>

body>div.regularsection._100vh {
      color: #000000;
      font-size: 14px;
      font-family: 'Open Sans', sans-serif;
      line-height: 1.6em;
      -webkit-text-size-adjust: 100%;
      box-sizing: border-box;
      margin: 0;
    }

    body>div.regularsection._100vh>div {
      color: #000000;
      font-size: 14px;
      font-family: 'Open Sans', sans-serif;
      line-height: 1.6em;
      -webkit-text-size-adjust: 100%;
      box-sizing: border-box;
      margin: 0;
      zoom: 100%;
    }

    body>div.regularsection._100vh>div>div {
      color: #000000;
      font-size: 14px;
      font-family: 'Open Sans', sans-serif;
      line-height: 1.6em;
      -webkit-text-size-adjust: 100%;
      box-sizing: border-box;
      margin: 0;
      position: fixed;
      z-index: 99999997;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: block;
    }

    body>div.regularsection._100vh>div>div>div.sm-overlay {
      color: #000000;
      font-size: 14px;
      font-family: 'Open Sans', sans-serif;
      line-height: 1.6em;
      -webkit-text-size-adjust: 100%;
      margin: 0;
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
      display: none;
    }

    .sm-popup {
      color: #000000;
      font-size: 14px;
      font-family: 'Open Sans', sans-serif;
      line-height: 1.6em;
      -webkit-text-size-adjust: 100%;
      box-sizing: border-box;
      z-index: 99999999;
      position: absolute;
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
      bottom: -3000px;
      background: transparent;
      margin: auto;
      padding: 0px;
      animation-duration: 0.4s;
      text-align: center;
      animation-delay: 0.2s;
      max-width: 390px;
      min-width: 390px;
      position: fixed;
      height: 651px;
    }

    .sm-popup>div.sm-button {
        opacity: 0.5;
        color: #000000;
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
        line-height: 1.6em;
        -webkit-text-size-adjust: 100%;
        text-align: center;
        margin: 0;
        box-sizing: border-box;
        cursor: pointer;
        position: absolute;
        z-index: 999;
        transition: all .1s ease;
        width: 30px;
        height: 35px;
        top: 0px;
        right: 2px;
      }
  
      .sm-button:before, .sm-button:after {
          position: absolute;
          content: ' ';
          height: 33px;
          width: 4px;
          background-color: white;
        }
        .sm-button:before {
          transform: rotate(45deg);
        }
        .sm-button:after {
          transform: rotate(-45deg);
        }

    #popup-container {
      color: #000000;
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      text-align: center;
      margin: 0;
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
      -webkit-box-orient: vertical;
      -webkit-box-direction: reverse;
      flex-direction: column-reverse;
    }
    
    .popup-half-column-1 {
      color: #000000;
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      font-size: 16px;
      line-height: 24px;
      margin: 0;
      box-sizing: border-box;
      display: flex;
      max-width: 390px;
      min-width: 390px;
      padding: 24px 24px 0;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      text-align: center;
    }

    .popup-title {
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      -webkit-box-direction: normal;
      text-align: center;
      margin: 0;
      box-sizing: border-box;
      margin-bottom: 12px;
      font-weight: 700;
      line-height: 50px;
      letter-spacing: -.4px;
      color: #000000;
      font-size: 30px;
    }

    .popup-description {
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      line-height: 24px;
      -webkit-box-direction: normal;
      text-align: center;
      margin: 0;
      font-size: 14px;
      margin-top: 12px;
      margin-bottom: 24px;
      box-sizing: border-box;
      color: #686868;
    }

    .popup-discount {
      color: #000000;
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      font-size: 16px;
      line-height: 24px;
      -webkit-box-direction: normal;
      text-align: center;
      margin: 0;
      box-sizing: border-box;
      margin-bottom: 24px;
    }

    .popup-discount-code {
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      -webkit-box-direction: normal;
      text-align: center;
      margin: 0;
      box-sizing: border-box;
      margin-bottom: 12px;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 8px 24px;
      border: 1px dashed #000;
      background-color: #f0f0f0;
      font-size: 36px;
      line-height: 48px;
      font-weight: 700;
      color: #d93434;
    }

    #temp-countdown {
      color: #000000;
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      font-size: 16px;
      line-height: 24px;
      -webkit-box-direction: normal;
      text-align: center;
      margin: 0;
      box-sizing: border-box;
      display: none;
    }

    .popup-half-column-1>div.button-group.round.vertical {
      color: #000000;
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      font-size: 16px;
      line-height: 24px;
      -webkit-box-direction: normal;
      text-align: center;
      margin: 0;
      box-sizing: border-box;
      display: flex;
      width: 100%;
      flex-flow: column;
    }

    .popup-main-button {
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      font-size: 16px;
      line-height: 24px;
      -webkit-box-direction: normal;
      outline: 0;
      transition: color .5s ease-in;
      text-decoration: none !important;
      box-sizing: border-box;
      flex: 1 1 auto;
      text-align: center;
      width: 100%;
      padding: 15px 24px 16px;
      margin: 8px 0 24px;
      border: none;
      border-radius: 100px;
      color: #ffffff !important;
      background-color: #D93434;
    }

    #temp-button2 {
      color: #000000;
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      font-size: 16px;
      line-height: 24px;
      -webkit-box-direction: normal;
      text-align: center;
      margin: 0;
      box-sizing: border-box;
      display: none;
    }

    .popup-generator-p {
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      line-height: 24px;
      -webkit-box-direction: normal;
      text-align: center;
      margin: 0;
      box-sizing: border-box;
      font-size: 14px;
      color: #868686;
      margin-bottom: 24px;
      margin-top: -12px;
    }

    .popup-generator-link {
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      line-height: 24px;
      -webkit-box-direction: normal;
      text-align: center;
      margin: 0;
      outline: 0;
      transition: color .5s ease-in;
      text-decoration: none !important;
      box-sizing: border-box;
      font-size: 14px;
      color: #868686;
    }

    .popup-half-column-2 {
      color: #000000;
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      font-size: 16px;
      line-height: 24px;
      margin: 0;
      box-sizing: border-box;
      display: flex;
      max-width: 390px;
      min-width: 390px;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      text-align: center;
      width: 100%;
      padding: 0;
      height: auto;
    }

    .popup-image {
      color: #000000;
      font-family: 'Open Sans', sans-serif;
      -webkit-text-size-adjust: 100%;
      font-size: 16px;
      line-height: 24px;
      -webkit-box-direction: normal;
      text-align: center;
      margin: 0;
      max-width: 100%;
      border: 0;
      box-sizing: border-box;
      max-height: 280px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      min-height: 280px;
    }


    .sm-popup {
        max-width: 990px;
        min-width: 990px;
        width: 990px;
        height: 1650px;
    }
  
      .sm-popup>div.sm-button {
        width: 70px;
        height: 70px;
        top: 3px;
        right: 12px;
      }

      .sm-button:before, .sm-button:after {
          height: 75px;
          width: 8px;
        }
  
      #popup-container {
        margin: 0;
        font-size: 16px;
        line-height: 24px;
        max-width: 990px;
        min-width: 990px;
        width: 990px;
        height: 1650px;
      }
  
      .popup-half-column-1 {
        font-size: 16px;
        line-height: 24px;
        max-width: 990px;
        min-width: 990px;
        height: 940px;
      padding: 44px 44px 0;

      }
  
      .popup-title {
        margin: 0;
        margin-bottom: 52px;
        font-weight: 700;
        line-height: 90px;
        font-size: 90px;
      }
  
      .popup-description {
        line-height: 44px;
        margin: 0;
        font-size: 34px;
        margin-top: 22px;
        margin-bottom: 44px;
      }
  
      .popup-discount {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 24px;
      }
  
      .popup-discount-code {
        margin-bottom: 32px;
        letter-spacing: 1px;
        padding: 38px 54px;
        font-size: 66px;
        line-height: 66px;
        font-weight: 700;
      }
  
      #temp-countdown {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
      }
  
      .popup-half-column-1>div.button-group.round.vertical {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
        width: 100%;
      }
  
      .popup-main-button {
        font-size: 56px;
        line-height: 56px;
        padding: 35px 34px 35px;
        margin-bottom: 50px;
      }
  
      #temp-button2 {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
        display: none;
      }
  
      .popup-generator-p {
        line-height: 34px;
        font-size: 34px;
        margin-bottom: 24px;
        margin-top: 12px;
      }
  
      .popup-generator-link {
        line-height: inherit;
        font-size: inherit;
      }
  
      .popup-half-column-2 {
        font-size: 16px;
        line-height: 24px;
        width: 100%;
        max-width: 990px;
        min-width: 990px;
      }
  
      .popup-image {
        font-size: 16px;
        line-height: 24px;
        max-width: 100%;
        width: 100%;
        height: 100%;
        max-height: 710px;
        min-height: 710px;
      }

    @media only screen and (max-width: 1000px) {
      .sm-popup {
        max-width: 890px;
        min-width: 890px;
        width: 890px;
        height: 1483px;
    }
  
      .sm-popup>div.sm-button {
        width: 65px;
        height: 65px;
        top: 4px;
        right: 9px;
      }

      .sm-button:before, .sm-button:after {
          height: 65px;
          width: 7px;
        }
  
      #popup-container {
        margin: 0;
        font-size: 16px;
        line-height: 24px;
        max-width: 890px;
        min-width: 890px;
        width: 890px;
        height: 1483px;
      }
  
      .popup-half-column-1 {
        font-size: 16px;
        line-height: 24px;
        max-width: 890px;
        min-width: 890px;
        height: 847px;
      padding: 44px 44px 0;

      }
  
      .popup-title {
        margin: 0;
        margin-bottom: 52px;
        font-weight: 700;
        line-height: 80px;
        font-size: 80px;
      }
  
      .popup-description {
        line-height: 44px;
        margin: 0;
        font-size: 34px;
        margin-top: 22px;
        margin-bottom: 44px;
      }
  
      .popup-discount {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 24px;
      }
  
      .popup-discount-code {
        margin-bottom: 32px;
        letter-spacing: 1px;
        padding: 38px 54px;
        font-size: 66px;
        line-height: 66px;
        font-weight: 700;
      }
  
      #temp-countdown {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
      }
  
      .popup-half-column-1>div.button-group.round.vertical {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
        width: 100%;
      }
  
      .popup-main-button {
        font-size: 56px;
        line-height: 56px;
        padding: 35px 34px 35px;
        margin-bottom: 50px;
      }
  
      #temp-button2 {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
        display: none;
      }
  
      .popup-generator-p {
        line-height: 34px;
        font-size: 34px;
        margin-bottom: 24px;
        margin-top: 12px;
      }
  
      .popup-generator-link {
        line-height: inherit;
        font-size: inherit;
      }
  
      .popup-half-column-2 {
        font-size: 16px;
        line-height: 24px;
        width: 100%;
        max-width: 890px;
        min-width: 890px;
      }
  
      .popup-image {
        font-size: 16px;
        line-height: 24px;
        max-width: 100%;
        width: 100%;
        height: 100%;
        max-height: 639px;
        min-height: 639px;
      }
        }

        @media only screen and (max-width: 900px) {

          .sm-popup {
        max-width: 790px;
        min-width: 790px;
        width: 790px;
        height: 1316px;
    }
  
      .sm-popup>div.sm-button {
        width: 60px;
        height: 60px;
        top: 6px;
        right: 12px;
      }

      .sm-button:before, .sm-button:after {
          height: 60px;
          width: 7px;
        }
  
      #popup-container {
        margin: 0;
        font-size: 16px;
        line-height: 24px;
        max-width: 790px;
        min-width: 790px;
        width: 790px;
        height: 1316px;
      }
  
      .popup-half-column-1 {
        font-size: 16px;
        line-height: 24px;
        max-width: 790px;
        min-width: 790px;
        height: 751px;
      padding: 44px 44px 0;

      }
  
      .popup-title {
        margin: 0;
        margin-bottom: 32px;
        font-weight: 700;
        line-height: 70px;
        font-size: 70px;
      }
  
      .popup-description {
        line-height: 40px;
        margin: 0;
        font-size: 30px;
        margin-top: 22px;
        margin-bottom: 40px;
      }
  
      .popup-discount {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 24px;
      }
  
      .popup-discount-code {
        margin-bottom: 22px;
        letter-spacing: 1px;
        padding: 38px 54px;
        font-size: 56px;
        line-height: 56px;
        font-weight: 700;
      }
  
      #temp-countdown {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
      }
  
      .popup-half-column-1>div.button-group.round.vertical {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
        width: 100%;
      }
  
      .popup-main-button {
        font-size: 40px;
        line-height: 40px;
        padding: 35px 34px 35px;
        margin-bottom: 20px;
      }
  
      #temp-button2 {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
        display: none;
      }
  
      .popup-generator-p {
        line-height: 34px;
        font-size: 34px;
        margin-bottom: 24px;
        margin-top: 12px;
      }
  
      .popup-generator-link {
        line-height: inherit;
        font-size: inherit;
      }
  
      .popup-half-column-2 {
        font-size: 16px;
        line-height: 24px;
        width: 100%;
        max-width: 790px;
        min-width: 790px;
      }
  
      .popup-image {
        font-size: 16px;
        line-height: 24px;
        max-width: 100%;
        width: 100%;
        height: 100%;
        max-height: 567px;
        min-height: 567px;
      }
        }

        @media only screen and (max-width: 800px) {

          .sm-popup {
        max-width: 690px;
        min-width: 690px;
        width: 690px;
        height: 1150px;
    }
  
      .sm-popup>div.sm-button {
        width: 50px;
        height: 50px;
        top: 4px;
        right: 12px;
      }

      .sm-button:before, .sm-button:after {
          height: 55px;
          width: 6px;
        }
  
      #popup-container {
        margin: 0;
        font-size: 16px;
        line-height: 24px;
        max-width: 690px;
        min-width: 690px;
        width: 690px;
        height: 1150px;
      }
  
      .popup-half-column-1 {
        font-size: 16px;
        line-height: 24px;
        max-width: 690px;
        min-width: 690px;
        height: 655px;
      padding: 44px 44px 0;

      }
  
      .popup-title {
        margin: 0;
        margin-bottom: 22px;
        font-weight: 700;
        line-height: 60px;
        font-size: 60px;
      }
  
      .popup-description {
        line-height: 30px;
        margin: 0;
        font-size: 25px;
        margin-top: 20px;
        margin-bottom: 30px;
      }
  
      .popup-discount {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 24px;
      }
  
      .popup-discount-code {
        margin-bottom: 22px;
        letter-spacing: 1px;
        padding: 38px 54px;
        font-size: 56px;
        line-height: 56px;
        font-weight: 700;
      }
  
      #temp-countdown {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
      }
  
      .popup-half-column-1>div.button-group.round.vertical {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
        width: 100%;
      }
  
      .popup-main-button {
        font-size: 40px;
        line-height: 40px;
        padding: 35px 34px 35px;
        margin-bottom: 20px;
      }
  
      #temp-button2 {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
        display: none;
      }
  
      .popup-generator-p {
        line-height: 34px;
        font-size: 34px;
        margin-bottom: 24px;
        margin-top: 12px;
      }
  
      .popup-generator-link {
        line-height: inherit;
        font-size: inherit;
      }
  
      .popup-half-column-2 {
        font-size: 16px;
        line-height: 24px;
        width: 100%;
        max-width: 690px;
        min-width: 690px;
      }
  
      .popup-image {
        font-size: 16px;
        line-height: 24px;
        max-width: 100%;
        width: 100%;
        height: 100%;
        max-height: 495px;
        min-height: 495px;
      }
        }

        @media only screen and (max-width: 700px) {

          .sm-popup {
        max-width: 590px;
        min-width: 590px;
        width: 590px;
        height: 983px;
    }
  
      .sm-popup>div.sm-button {
        width: 40px;
        height: 40px;
        top: 8px;
        right: 12px;
      }

      .sm-button:before, .sm-button:after {
          height: 45px;
          width: 5px;
        }
  
      #popup-container {
        margin: 0;
        font-size: 16px;
        line-height: 24px;
        max-width: 590px;
        min-width: 590px;
        width: 590px;
        height: 983px;
      }
  
      .popup-half-column-1 {
        font-size: 16px;
        line-height: 24px;
        max-width: 590px;
        min-width: 590px;
        height: 560px;
      padding: 44px 44px 0;

      }
  
      .popup-title {
        margin: 0;
        margin-bottom: 12px;
        font-weight: 700;
        line-height: 50px;
        font-size: 50px;
      }
  
      .popup-description {
        line-height: 30px;
        margin: 0;
        font-size: 25px;
        margin-top: 10px;
        margin-bottom: 30px;
      }
  
      .popup-discount {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 24px;
      }
  
      .popup-discount-code {
        margin-bottom: 22px;
        letter-spacing: 1px;
        padding: 28px 44px;
        font-size: 46px;
        line-height: 56px;
        font-weight: 700;
      }
  
      #temp-countdown {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
      }
  
      .popup-half-column-1>div.button-group.round.vertical {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
        width: 100%;
      }
  
      .popup-main-button {
        font-size: 30px;
        line-height: 30px;
        padding: 35px 34px 35px;
        margin-bottom: 20px;
      }
  
      #temp-button2 {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
        display: none;
      }
  
      .popup-generator-p {
        line-height: 24px;
        font-size: 24px;
        margin-bottom: 24px;
        margin-top: 12px;
      }
  
      .popup-generator-link {
        line-height: inherit;
        font-size: inherit;
      }
  
      .popup-half-column-2 {
        font-size: 16px;
        line-height: 24px;
        width: 100%;
        max-width: 590px;
        min-width: 590px;
      }
  
      .popup-image {
        font-size: 16px;
        line-height: 24px;
        max-width: 100%;
        width: 100%;
        height: 100%;
        max-height: 423px;
        min-height: 423px;
      }
        }

        @media only screen and (max-width: 600px) {

          .sm-popup {
        max-width: 490px;
        min-width: 490px;
        width: 490px;
        height: 816px;
    }
  
      .sm-popup>div.sm-button {
        width: 34px;
        height: 34px;
        top: 4px;
        right: 8px;
      }

      .sm-button:before, .sm-button:after {
          height: 35px;
          width: 4px;
        }
  
      #popup-container {
        margin: 0;
        font-size: 16px;
        line-height: 24px;
        max-width: 490px;
        min-width: 490px;
        width: 490px;
        height: 816px;
      }
  
      .popup-half-column-1 {
        font-size: 16px;
        line-height: 24px;
        max-width: 490px;
        min-width: 490px;
        height: 465px;
      padding: 44px 44px 0;

      }
  
      .popup-title {
        margin: 0;
        margin-bottom: 10px;
        font-weight: 700;
        line-height: 40px;
        font-size: 40px;
      }
  
      .popup-description {
        line-height: 20px;
        margin: 0;
        font-size: 20px;
        margin-top: 10px;
        margin-bottom: 20px;
      }
  
      .popup-discount {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 10px;

      }
  
      .popup-discount-code {
        letter-spacing: 1px;
        padding: 28px 44px;
        font-size: 46px;
        line-height: 56px;
        font-weight: 700;
        margin-bottom: 10px;

      }
  
      #temp-countdown {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
      }
  
      .popup-half-column-1>div.button-group.round.vertical {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
        width: 100%;
      }
  
      .popup-main-button {
        font-size: 30px;
        line-height: 30px;
        padding: 25px 24px 25px;
        margin-bottom: 20px;
      }
  
      #temp-button2 {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
        display: none;
      }
  
      .popup-generator-p {
        line-height: 20px;
        font-size: 20px;
        margin-bottom: 24px;
        margin-top: 12px;
      }
  
      .popup-generator-link {
        line-height: inherit;
        font-size: inherit;
      }
  
      .popup-half-column-2 {
        font-size: 16px;
        line-height: 24px;
        width: 100%;
        max-width: 490px;
        min-width: 490px;
      }
  
      .popup-image {
        font-size: 16px;
        line-height: 24px;
        max-width: 100%;
        width: 100%;
        height: 100%;
        max-height: 351px;
        min-height: 351px;
      }
        }

        @media only screen and (max-width: 500px) {

          .sm-popup {
        max-width: 390px;
        min-width: 390px;
        width: 390px;
        height: 650px;
    }
  
      .sm-popup>div.sm-button {
        width: 30px;
        height: 30px;
        top: 8px;
        right: 12px;
      }

      .sm-button:before, .sm-button:after {
          height: 35px;
          width: 4px;
        }
  
      #popup-container {
        margin: 0;
        font-size: 16px;
        line-height: 24px;
        max-width: 390px;
        min-width: 390px;
        width: 390px;
        height: 650px;
      }
  
      .popup-half-column-1 {
        font-size: 16px;
        line-height: 24px;
        max-width: 390px;
        min-width: 390px;
        height: 370px;
      padding: 44px 44px 0;

      }
  
      .popup-title {
        margin: 0;
        margin-bottom: 10px;
        font-weight: 700;
        line-height: 25px;
        font-size: 25px;
      }
  
      .popup-description {
        line-height: 15px;
        margin: 0;
        font-size: 15px;
        margin-top: 5px;
        margin-bottom: 15px;
      }
  
      .popup-discount {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 10px;

      }
  
      .popup-discount-code {
        letter-spacing: 1px;
        padding: 18px 34px;
        font-size: 36px;
        line-height: 46px;
        font-weight: 700;
        margin-bottom: 5px;

      }
  
      #temp-countdown {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
      }
  
      .popup-half-column-1>div.button-group.round.vertical {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
        width: 100%;
      }
  
      .popup-main-button {
        font-size: 25px;
        line-height: 25px;
        padding: 25px 24px 25px;
        margin-bottom: 15px;
      }
  
      #temp-button2 {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
        display: none;
      }
  
      .popup-generator-p {
        line-height: 15px;
        font-size: 15px;
        margin-bottom: 20px;
        margin-top: 10px;
      }
  
      .popup-generator-link {
        line-height: inherit;
        font-size: inherit;
      }
  
      .popup-half-column-2 {
        font-size: 16px;
        line-height: 24px;
        width: 100%;
        max-width: 390px;
        min-width: 390px;
      }
  
      .popup-image {
        font-size: 16px;
        line-height: 24px;
        max-width: 100%;
        width: 100%;
        height: 100%;
        max-height: 280px;
        min-height: 280px;
      }
        }

        @media only screen and (max-width: 400px) {

          .sm-popup {
        max-width: 290px;
        min-width: 290px;
        width: 290px;
        height: 483px;
    }
  
      .sm-popup>div.sm-button {
        width: 24px;
        height: 24px;
        top: 4px;
        right: 6px;
      }

      .sm-button:before, .sm-button:after {
          height: 26px;
          width: 3px;
        }
  
      #popup-container {
        margin: 0;
        font-size: 16px;
        line-height: 24px;
        max-width: 290px;
        min-width: 290px;
        width: 290px;
        height: 483px;
      }
  
      .popup-half-column-1 {
        font-size: 16px;
        line-height: 24px;
        max-width: 290px;
        min-width: 290px;
        height: 275px;
      padding: 24px 24px 0;

      }
  
      .popup-title {
        margin: 0;
        margin-bottom: 5px;
        font-weight: 700;
        line-height: 22px;
        font-size: 22px;
      }
  
      .popup-description {
        line-height: 10px;
        margin: 0;
        font-size: 10px;
        margin-top: 5px;
        margin-bottom: 10px;
      }
  
      .popup-discount {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 10px;

      }
  
      .popup-discount-code {
        letter-spacing: 1px;
        padding: 15px 30px;
        font-size: 25px;
        line-height: 25px;
        font-weight: 700;
        margin-bottom: 5px;

      }
  
      #temp-countdown {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
      }
  
      .popup-half-column-1>div.button-group.round.vertical {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
        width: 100%;
      }
  
      .popup-main-button {
        font-size: 18px;
        line-height: 18px;
        padding: 15px 14px 15px;
        margin-bottom: 10px;
      }
  
      #temp-button2 {
        font-size: 16px;
        line-height: 24px;
        margin: 0;
        display: none;
      }
  
      .popup-generator-p {
        line-height: 12px;
        font-size: 12px;
        margin-bottom: 20px;
        margin-top: 10px;
      }
  
      .popup-generator-link {
        line-height: inherit;
        font-size: inherit;
      }
  
      .popup-half-column-2 {
        font-size: 16px;
        line-height: 24px;
        width: 100%;
        max-width: 290px;
        min-width: 290px;
      }
  
      .popup-image {
        font-size: 16px;
        line-height: 24px;
        max-width: 100%;
        width: 100%;
        height: 100%;
        max-height: 208px;
        min-height: 208px;
      }
        }

  </style>

`;

document.body.insertAdjacentHTML("beforeend", popupHTML);
if (/Mobi/i.test(window.navigator.userAgent)) {
  document.head.insertAdjacentHTML("beforeend", popupStyleMobile);
  console.log("mobile");
} else {
  document.head.insertAdjacentHTML("beforeend", popupStyleDesktop);
  console.log("desktop");
}
function mainJS() {
  let $regularsection_100vh = $(".regularsection._100vh");
  let $overlay = $(".sm-overlay");
  let $popup = $(".sm-popup");
  function displayPopup() {
    $regularsection_100vh.css({
      display: "block",
    });
    $overlay.fadeIn();
    $popup.fadeIn();
    $popup.animate({
      bottom: "0px",
    });
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

popUpRun();
