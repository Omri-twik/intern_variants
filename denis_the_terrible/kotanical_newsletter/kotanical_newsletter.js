var params;

function mainJS() {
  $("html")
    .attr("data-wf-page", "5d0752128518927d140033ab")
    .attr("data-wf-site", "5b27ad71f471c80738d206f5");
  if (
    $("link").filter("[href='https://public.twik.io/css/popup-bundle.min.css']")
      .length == 0
  ) {
    $(
      '<link href="https://public.twik.io/css/popup-bundle.min.css" rel="stylesheet" type="text/css">'
    ).appendTo("head");
  }
  if ($("div.regularsection").length == 0) {
    $('<div class="regularsection _100vh">').appendTo("body");
  }
  $(
    '<div class="relativepopup "><div id="popup-container" class="popup-container image-right" data-sm-init="true" data-state="success"><div class="popup-half-column"><div class="popup-image-full"><img alt="" class="popup-image subtitle-image" src="https://raw.githubusercontent.com/DrorBarnea-twik/intern_variants/master/denis_the_terrible/kotanical_newsletter/logoo_220x.png"></div><div class="popup-subtitle" style="color: #"></div><div id="temp-title" class="placeholder-section"></div><p class="popup-description" style="color: #686868">Subscribe to receive updates, access to exclusive deals, and more.</p><div id="temp-countdown" class="placeholder-section"></div><div class="popup-form-block need-fetch w-form"><form action="/contact#footer-newsletter" id="email-form" name="email-form" data-name="Email Form" class="form popup-form"><div class="form_inputs"><input type="text" class="popup-field field-style-2 w-input" maxlength="256" name="email" data-name="email" placeholder="Email" id="email"></div><div class="button-group vertical"><input type="submit" data-wait="Please wait..." class="popup-main-button w-button popup-button popup-button1 popup-button-page3" value="Stay updated" href="#" style="box-shadow: 0px 0px 2px black; color: black;background-color: white;"><div id="temp-button2" class="placeholder-section"></div></div></form><div class="w-form-done"><div>Thank you! Your submission has been received!</div></div><div class="w-form-fail"><div>Oops! Something went wrong while submitting the form.</div></div></div></div></div></div>'
  ).appendTo("div.regularsection");
  if (
    $("script").filter("[src='https://public.twik.io/js/popup-bundle.min.js']")
      .length == 0
  ) {
    $.getScript("https://public.twik.io/js/popup-bundle.min.js", function () {
      params = {
        popup_type: "instant",
        popup_position: "center",
        popup_animation: "slideBottom",
        popup_closeButtonPlace: "inside",
        popup_css: {
          "text-align": "center",
          margin: "0px",
          padding: "0",
          background: "transparent",
        },
      };
    });
  } else {
    params = {
      popup_type: "instant",
      popup_position: "center",
      popup_animation: "slideBottom",
      popup_closeButtonPlace: "inside",
      popup_css: {
        "text-align": "center",
        margin: "0px",
        padding: "0",
        background: "transparent",
      },
    };
  }
}

function runPopup() {
  $(".popup-container").SlickModals(params);
}

if (sessionStorage.getItem("pop_seen") === null) {
  document.addEventListener("mouseleave", () => {
    runPopup();
    sessionStorage.setItem("pop_seen", "true");
  });
}

if (window.jQuery) {
  $ = window.jQuery;
  mainJS();
} else {
  var script = document.createElement("SCRIPT");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
  script.type = "text/javascript";
  script.onload = function () {
    var $ = window.jQuery;
    mainJS();
  };
  document.getElementsByTagName("head")[0].appendChild(script);
}
