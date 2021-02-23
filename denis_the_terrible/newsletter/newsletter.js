// The following functionality works via API Spreadsheets (https://www.apispreadsheets.com/).
// It is necessary to connect your spreadsheet to API Spreadsheets and acquire an API URL
// (e.g. https://api.apispreadsheets.com/data/1234/)
// It is crucial that columns in the spreadsheet match the names of input fields. Otherwise data will not go through.
//
//-----------------------------------------------------------------------------------------------------------
//
// pick the main color of the banner
let customColor = "green";
// pick the color of text of the banner
let textColor = "black";
// pick the color of the input field on focus
let onFocusColor = "orange";
// select the color of the submit button
let submitButtonColor = "white";
// select the text of the submit button
let submitButtonText = "Submit";
// insert your link to API Spreadsheets
let apiSpreadsheet = "https://api.apispreadsheets.com/data/8354/";
// Pick what fields are required
let requiredFields = ["Full Name", "Phone", "Email"];
//
// Adjust the position of the icon
let iconPosition = `
bottom: 40%;
left: 30px;
`;
//
//-----------------------------------------------------------------------------------------------------------
//
//
//
//
//
//
//
//
// Start of functionality

var script = document.createElement("SCRIPT");
script.src =
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
script.type = "text/javascript";
// this is doc.ready
//-------------------
script.onload = function () {
  var $ = window.jQuery;
  $("head").append(
    `<style>

  .footerToggle {
    display: none !important;
  }

  .h3Fix {
    text-align: center;
  }

  .nwsltr {
    background-color: rgba(255,255,255,0.955);
    width: 100%;
    display: block;
    position: fixed;
    bottom: -610px;
    left: 0;
    z-index: 9999;
    color: ${textColor};
    transition: all 0.3s ease-out;
    justify-content: center;
  }


  .nwsltr .cls {
    position: absolute;
    cursor: pointer;
    top: 10px;
    right: 10px;
    width: 32px;
    height: 32px;
  }

  .nwsltr .cls:before,
  .nwsltr .cls:after {
    position: absolute;
    left: 15px;
    content: '';
    height: 33px;
    width: 2px;
    background-color: ${customColor};
  }

  .nwsltr .cls:before {
    transform: rotate(45deg);
  }

  .nwsltr .cls:after {
    transform: rotate(-45deg);
  }

  .bookmark-container {
    position: fixed;
    ${iconPosition};
    width: 30px;
    height: 30px;
    z-index: 999;

    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-out;
  }

  .bookmark-container:hover {
    transform: scale(1.1);
  }

  .bookmark.icon {
    box-sizing: border-box;
    background:${customColor};
    padding:11px;
    text-align:center;
    height:58px;
    width:58px;
    border-radius:48px;
    box-shadow:0 2px 8px rgb(0 0 0 / 12%);
  }


  #form-container {
    display: flex;
    justify-content: center;
    height: auto;
    border: black solid 1px;
  }

  .form-items-container {
    display: flex;
    justify-content: center;
  }

  #form-div {
    width: 800px;
  }

  #form {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  }

  .form-header {
    text-align: center;
    font-size: 10;
    margin-top: 15px;
    margin-bottom: 5px;
  }

  .text-input-label {
    margin-top: 6px;
    margin-bottom: 6px;
    font-size: 20;
  }

  #name-email-phone-div {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .name-email-phone-item {
    display: flex;
    flex-direction: column;
    width: 30%;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .form-field-div {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 90%;
    margin-top: 5px;
    margin-bottom: 5px;
    flex-grow: 1;
  }

  .form-submit-div {
    bottom: 6px;
    margin-top: 6px;
    border-radius: 6px;
    display: flex;
    width: 200px;
    height: 50px;
    justify-content: center;
  }

  .form-submit-button {
    border-radius: 6px;
    width: 100%;
    height: 100%;
    font-size: 20;
    border: 1px ${customColor} solid;
    color: ${submitButtonColor};
    font-weight: bold;
    background-color: ${customColor};
  }

  .form-field {
    border-radius: 6px;
    width: 100%;
    height: 100%;
    border: ${customColor} 1px solid;
    background-color: rgba(255, 255, 255, 0.985);
  }


  .text-input {
    border-radius: 6px;
    height: 40px;
    width: 100%;
    background-color: ${customColor}
  }

  .text-input-message {
    height: 100px;
  }

  .form-items-div {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
  }

  .form-message-div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
  }
  .nwsltr textarea {
    resize: none
  }
  
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
  }
  
  #thank-you-div {
    display:flex;
    align-items: center;
    justify-content: center;
  }

  input:focus, textarea:focus { 
    outline: none !important;
    border-color: ${onFocusColor} !important;
}

  @media screen and (max-width: 992px) {
    #name-email-phone-div {
      width: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .form-items-div {
      width: 90%;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
    }

    .form-field-div {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      width: 90%;
      margin-top: 5px;
      margin-bottom: 5px;
      flex-grow: 1;
    }

    .name-email-phone-item {
      display: flex;
      flex-direction: column;
      margin-top: 5px;
      margin-bottom: 5px;
      align-items: center;
      width: 100%;
    }

    .form-message-div {
      display: flex;
      align-items: center;
    }

    .form-item {
      width: 20%;
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 2px;
      padding-right: 2px;
    }
  }


  @media screen and (max-width: 600px) {
    .form-items-div {
      width: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
    }

    #name-email-phone-div {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .form-message-div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .form-submit-div {
      border-radius: 6px;
      display: flex;
      justify-content: center;
      width: 100%;
    }

    .form-submit-button {
      width: 100%;
    }
  }
  
</style>
`
  );
  //Elements
  $("body").append(
    `
    <div class="bookmark-container">
      <div class="bookmark icon">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;height: 34px;width: 34px;"
          xml:space="preserve">
          <style type="text/css">
            .st0 {
              fill: #FFF
            }
          </style>
          <g>
            <path class="st0"
              d="M2.5,20.5C1.1,20.5,0,19.3,0,18V6c0-0.6,0.2-1.3,0.7-1.7c0,0,0,0,0,0c0,0,0,0,0,0c0.5-0.5,1.1-0.7,1.8-0.7h19 c0.7,0,1.3,0.3,1.8,0.7c0,0,0,0,0,0c0,0,0,0,0,0C23.7,4.7,24,5.3,24,6v12c0,1.4-1.1,2.5-2.5,2.5H2.5z M1.2,5.3C1.1,5.5,1,5.7,1,6 v12c0,0.8,0.7,1.5,1.5,1.5h19c0.8,0,1.5-0.7,1.5-1.5V6c0-0.2-0.1-0.5-0.2-0.7l-10.5,8.6C12.2,13.9,12.1,14,12,14s-0.2,0-0.3-0.1 L1.2,5.3z M12,12.8l10.1-8.2c-0.2-0.1-0.4-0.1-0.6-0.1h-19c-0.2,0-0.4,0-0.6,0.1L12,12.8z">
            </path>
          </g>
        </svg>
      </div>
    </div>
          `
  );
  $("body").append(`
        <div class='nwsltr subscribe'>
        <div class='cls'>
        </div>
        </div>`);
  $(".nwsltr").html(`
  <div class="nwsltr subscribe" style="bottom: -610px;">
    <div class="cls">
    </div>
    <div class="page_wrap">
      <div class="footer_nl blocking">
        <div class="container">
          <div class="columns">
            <div class="column col-auto col-mx-auto">
              <div class="form-group">
                <form id="gForm" class="form">
                <div class="form-items-container">
                    <div class="form-items-div">
                        <div class="form-header">
                          <h2>Subscribe to our newsletter</h2>
                          </div>
                        <div id="name-email-phone-div">
                            <div class="name-email-phone-item">
                                <label class="text-input-label" for="Full Name">Full Name</label>
                                <div class="text-input">
                                    <input type="text" class="form-field" name="Full Name">
                                </div>

                            </div>
                            <div class="name-email-phone-item">
                                <label class="text-input-label" for="Email">Email</label>
                                <div class="text-input">
                                    <input type="text" class="form-field" name="Email">
                                </div>
                            </div>
                            <div class="name-email-phone-item">
                                <label class="text-input-label" for="Phone">Phone</label>
                                <div class="text-input">
                                    <input type="text" class="form-field" name="Phone">
                                </div>

                            </div>
                        </div>

                        <div class="form-message-div">
                            <div class="form-field-div">
                                <label class="text-input-label" for="Message">Message</label>
                                <div class="text-input text-input-message">
                                    <textarea type="text" class="form-field" name="Message"></textarea>
                                </div>

                            </div>
                        </div>

                        <div class="form-submit-div">
                            <button class="form-submit-button" id="form-submit-button" type="submit">Submit</button>
                        </div>

                    </div>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
`);

  $("head").append(`
  <script>
  </script>
`);

  // create submission event listener; collects data, sends it asynchronously and executes success or error javascript
  $("form#gForm").submit((e) => {
    e.preventDefault();
    let formData = {};
    for (field of document.querySelectorAll(".form-field")) {
      formData[field.name] = field.value;
    }

    let formItemsDiv = $(".form-items-div");
    let formItemsDivChildren = formItemsDiv.children();
    let thankYouHTML = `
    <div id="thank-you-div" style="height:${formItemsDiv.height()}px">
      <h1 id="thank-you-message" style="font-size:70px;">Thank you</h1>
    </div>
    `;
    formItemsDiv.empty();
    formItemsDiv.append(thankYouHTML);

    fetch(`${apiSpreadsheet}`, {
      method: "POST",
      body: JSON.stringify({ data: formData }),
    }).then((res) => {
      if (res.status === 201) {
        // SUCCESS
        $(".nwsltr").css({
          bottom: "-610px",
        });
        setTimeout(() => {
          formItemsDiv.empty();
          formItemsDiv.append(formItemsDivChildren);
          for (field of document.querySelectorAll(".form-field")) {
            field.value = "";
          }
        }, 200);
      } else {
        // ERROR
        $(".nwsltr").css({
          bottom: "-610px",
        });
        setTimeout(() => {
          formItemsDiv.empty();
          formItemsDiv.append(formItemsDivChildren);
          for (field of document.querySelectorAll(".form-field")) {
            field.value = "";
          }
        }, 200);
      }
    });
  });

  //Actions
  // open
  $(".bookmark-container").click(function () {
    $(".nwsltr").css({
      bottom: 0,
    });
  });
  // close
  $(".nwsltr .cls").click(function () {
    $(".nwsltr").css({
      bottom: "-610px",
    });
  });
  // adding required to input fields
  for (field of document.querySelectorAll(".form-field")) {
    if (requiredFields.includes(field.name)) {
      field.setAttribute("required", "");
    }
  }
};
document.getElementsByTagName("head")[0].appendChild(script);
