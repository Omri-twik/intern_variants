let footerSelector = `body > footer`;

jQuery(document).ready(function ($) {
  $("head").append(`<style>

        
        .fieldAlert{
          z-index:999;
          position:absolute;
        }
  .footerContact{
    position:relative;
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
  
    .contact-left {
      width: 30%;
    }
  
    #contactFormContainer .contact-left h2 {
      margin-bottom: 18px !important;
      color: white;
      text-align: left;
    }
    .contact-left ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display:block;
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
    .genarel-inputs input
     {
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
    }
  
    .genarel-inputs input::placeholder,
    .genarel-inputs select::placeholder,
    .contact-right .text-area textarea,
    .contact-right .text-area textarea::placeholder {
      color: white;
    }
  
    .genarel-inputs input:focus,
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
    .contact-right input[type="submit"] {
      width: 100%;
      background: transparent;
      border: 1px solid white;
      color: white;
      font-size: 18px;
      border-radius: 4px;
      padding: 10px;
      cursor: pointer;
      box-sizing: border-box;
      margin-top: 0;
      height: fit-content;
    }
  
    .contact-right input[type="submit"]::placeholder {
      color: white;
    }
  
    .contact-right .select-box::after {
      background: transparent;
    }
  
    .contact-left ul li {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }
    .contact-left ul li a {
      text-decoration: none;
      color: white;
      font-size: 17px;
    }
    .contact-left ul li img {
      margin-right: 18px;
    }
  
    .genarel-inputs-row {
      display: flex;
      justify-content: space-between;
    }
    .genarel-inputs-row > div {
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
    @media all and (max-width: 575px) {
      .genarel-inputs-row {
        flex-direction: column;
      }
      .genarel-inputs-row > div {
        width: 100%;
      }
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
      background: #da1d53;
  }
  
  #contactFormContainer .alert.alert-success, #test {
    display: none;
  }
  /* Change the white to any color ;) */

  input.footerContact:-webkit-autofill,
  input.footerContact:-webkit-autofill:hover,
  input.footerContact:-webkit-autofill:focus,
  input.footerContact:-webkit-autofill:active  {
    -webkit-text-fill-color: white;
      -webkit-box-shadow: 0 0 0 30px #da1d53 inset !important;
  }</style>`);

  $(`${footerSelector}`).before(`
  <div id="contactFormContainer" class="vc_row-full-width vc_clearfix">
  <div class="contactContainer">
    <div class="contact-contents">
      <div class="contact-left">
        <h2>Contact Us</h2>
        <ul>
          <li>
            <i class="icon--sm icon-Envelope color--white"></i>
            <a href="mailto:info@novisign.com">info@novisign.com</a>
          </li>
          <li>
            <i class="icon--sm icon-Phone color--white"></i>
            <a href="callto:97297947643">+972 (9) 794-7643</a>
          </li>
        </ul>
      </div>
      <div class="contact-right">
        <form id="contact-us-form" method="post">

          <div class="inputs">
            <div class="genarel-inputs">
              <div class="genarel-inputs-row">
                <div id="nameParent">
                  <input class="footerContact" type="text" name="sd-name" id="sdNameFooter" placeholder="Name">
                </div>
                <div id="phoneParent">
                  <input class="footerContact" type="text" name="sd-tel" id="sdTelFooter" placeholder="Phone">
                </div>
                <div id="emailParent">
                  <input class="footerContact" type="email" name="sd-email" id="sdEmailFooter" placeholder="Email">
                </div>
              </div>
              <div class="field-w100">
                <input class="footerContact" name="sd-message" id="sdMessageFooter" placeholder="Message" type="text">
              </div>
              <div class="genarel-inputs-row">
              </div>
            </div>
          </div>
          <div class="form-submit">
            <input type="submit" value="SUBMIT" />
          </div>
        </form>
      </div>
    </div>
    <div class="alert alertFooter alert-success mb-0" style="border-radius: 2;background-color: rgb(127, 209, 125);">
      Thank you! Your message has been sent.</div>
  </div>
</div>
      `);

  $("#contact-us-form").on("submit", (e) => {
    e.preventDefault();
    let array = [];
    let name = " " + document.getElementById("sdNameFooter").value;
    let phone = " " + document.getElementById("sdTelFooter").value;
    let email = " " + document.getElementById("sdEmailFooter").value;
    let message = " " + document.getElementById("sdMessageFooter").value;
    array.push(name, phone, email, message);
    console.log(array);

    validation = false;
    NoviTwikMail(array);
    setTimeout(clearFieldsValues);
    $("body").find(".alertFooter").fadeIn();
    setTimeout(removeAlert, 5000);
  });

  function clearFieldsValues() {
    document.getElementById("sdNameFooter").value = "";
    document.getElementById("sdTelFooter").value = "";
    document.getElementById("sdEmailFooter").value = "";
    document.getElementById("sdMessageFooter").value = "";
  }

  function removeAlert() {
    $("body").find(".alertFooter").fadeOut();
  }
});
