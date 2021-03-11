// stripe css
let css_string = `.shopify-stripe {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding: 24px;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    background-image: radial-gradient(circle farthest-corner at 50% 50%, #90b945, #618f3c);
    color: #fff;
  }
  
  .shopify-logo {
    height: 48px;
  }
  
  .shopify-container {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    max-width: 980px;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  
  .shopify-text {
    margin-left: 24px;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 24px;
    border-left: 1px solid #fff;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.24);
  }
  
  .shopify-text-title {
    margin-bottom: 6px;
    font-size: 18px;
    line-height: 28px;
    font-weight: 400;
  }
  
  .shopify-button {
    margin-left: 28px;
    padding: 12px 18px;
    border-style: solid;
    border-width: 1px 1px 2px;
    border-color: #1e1f20;
    border-radius: 8px;
    background-color: #2e3538;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    text-align: center;
  }
  
  .shopify-button:hover {
    background-color: #000;
  }
  
  @media screen and (max-width: 767px) {
    .shopify-container {
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
    }
  
    .shopify-text {
      margin-top: 12px;
      margin-bottom: 12px;
      margin-left: 0px;
      padding-left: 0px;
      border-left-style: none;
      text-align: center;
    }
  
    .shopify-button {
      margin-left: 0px;
    }
  }`;

let newStyleElem = document.createElement("STYLE");
newStyleElem.innerHTML = css_string;
newStyleElem.rel = "stylesheet";
newStyleElem.type = "text/css";

let head = document.getElementsByTagName("head")[0];
head.appendChild(newStyleElem);

// stripe html
let html_string = `<div class="shopify-stripe"><div class="shopify-container"><img src="https://i.imgur.com/TONFU1x.png" alt="Shopify logo" class="shopify-logo"><div class="shopify-text"><div class="shopify-text-title">Twik is now available on the Shopify app marketplace</div><div>Start your free 30-day trial now</div></div><a href="#" class="shopify-button w-button">Get the app</a></div></div>`;

let body = document.getElementsByTagName("body")[0];

body.insertAdjacentHTML("beforeend", html_string);
