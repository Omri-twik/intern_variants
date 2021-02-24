// #############################################################################################
// COLOR MANIPULATION
// #############################################################################################

// BACKGROUND OPACITY

function main_js_functionality() {
  function generateQuerySelector(element) {
    if (element.tagName.toLowerCase() == "html") return "HTML";
    let str = element.tagName;
    str += element.id != "" ? "#" + element.id : "";
    if (element.className) {
      let classes = element.className.split(/\s/);
      for (let i = 0; i < classes.length; i++) {
        str += "." + classes[i];
      }
    }
    return generateQuerySelector(element.parentNode) + " > " + str;
  }

  function parseColor(color) {
    var m = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (m) {
      return [m[1], m[2], m[3]];
    }

    m = color.match(
      /^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*((0.)?\d+)\s*\)$/i
    );
    if (m) {
      return [m[1], m[2], m[3], m[4]];
    }
  }

  function formatRGBA(arr, alpha) {
    return "rgba(" + arr.join(",") + `,${alpha})`;
  }

  function generateOpaquenessForElement(elem, opaq) {
    let selector = generateQuerySelector(elem);
    let originalColor = window.getComputedStyle(elem)["background-color"];
    let colorsArray = parseColor(originalColor);

    // if element has no background coloring - skip
    if (
      colorsArray.reduce((a, b) => {
        return a + b;
      }) === 0
    ) {
      return "";
    }

    if (colorsArray.length === 4) {
      if (colorsArray[3] > opaq) {
        var rgba = originalColor;
      } else {
        var rgba = formatRGBA(colorsArray, opaq);
      }
      let newStyle = `${selector} {
                background-color: ${rgba} !important;
                }\n`;
      return newStyle;
    } else {
      var rgba = formatRGBA(colorsArray, opaq);
      let newStyle = `${selector} {
            background-color: ${rgba} !important;
            }\n`;
      return newStyle;
    }
  }
  function generateOpaquenessForDocument(opaqueness) {
    let allElements = document.body.getElementsByTagName("*");

    let opacityElements = [];
    for (element of allElements) {
      try {
        opacityElements.push(generateOpaquenessForElement(element, opaqueness));
      } catch {}
    }
    let newStyleElemOpacity = `
          <style class="accessibility-styling" id="new-opaqueness-styling">
              ${opacityElements.join("")}
          </style>
      `;
    return newStyleElemOpacity;
  }

  function changeDocumentOpaqueness(desiredOpaqueness) {
    if ($("#new-opaqueness-styling")) {
      let existingStyling = $("#new-opaqueness-styling");
      existingStyling.remove();
    }
    $("head").append(generateOpaquenessForDocument(desiredOpaqueness));
  }

  // set font-color to black

  function fontColorToBlack() {
    if (!!document.querySelector("#font-color-black-styling")) {
      $("#font-color-black-styling").remove();
    } else {
      let stylingElementArray = [];
      for (element of document.body.getElementsByTagName("*")) {
        try {
          if (element.textContent.length > 0) {
            stylingElementArray.push(`${generateQuerySelector(element)} {
          color: black !important;
      }\n`);
          }
        } catch {}
      }
      let newStyle = `
      <style class="accessibility-styling" id="font-color-black-styling">
      ${stylingElementArray.join(" ")}
      </style>
              `;
      $("head").append(newStyle);
    }
  }

  // #############################################################################################
  // invert colors
  // #############################################################################################

  function invertColors() {
    // the css we are going to inject
    var css =
        "html {-webkit-filter: invert(100%);" +
        "-moz-filter: invert(100%);" +
        "-o-filter: invert(100%);" +
        "-ms-filter: invert(100%); }",
      head = document.getElementsByTagName("head")[0],
      style = document.createElement("style");

    // a hack, so you can "invert back" clicking the bookmarklet again
    if (!window.counter) {
      window.counter = 1;
    } else {
      window.counter++;
      if (window.counter % 2 == 0) {
        var css =
          "html {-webkit-filter: invert(0%); -moz-filter:    invert(0%); -o-filter: invert(0%); -ms-filter: invert(0%); }";
      }
    }

    style.type = "text/css";
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    //injecting the css to the head
    head.appendChild(style);
  }

  // #############################################################################################
  // grayscale
  // #############################################################################################

  function grayScale() {
    // the css we are going to inject
    var css =
        "html {-webkit-filter: grayscale(100%);" +
        "-moz-filter: grayscale(100%);" +
        "-o-filter: grayscale(100%);" +
        "-ms-filter: grayscale(100%); }",
      head = document.getElementsByTagName("head")[0],
      style = document.createElement("style");

    // a hack, so you can "invert back" clicking the bookmarklet again
    if (!window.counter) {
      window.counter = 1;
    } else {
      window.counter++;
      if (window.counter % 2 == 0) {
        var css =
          "html {-webkit-filter: grayscale(0%); -moz-filter:    grayscale(0%); -o-filter: grayscale(0%); -ms-filter: grayscale(0%); }";
      }
    }

    style.type = "text/css";
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    //injecting the css to the head
    head.appendChild(style);
  }

  // #############################################################################################
  // FONT SIZING
  // #############################################################################################

  function changeFontSize(increase, normal) {
    var storage = window.localStorage;

    if (!storage.getItem("fontDifference")) {
      storage.setItem("fontDifference", 0);
    }

    var elementsArray = [];

    for (element of document.body.getElementsByTagName("*")) {
      try {
        let selector = generateQuerySelector(element);
        if (element.textContent.length > 0) {
          let reg = /\d+/;
          let currentFontSize_str = window.getComputedStyle(element)[
            "fontSize"
          ];
          let currentFontSize = parseInt(currentFontSize_str.match(reg)[0]);

          if (normal) {
            var newFontSize =
              currentFontSize - parseInt(storage.getItem("fontDifference"));
          } else if (increase) {
            var newFontSize = currentFontSize + 1;
          } else {
            var newFontSize = currentFontSize - 1;
          }

          let newStyle = `${selector} {
            font-size: ${newFontSize}px !important;
            }\n`;
          elementsArray.push(newStyle);
        }
      } catch {}
    }

    if (normal) {
      storage.setItem("fontDifference", 0);
    } else if (increase) {
      let newFontDifference = parseInt(storage.getItem("fontDifference")) + 1;
      storage.setItem("fontDifference", newFontDifference);
    } else {
      let newFontDifference = parseInt(storage.getItem("fontDifference")) - 1;
      storage.setItem("fontDifference", newFontDifference);
    }

    if (!!document.querySelector("#font-size-accessibility-styling")) {
      try {
        $("#font-size-accessibility-styling").remove();
      } catch {}
    }

    $("head").append(
      `<style class="accessibility-styling" id="font-size-accessibility-styling">
${elementsArray.join("")}
</style>`
    );
  }

  // #############################################################################################
  // Image Titles
  // #############################################################################################

  function toggleAnnotateImages() {
    if (document.querySelector(".image-annotation-for-accessibility")) {
      $(".image-annotation-for-accessibility").remove();
    } else {
      for (image of document.getElementsByTagName("img")) {
        if (image.alt) var text = image.alt;
        else var text = "No image title";
        image.insertAdjacentHTML(
          "beforeBegin",
          `
        <div class="image-annotation-for-accessibility" style="z-index:9999999999; background-color: #ffffe0 !important; border:1px solid black; padding:5px; font-size: 25px; color: black;">
          ${text}
        </div>
        `
        );
      }
    }
  }

  // #############################################################################################
  // Underline headers
  // #############################################################################################

  function toggleUnderlineHeaders() {
    if (document.querySelector("#underline-headers-styling-accessibility")) {
      $("#underline-headers-styling-accessibility").remove();
    } else {
      let underlineElementArray = [];
      for (header of document.querySelectorAll("h1, h2, h3, h4, h5, h6")) {
        try {
          let underlineElementStyle = `${generateQuerySelector(header)} {
            text-decoration: underline;
          }
          `;
          underlineElementArray.push(underlineElementStyle);
        } catch {}
      }
      $("head").append(
        `<style class="accessibility-styling" id="underline-headers-styling-accessibility">
          ${underlineElementArray.join("")}
        </style>
        `
      );
    }
  }

  // #############################################################################################
  // Underline links
  // #############################################################################################

  function toggleUnderlineLinks() {
    if (document.querySelector("#underline-links-styling-accessibility")) {
      $("#underline-links-styling-accessibility").remove();
    } else {
      let underlineElementArray = [];
      for (link of document.querySelectorAll("a")) {
        try {
          let underlineElementStyle = `${generateQuerySelector(link)} {
            text-decoration: underline;
          }
          `;
          underlineElementArray.push(underlineElementStyle);
        } catch {}
      }
      $("head").append(
        `<style class="accessibility-styling" id="underline-links-styling-accessibility">
          ${underlineElementArray.join("")}
        </style>
        `
      );
    }
  }

  // #############################################################################################
  // CUSTOM LARGE POINTERS
  // #############################################################################################

  let white_default =
    'cursor: url("https://raw.githubusercontent.com/mickidum/acc_toolbar/master/acctoolbar/cursors/w21.png"), url("https://raw.githubusercontent.com/mickidum/acc_toolbar/master/acctoolbar/cursors/w21.cur"), auto;';
  let white_pointer = `cursor: url("https://raw.githubusercontent.com/mickidum/acc_toolbar/master/acctoolbar/cursors/hw21.png"), url("https://raw.githubusercontent.com/mickidum/acc_toolbar/master/acctoolbar/cursors/hw21.cur"), auto`;
  let black_default =
    'cursor: url("https://raw.githubusercontent.com/mickidum/acc_toolbar/master/acctoolbar/cursors/b2.png"), url("https://raw.githubusercontent.com/mickidum/acc_toolbar/master/acctoolbar/cursors/b2.cur"), auto;';
  let black_pointer = `cursor: url("https://raw.githubusercontent.com/mickidum/acc_toolbar/master/acctoolbar/cursors/hb.png"), url("https://raw.githubusercontent.com/mickidum/acc_toolbar/master/acctoolbar/cursors/bh2.cur"), auto`;

  function toggleBigCursor(css_default, css_pointer) {
    if (document.querySelector(".big-cursor-styling-accessibility")) {
      $(".big-cursor-styling-accessibility").remove();
    } else {
      $("head")
        .append(`<style class="accessibility-styling big-cursor-styling-accessibility">
      * {
        ${css_default}
        }
        </style>`);
      let pointersArray = [];
      for (elem of document.querySelectorAll("*")) {
        if (window.getComputedStyle(elem)["cursor"] === "pointer") {
          pointersArray.push(
            `${generateQuerySelector(elem)} {
              ${css_pointer}
              }`
          );
        }
      }
      $("head")
        .append(`<style class="accessibility-styling big-cursor-styling-accessibility">
      ${pointersArray.join("")}
      </style>`);
    }
  }

  // #############################################################################################
  // ZOOM
  // #############################################################################################

  function toggleZoomAccessibility() {
    if (document.querySelector("#zoom-accessibility")) {
      $("#zoom-accessibility").remove();
    } else {
      $("head").append(`
        <style id="zoom-accessibility" class="accessibility-styling">
        * {
          zoom: 1.05;
          -moz-transform: scale(1.05);
          -moz-transform-origin: 0 0;
        }
        </style>
      `);
    }
  }

  // #############################################################################################
  // REMOVE ANIMATIONS
  // #############################################################################################

  function toggleAnimations() {
    if (document.querySelector("#remove-animations-accessibility")) {
      $("#remove-animations-accessibility").remove();
    } else {
      let animationStyles = [];
      for (elem of document.querySelectorAll("*")) {
        try {
          animationStyles.push(
            `${generateQuerySelector(elem)} {
              -webkit-animation: none;
              -moz-animation: none;
              -ms-animation: none;
              animation: none;
            }`
          );
        } catch {}
      }

      $("body").append(
        `<style id="remove-animations-accessibility" class="accessibility-styling">
          ${animationStyles.join("")}
        </style>
        `
      );
    }
  }

  // #############################################################################################
  // RESET EVERYTHING
  // #############################################################################################

  function resetAccessibilityStyling() {
    $(".accessibility-styling").remove();
  }
}

//
//
//
//

if (window.jQuery) {
  $ = window.jQuery;
  main_js_functionality();
} else {
  var script = document.createElement("SCRIPT");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
  script.type = "text/javascript";
  // this is doc.ready
  //-------------------
  script.onload = function () {
    var $ = window.jQuery;
    main_js_functionality();
  };
  document.getElementsByTagName("head")[0].appendChild(script);
}
