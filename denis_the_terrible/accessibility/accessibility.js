// PLAN

// 1. Color
//   a. Black-white
//   b. Bright contrast
//   c. Inverse
// 2. Font sizing
//   a. increase text
//   b. decrease text
//   c. back to normal

// #############################################################################################
// #############################################################################################
// COLOR MANIPULATION
// #############################################################################################
// #############################################################################################

// #############################################################################################
// BACKGROUND OPACITY
// #############################################################################################

//
//
//
//
//

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

  //
  //
  //
  //

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
          <style id="new-opaqueness-styling">
              ${opacityElements.join(" ")}
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

  // #############################################################################################
  // set font-color to black
  // #############################################################################################

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
      <style id="font-color-black-styling">
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
  // #############################################################################################
  // FONT SIZING
  // #############################################################################################
  // #############################################################################################

  function getFontSize(selectorWithAccessibilityClass) {
    let size = window
      .getComputedStyle(selectorWithAccessibilityClass, null)
      .getPropertyValue("font-size");
    return parseFloat(size);
  }

  function changeFontSize(increase, normal) {
    for (element of document.body.getElementsByTagName("*")) {
      try {
        if (element.textContent.length > 0) {
          let actualFontSize = 0;
          if (normal) {
            element.style.fontSize = "1em";
          } else {
            if (increase) {
              actualFontSize = getFontSize(element) + 1;
            } else {
              actualFontSize = getFontSize(element) - 1;
            }
            element.style.fontSize = actualFontSize.toString() + "px";
          }
        }
      } catch {}
    }
  }

  changeFontSize();
  console.log("got here");
  changeFontSize(null, true);
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
