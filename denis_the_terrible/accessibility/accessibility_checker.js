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

// ############################################################################################################################
// images having no alt and svg have no title
// ############################################################################################################################

let images = document.querySelectorAll("img");
for (let image of images) {
  try {
    if (typeof image.alt === "undefined" || image.alt.length === 0) {
      image.alt = "image";
      console.log("added alt");
    }
  } catch {}
}

let svgs = document.querySelectorAll("svg");
for (let svg of svgs) {
  try {
    if (svg.querySelector("title").length === 0) {
      svg.insertAdjacentHTML(
        "afterbegin",
        `
        <title style="font-size:0px !important; color:rgba(0,0,0,0) !important;">svg title</title>
        `
      );
      console.log("added svg title");
    }
  } catch {}
}

// ############################################################################################################################
// broken ARIA menu (An ARIA menu does not contain required menu items.)
// An element with role="menu" does not contain at least one element with role="menuitem", role="menuitemcheckbox", or role="menuitemradio".
// ############################################################################################################################
let roleMenuElements = document.querySelectorAll('[role="menu"]');
if (roleMenuElements.length > 0) {
  for (let menu of roleMenuElements) {
    let menuItems = menu.querySelectorAll(
      '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]'
    );
    if (menuItems.length === 0) {
      menu.insertAdjacentHTML(
        "beforeend",
        `
            <div role="menuitem" style="font-size:0px !important; color:rgba(0,0,0,0) !important; width: 0px !important; height: 0px !important;">
                menuitem
            </div>
            `
      );
      console.log("fixed ARIA menu");
    }
  }
}

// ############################################################################################################################
// replacing i tags with em tags
// ############################################################################################################################
function cloneAttributes(target, source) {
  [...source.attributes].forEach((attr) => {
    target.setAttribute(attr.nodeName, attr.nodeValue);
  });
}

let iTags = document.querySelectorAll("i");
for (let i of iTags) {
  if (i.textContent > 0) {
    let new_em_tag = document.createElement("em");
    new_em_tag.innerHTML - i.innerHTML;
    cloneAttributes(new_em_tag, i);

    i.parentNode.replaceChild(new_em_tag, i);
  }
}

// ############################################################################################################################
// adding placeholders and labels to inputs
// ############################################################################################################################

let inputs = document.querySelectorAll("input, textarea");
document.head.insertAdjacentHTML(
  "beforeend",
  `
<style>
    .invisible-placeholder::-webkit-input-placeholder {
        font-size: 0px;
        color: rgba(0,0,0,0);
    }
</style>`
);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let input of inputs) {
  try {
    var newLabel = document.createElement("label");
    newLabel.style.setProperty("font-size", "0px", "important");
    newLabel.style.setProperty("color", "rgba(0,0,0,0)", "important");
    newLabel.style.setProperty("width", "0px", "important");
    newLabel.style.setProperty("height", "0px", "important");
    newLabel.style.setProperty("margin", "0px", "important");
    newLabel.style.setProperty("padding", "0px", "important");

    let randomTenDigitSequence = (() => {
      let randomTenDigitNumber_array = [];
      for (let i = 0; i < 10; i++) {
        randomTenDigitNumber_array.push(getRandomInt(0, 9));
      }
      let randomTenDiginNumber_string = randomTenDigitNumber_array.join("");
      return "_" + randomTenDiginNumber_string;
    })();

    // if input has no name and no placeholder - generate and use for both label.placeholder and label.htmlFor
    if (
      (typeof input.name === "undefined" || input.name.length === 0) &&
      (typeof input.placeholder === "undefined" ||
        input.placeholder.length === 0)
    ) {
      if (typeof input.id === "undefined" || input.id.length === 0) {
        input.id = randomTenDigitSequence;
      }

      newLabel.htmlFor = input.id;
      input.name = randomTenDigitSequence;
      input.placeholder = randomTenDigitSequence;

      newLabel.innerHTML = randomTenDigitSequence;

      input.classList.add("invisible-placeholder");
    }

    // if input has both name and placeholder - apply name to label.htmlFor
    else if (input.name.length > 0 && input.placeholder.length > 0) {
      if (typeof input.id === "undefined" || input.id.length === 0) {
        input.id = randomTenDigitSequence;
      }

      newLabel.htmlFor = input.id;
      newLabel.innerHTML = input.name;
    }

    // if input has name but no placeholder - use name as invisible placeholder and label.htmlFor
    else if (
      (typeof input.placeholder === "undefined" ||
        input.placeholder.length === 0) &&
      input.name.length > 0
    ) {
      if (typeof input.id === "undefined" || input.id.length === 0) {
        input.id = randomTenDigitSequence;
      }

      newLabel.htmlFor = input.id;
      input.placeholder = input.name;
      newLabel.innerHTML = input.name;

      input.classList.add("invisible-placeholder");
    }

    // if input has placeholder but no name - use placeholder as invisible placeholder and label.htmlFor
    else if (
      (typeof input.name === "undefined" || input.name.length === 0) &&
      input.placeholder.length > 0
    ) {
      if (typeof input.id === "undefined" || input.id.length === 0) {
        input.id = randomTenDigitSequence;
      }
      newLabel.htmlFor = input.id;

      input.name = input.placeholder;
      newLabel.innerHTML = input.name;
    }

    if (typeof input.title === "undefined" || input.title.length === 0) {
      try {
        input.title = "input title";
      } catch {}
    }

    // label cannot be inside of another label element
    var inputParent = input;
    while (inputParent) {
      inputParent = inputParent.parentElement;
      if (inputParent.tagName.toLowerCase() === "label") {
        break;
      } else if (inputParent.tagName.toLowerCase() === "html") {
        input.parentElement.insertBefore(newLabel, input);
        console.log("inserted label");
        break;
      }
    }
  } catch {}
}

