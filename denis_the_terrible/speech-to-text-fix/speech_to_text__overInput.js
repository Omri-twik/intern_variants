var wavesurfer;
var micAvailable = false;
var recognition;
var SpeechRecognitionGrammarList;
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

function mainJS() {
  addWavesurferScripts = () => {
    let script = document.createElement("SCRIPT");
    script.src = "https://unpkg.com/wavesurfer.js";
    document.head.appendChild(script);
    let intervalTimeWaited = 0;
    let interval = setInterval(() => {
      if (intervalTimeWaited === 10000) {
        clearInterval(interval);
      }
      intervalTimeWaited = intervalTimeWaited + 50;
      if (typeof WaveSurfer !== "undefined") {
        if (!document.querySelector("#micPluginScript")) {
          let micPluginScript = document.createElement("SCRIPT");
          micPluginScript.id = "micPluginScript";
          micPluginScript.src =
            "https://unpkg.com/wavesurfer.js@4.6.0/dist/plugin/wavesurfer.microphone.min.js";
          document.head.appendChild(micPluginScript);
        }
        if (typeof WaveSurfer.microphone !== "undefined") {
          if (typeof WaveSurfer.microphone.create !== "undefined") {
            micAvailable = true;
            clearInterval(interval);
          }
        }
      }
    }, 50);
  };

  turnMicOn = () => {
    // document.querySelector("#waveform").innerHTML = "";
    // wavesurfer = WaveSurfer.create({
    //   container: "#waveform",
    //   waveColor: "black",
    //   interact: false,
    //   cursorWidth: 0,
    //   fillParent: true,
    //   minPxPerSec: 10,
    //   height: 30,
    //   plugins: [WaveSurfer.microphone.create()],
    // });
    // wavesurfer.microphone.start();
    recognition.start();
  };

  turnMicOff = () => {
    // try {
    //   wavesurfer.microphone.stop();
    // } catch {}
    try {
      recognition.stop();
    } catch {}
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

  putMicIntoPlaceholder = (inputElement) => {
    inputElement.placeholder = `&#xf130;` + inputElement.placeholder;
    inputElement.style.fontFamily = "FontAwesome";
  };

  positionDivOverMicCharacter = (div, inputElement) => {
    // to do
    div.parentElement.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  };

  // #####################################################################################
  // start of code functionality
  // #####################################################################################

  document.body.insertAdjacentHTML(
    "beforeend",
    `   
      <div class="twik-site-search">
        <div class="dictate-btn-wrapper" style="display: block;">
          <button class="dictate-btn" id="tw-mic">
            <img class="mic-icon"
              src="https://raw.githubusercontent.com/DrorBarnea-twik/intern_variants/master/denis_the_terrible/speech-to-text-fix/mic-icon.png"
              alt="mic-icon">
          </button>
        </div>
        <div class="waveform-wrapper" style="display: none;">
          <div id="waveform"></div>
        </div>
      </div>
    `
  );

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

  </style>
    `
  );

  document.head.insertAdjacentHTML(
    "beforeend",
    `
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
  `
  );

  let input = getSearchInput()[0];

  // *********************************************************************
  // setting event listeners
  // *********************************************************************

  document.querySelector(".mic-icon").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("click");
    navigator.permissions
      .query({ name: "microphone" })
      .then(function (permissionStatus) {
        if (permissionStatus.state === "granted") {
          micAvailable = true;
        } else if (permissionStatus.state === "prompt") {
          navigator.mediaDevices.getUserMedia({ audio: true });
          micAvailable = true;
        }
      });
    if (micAvailable) {
      displayWaves();
      turnMicOn();
    }
  });

  document.querySelector(".twik-site-search").addEventListener("click", (e) => {
    e.stopPropagation();
  });

  window.addEventListener("keydown", function (e) {
    let key = e.key || e.keyCode;
    if (key === "Enter") key = 13;
    if (
      key === 13 &&
      document.querySelector(".twik-site-search-mainBox").style.visibility ===
        "visible"
    ) {
      e.preventDefault();
      turnMicOff();
      document.querySelector(".site-search-submit").click();
    }
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

  var grammar = "#JSGF V1.0;";
  SpeechRecognitionGrammarList.addFromString(grammar, 1);

  recognition.grammars = SpeechRecognitionGrammarList;
  recognition.interimResults = false;
  if (document.getElementsByTagName("html")[0].getAttribute("lang")) {
    recognition.lang = document
      .getElementsByTagName("html")[0]
      .getAttribute("lang");
  }

  recognition.addEventListener("result", (e) => {
    input.value = e.results[e.results.length - 1][0].transcript;
    displayMicIcon();
    turnMicOff();
  });

  recognition.addEventListener("speechend", (e) => {
    displayMicIcon();
    turnMicOff();
  });

  recognition.addEventListener("error", (e) => {
    displayMicIcon();
    turnMicOff();
  });

  // *************************************************************
  // adding meter functionality and positioning elements and making them visible
  // *************************************************************
  addWavesurferScripts();
  putMicIntoPlaceholder();
  positionMicOverInput();
}
