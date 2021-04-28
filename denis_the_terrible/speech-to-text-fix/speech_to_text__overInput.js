// #####################################################################################
// variable declaration
// #####################################################################################

var wavesurfer;
var micAvailable_bool = false;
var recognition;
let injectInvisibleDivForSearchElement;
var error = true;
let turnMicOn;
let turnMicOff;
let positionMicOverInput;
let addWavesurferScripts;
let getSearchInput;
let getSearchInputs;
let displayMicIcon;
let displayWaves;
let input;
let putMicIntoPlaceholder;
var SpeechRecognitionGrammarList;
let getStylesObjectForInvisibleDiv;
var grammar = "#JSGF V1.0;";
let setClickListenerOnInvisibleDiv;

// #####################################################################################
// adding jQuery
// #####################################################################################

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
  document.head.appendChild(script);
}

// ######################################################################################
// adding helper functions from online
// ######################################################################################
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

function generateRandomNumber(len) {
  let maximum = 9;
  let minimum = 0;
  let num_str = "";
  for (let i = 0; i < len; i++) {
    num_str += `${
      Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
    }`;
  }
  return num_str;
}

// start defining functions only after jQuery is available
function mainJS() {
  // #####################################################################################
  // defining functions
  // #####################################################################################

  turnMicOn = () => {
    recognition.start();
    try {
      recognition.start();
    } catch {
      console.error("recognition.start failed");
    }
  };

  turnMicOff = () => {
    try {
      recognition.stop();
    } catch {
      console.error("recognition.stop failed");
    }
  };

  getSearchInputs = () => {
    document.querySelectorAll("input").filter((input) => {
      let inputHTML = input.outerHTML.replace(input.innerHTML, "");
      if (inputHTML.toLowerCase().indexOf("search") !== -1) {
        return true;
      }
      return false;
    });
  };

  putMicIntoPlaceholder = (uniqueID_str) => {
    let inputElement = document.querySelector(
      `input[twikid="${uniqueID_str}"]`
    );
    inputElement.placeholder = `&#xf130;` + inputElement.placeholder;
    inputElement.style.fontFamily = "FontAwesome";
  };

  setClickListenerOnInvisibleDiv = (uniqueID_str) => {
    let twikInvisibleDiv = document.querySelector(
      `div[class="twik-invisible-div"][twikid="${uniqueID_str}"]`
    );
    twikInvisibleDiv.addEventListener("click", () => {
      turnMicOn();
      sessionStorage.setItem("active_twikid", uniqueID_str);
    });
  };

  assignUniqueIDtoInput = (inputElement) => {
    let uniqueID_str = generateRandomNumber(10);
    inputElement.setAttribute("twikid", uniqueID_str);
    console.log("assignUniqueIDtoInput");
  };

  injectInvisibleDivForSearchElement = (uniqueID_str) => {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="twik-invisible-div-wrapper">
        <div class="twik-invisible-div" twikid="${uniqueID_str}">
        </div>
      </div>
    `
    );

    let twikInvisibleDiv = document.querySelector(
      `div[class="twik-invisible-div"][twikid="${uniqueID_str}"]`
    );
    twikInvisibleDiv.parentElement.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    console.log("injectInvisibleDivForSearchElement");
  };

  getStylesObjectForInvisibleDiv = (uniqueID_str) => {
    let styles_obj;
    let inputElement = document.querySelector(
      `input[twikid="${uniqueID_str}"]`
    );
    let inputElement_boundingRect = inputElement.getboundingClientRect();

    styles_obj["width"] = `${parseInt(inputElement_boundingRect.width)}px`;
    styles_obj["height"] = `${parseInt(inputElement_boundingRect.height)}px`;
    styles_obj["right"] = `${parseInt(inputElement_boundingRect.right)}px`;
    styles_obj["top"] = `${parseInt(inputElement_boundingRect.top)}px`;
    console.log("getStylesObjectForInvisibleDiv");
    return styles_obj;
  };

  injectStyleForInvisibleDiv = (uniqueID_str, styles_obj) => {
    // remove previous style element
    if (document.querySelector(`style[twikid="${uniqueID_str}"]`)) {
      document.querySelector(`style[twikid="${uniqueID_str}"]`).remove();
    }

    let style_str = "";
    Object.keys(styles_obj).map((key) => {
      style_str += `${key}: ${styles_obj[key]};`;
    });

    document.head.insertAdjacentHTML(
      "beforeend",
      `
      <style twikid="${uniqueID_str}">
        div[class="twik-invisible-div"][twikid="${uniqueID_str}"] {
          ${style_str}
        }
      </style>
    `
    );
  };

  positionDivOverMicCharacter = (uniqueID_str) => {
    let styles_obj = getStylesObjectForInvisibleDiv(uniqueID_str);
    injectStyleForInvisibleDiv(uniqueID_str, styles_obj);
    console.log("positionDivOverMicCharacter");
  };

  // #####################################################################################
  // injecting main HTML and CSS
  // #####################################################################################

  document.head.insertAdjacentHTML(
    "beforeend",
    `
  <style>
    #waveform {
      height: 100%;
      width: 100%;
    }

    .twik-site-search {
      position: absolute;
      top: 50%;
      transform: translate(0%, -50%);
      right: 0px;
    }

    .twik-site-search, .twik-site-search * {
      overflow-x: hidden;
    }

    .mic-icon, .waveform-wrapper {
      width: 30px;
      height: 30px;
    }

    .twik-invisible-div-wrapper {
      position: fixed;
    }

    .twik-invisible-div {

    }

  </style>
    `
  );

  document.head.insertAdjacentHTML(
    "beforeend",
    `
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
  `
  );

  // #####################################################################################
  // setting event listeners
  // #####################################################################################

  window.addEventListener("resize", () => {
    document.querySelectorAll("input[twikid=*]").map((inputElement) => {
      let uniqueID_str = inputElement.getAttribute("twikid");
      positionDivOverMicCharacter(uniqueID_str);
    });
  });

  document.querySelector(".twik-site-search").addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // ##############################################################
  // speech-to-text
  // ##############################################################
  if (
    typeof SpeechRecognition !== "undefined" &&
    typeof SpeechGrammarList !== "undefined"
  ) {
    recognition = new SpeechRecognition();
    SpeechRecognitionGrammarList = new SpeechGrammarList();
  } else if (
    typeof webkitSpeechRecognition !== "undefined" &&
    typeof webkitSpeechGrammarList !== "undefined"
  ) {
    recognition = new webkitSpeechRecognition();
    SpeechRecognitionGrammarList = new webkitSpeechGrammarList();
  }

  SpeechRecognitionGrammarList.addFromString(grammar, 1);

  recognition.grammars = SpeechRecognitionGrammarList;
  recognition.interimResults = false;
  if (document.getElementsByTagName("html")[0].getAttribute("lang")) {
    recognition.lang = document
      .getElementsByTagName("html")[0]
      .getAttribute("lang");
  }

  recognition.addEventListener("result", (e) => {
    turnMicOff();
    let uniqueID_str = sessionStorage.getItem("active_twikid");
    let inputElement = document.querySelector(
      `input[twikid="${uniqueID_str}"]`
    );
    inputElement.value = e.results[e.results.length - 1][0].transcript;
    console.log("result");
  });

  recognition.addEventListener("speechend", (e) => {
    turnMicOff();
    console.log("speechend");
  });

  recognition.addEventListener("error", (e) => {
    turnMicOff();
    console.log("error");
  });

  // #####################################################################################
  // activating major functionality
  // #####################################################################################

  let searchInput_element = getSearchInput()[0];

  assignUniqueIDtoInput(searchInput_element);
  putMicIntoPlaceholder(searchInput_element.getAttribute("twikid"));
  injectInvisibleDivForSearchElement(
    searchInput_element.getAttribute("twikid")
  );
  positionDivOverMicCharacter(searchInput_element.getAttribute("twikid"));
  setClickListenerOnInvisibleDiv(searchInput_element.getAttribute("twikid"));
}