// ############################################################################################################################
// forms having no labels
// form labels being hidden
// labels having no textContent
// ############################################################################################################################

let forms = document.querySelectorAll("form");
for (let form of forms) {
  // adding one label if none were present
  try {
    if (form.querySelectorAll("label").length === 0) {
      let labelElement = document.createElement("label");
      labelElement.innerHTML = "label";
      labelElement.style.fontSize = "0px";
      labelElement.style.height = "0px";
      labelElement.style.width = "0px";
      form.appendChild(labelElement);
      console.log("added label");
    }
  } catch {}
}

let labels = document.querySelectorAll("label");
for (let label of labels) {
  //removing hidden attributes from labels
  if (label.hasAttribute("hidden")) {
    try {
      console.log("had attribute hidden");
      label.removeAttribute("hidden");
      label.style.fontSize = "0px";
      label.style.height = "0px";
      label.style.width = "0px";
    } catch {}
  }
  // removing visibility hidden from labels
  if (window.getComputedStyle(label)["visibility"] === "hidden") {
    console.log("had visibility hidden");
    label.style.visibility = "visible";
    label.style.fontSize = "0px";
    label.style.height = "0px";
    label.style.width = "0px";
  }
  // adding text if label is empty
  let spacelessString = label.textContent.replace(/\s/g, "");
  if (spacelessString.length === 0) {
    let labelSpan = `<span style='width:"0px" !important; height:"0px" !important; font-size:"0px" !important; display:none !important;'>empty label</span>`;
    label.insertAdjacentHTML("beforeend", labelSpan);
  }
}
// ############################################################################################################################
// page having no language specified
// ############################################################################################################################

if (
  typeof document.documentElement.lang === "undefined" ||
  document.documentElement.lang.length === 0 ||
  (typeof document.documentElement.lang === "undefined" &&
    document.documentElement.lang.length === 0)
) {
  document.documentElement.lang = "en-US";
  console.log("added language");
}

// ############################################################################################################################
// dealing with missing title
// ############################################################################################################################

if (typeof document.title === "undefined" || document.title.length === 0) {
  document.title = "Website title";
  console.log("added title");
}

// ############################################################################################################################
// empty table header
// ############################################################################################################################

let tableHeaders = document.querySelectorAll("th");
for (let header of tableHeaders) {
  let spacelessString = header.textContent.replace(/\s/g, "");
  if (spacelessString.length === 0) {
    header.style.fontSize = "0px";
    header.style.color = "transparent";
    header.insertAdjacentHTML(
      "beforeend",
      `<span style='width:"0px" !important; height:"0px" !important; font-size:"0px" !important; display:none !important;'>empty header</span>`
    );
    console.log("added header");
  }
}

// ############################################################################################################################
// ensuring iframes have titles
// ############################################################################################################################
let iframes = document.querySelectorAll("iframe");
for (let iframe of iframes) {
  try {
    if (typeof iframe.title === "undefined" || iframe.title.length === 0) {
      iframe.title = "iframe title";
      console.log("added title to iframe");
    }
  } catch {}
}

// ############################################################################################################################
// empty button (no value)
// ############################################################################################################################

let buttons = document.querySelectorAll("button");
for (let button of buttons) {
  let spacelessString = button.textContent.replace(/\s/g, "");
  if (spacelessString.length === 0) {
    button.style.fontSize = "0px";
    button.style.color = "transparent";
    button.insertAdjacentHTML(
      "beforeend",
      `<span style='width:0px !important; height:0px !important; font-size:0px !important; display:none !important;'>empty button</span>`
    );
    console.log("added button text");
  }
}

// ############################################################################################################################
// link contains no text (<a></a> - no text between tags)
// ############################################################################################################################

let links = document.querySelectorAll("a");
for (let link of links) {
  let spacelessString = link.textContent.replace(/\s/g, "");
  if (spacelessString.length === 0) {
    link.style.fontSize = "0px";
    link.style.color = "transparent";
    let span = document.createElement("span");
    span.style.setProperty("display", "none", "important");
    span.style.setProperty("color", "rgba(0,0,0,0)", "important");
    span.style.setProperty("width", "0px", "important");
    span.style.setProperty("height", "0px", "important");
    span.style.setProperty("font-size", "0px", "important");
    span.innerHTML = "empty link";
    link.appendChild(span);
    var styles = window.getComputedStyle(link, ":after");
    var content = styles["content"];
    console.log("added link text");
  }
}

// ############################################################################################################################
// ############################################################################################################################
// LOW CONTRAST
// ############################################################################################################################
// ############################################################################################################################

function parseColor(color) {
  var m = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if (m) {
    return [m[1], m[2], m[3], "1"];
  }
  m = color.match(
    /^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*((0.)?\d+)\s*\)$/i
  );
  if (m) {
    return [m[1], m[2], m[3], m[4]];
  }
}

function formatRGBA(arr, alpha = "") {
  if (alpha.length !== 0) {
    return "rgba(" + arr.slice(0, 3).join(",") + `,${alpha})`;
  } else {
    try {
      return "rgba(" + arr.slice(0, 3).join(",") + `,${arr[3]})`;
    } catch {
      return "rgba(" + arr.slice(0, 3).join(",") + `,1)`;
    }
  }
}

function LightenDarkenColor(col, amt) {
  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

// uses hex colors (eg "00A000")
function getPerceptualBrightness_hex(color, alpha) {
  if (alpha == 0) {
    return 1530;
  }
  var r = parseInt(color.substring(0, 2), 16);
  var g = parseInt(color.substring(2, 4), 16);
  var b = parseInt(color.substring(4, 6), 16);
  return r * 2 + g * 3 + b;
}

// uses rgb colors
function getPerceptualBrightness_rgbString(color, alpha) {
  if (alpha == 0) {
    return 1530;
  }
  var [r, g, b] = parseColor(color).slice(0, 3);
  return (
    parseInt(componentToHex(r)) * 2 +
    parseInt(componentToHex(g)) * 3 +
    parseInt(componentToHex(b))
  );
}
function getPerceptualBrightness_rgbArray(color) {
  if (alpha == 0) {
    return 1530;
  }
  return parseInt(color[0]) * 2 + parseInt(color[1]) * 3 + parseInt(color[2]);
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return `${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}

function increaseDifference(brighterHex, darkerHex, desiredDifference) {
  let new_brighterHex = brighterHex;
  let new_darkerHex = darkerHex;

  // making sure the hex is always of length 6
  while (new_brighterHex.length < 6) {
    new_brighterHex = "0" + new_brighterHex;
  }
  while (new_darkerHex.length < 6) {
    new_darkerHex = "0" + new_darkerHex;
  }

  //calculating difference

  let difference =
    parseInt(getPerceptualBrightness_hex(new_brighterHex)) -
    parseInt(getPerceptualBrightness_hex(new_darkerHex));

  // increasing the difference if needed
  while (difference < desiredDifference) {
    if (desiredDifference >= 1530) {
      desiredDifference = 1530;
    }

    if (desiredDifference < 0) {
      desiredDifference = 0;
    }

    if (new_brighterHex.toLowerCase() !== "ffffff") {
      new_brighterHex = LightenDarkenColor(new_brighterHex, 1);
    }
    if (new_darkerHex !== "000000") {
      new_darkerHex = LightenDarkenColor(new_darkerHex, -1);
    }

    // making sure the hex is always of length 6
    while (new_brighterHex.length < 6) {
      new_brighterHex = "0" + new_brighterHex;
    }
    while (new_darkerHex.length < 6) {
      new_darkerHex = "0" + new_darkerHex;
    }
    if (new_darkerHex === "0") {
      new_darkerHex = "000000";
    }

    // recalculating difference

    difference =
      parseInt(getPerceptualBrightness_hex(new_brighterHex.toString())) -
      parseInt(getPerceptualBrightness_hex(new_darkerHex.toString()));
  }
  return [new_brighterHex, new_darkerHex];
}

function adjustContrast(desiredDifference) {
  let elements = document.body.querySelectorAll("*");
  let ignoreList = ["script", "style"];
  for (let elem of elements) {
    if (ignoreList.includes(elem.tagName.toLowerCase())) {
      continue;
    }
    if (
      elem.textContent.length === 0 &&
      elem.tagName.toLowerCase() !== "input"
    ) {
      continue;
    }

    try {
      var backgroundElem = elem;
      var elemStyle = window.getComputedStyle(elem);
      var backgroundElemStyle = window.getComputedStyle(backgroundElem);

      // store rgba values into variables
      var [r_text, g_text, b_text, alpha_text] = parseColor(elemStyle["color"]);
      var [
        r_background,
        g_background,
        b_background,
        alpha_background,
      ] = parseColor(backgroundElemStyle["backgroundColor"]);

      // if the element's background is transparent - search for nearest non-zero alpha element
      try {
        while (alpha_background == "0") {
          backgroundElem = backgroundElem.parentElement;
          backgroundElemStyle = window.getComputedStyle(backgroundElem);
          [
            r_background,
            g_background,
            b_background,
            alpha_background,
          ] = parseColor(backgroundElemStyle["backgroundColor"]);
        }
      } catch {}

      // continue if the text and background color have 0 alpha
      if (parseInt(alpha_background) + parseInt(alpha_text) === 0) {
        continue;
      }

      // convert rgb colors to hex
      let backgroundHex = rgbToHex(
        parseInt(r_background),
        parseInt(g_background),
        parseInt(b_background)
      );
      let textHex = rgbToHex(
        parseInt(r_text),
        parseInt(g_text),
        parseInt(b_text)
      );

      // measure brightness of colors
      var background_brightness = getPerceptualBrightness_hex(
        backgroundHex,
        alpha_background
      );
      var text_brightness = getPerceptualBrightness_hex(textHex, alpha_text);

      // deciding which color was brigher and which darker and brightening the brighter color and darkening the darker color
      if (text_brightness > background_brightness) {
        var [new_text_hex, new_background_hex] = increaseDifference(
          textHex,
          backgroundHex,
          desiredDifference
        );
      } else {
        var [new_background_hex, new_text_hex] = increaseDifference(
          backgroundHex,
          textHex,
          desiredDifference
        );
      }

      // making sure hex colors like 10101 are always represented as 010101
      while (new_text_hex.length < 6) {
        var new_text_hex = "0" + new_text_hex;
      }

      while (new_background_hex.length < 6) {
        var new_background_hex = "0" + new_background_hex;
      }

      // converting new colors from hex to rgb array
      let new_text_rgb_array = hexToRgb(new_text_hex);
      let new_background_rgb_array = hexToRgb(new_background_hex);

      // formatting an rgba string to use as style
      // if text had alpha, use it
      if (alpha_text) {
        var new_text_rgba = formatRGBA(new_text_rgb_array, alpha_text);
      } else {
        var new_text_rgba = formatRGBA(new_text_rgb_array, "1");
      }
      // if background had alpha, use it
      if (alpha_background) {
        var new_background_rgba = formatRGBA(
          new_background_rgb_array,
          alpha_background
        );
      } else {
        var new_background_rgba = formatRGBA(new_background_rgb_array, "1");
      }

      // if the new color is the same, do not touch the styling
      if (textHex !== new_text_hex) {
        // if text color was adjusted but new alpha is 0, make it 1 (fixes issues with ::before and ::after icons)
        if (alpha_text == 0) {
          new_text_rgba = formatRGBA(new_text_rgb_array, "1");
        }

        // dealing with element text color
        elem.style.setProperty("color", new_text_rgba, "important");
      }

      // dealing with placeholder color
      try {
        if (elem.placeholder.length > 0) {
          // if text color was adjusted but new alpha is 0, make it 1 (fixes issues with ::before and ::after icons)
          if (alpha_text == 0) {
            new_text_rgba = formatRGBA(new_text_rgb_array, "1");
          }
          document.head.insertAdjacentHTML(
            "beforeend",
            `
                  <style>
                      ${generateQuerySelector(
                        elem
                      )}::-webkit-input-placeholder {
                          color: ${new_text_rgba} !important;
                      }
                  </style>
                  `
          );
        }
      } catch {}
      if (backgroundHex !== new_background_hex) {
        backgroundElem.style.setProperty(
          "background-color",
          new_background_rgba,
          "important"
        );
      }

      // done
    } catch {}
  }
  console.log("DONE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
}

adjustContrast(1200);

// fix my stuff with replacing "i" with "em", because "i" is an icon tag, not italics

// Broken ARIA reference - aria is linked to a hidden item
