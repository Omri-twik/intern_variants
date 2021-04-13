var wavesurfer;
var micAvailable = false;
let startingLeftValue = "30px";
let startingBottomValue = "25px";
let fontFamily = window.getComputedStyle(document.body)["fontFamily"];
let repositioningAttempts = 100;
let micIconFinishedLoading = false;
var message = "";
var recognition;
var SpeechRecognitionGrammarList;
var error = true;
let siteSearchBtn;
let siteSearchBox;
let fixedElements = [];
let observer;

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

function mainJS() {
  function addVolumeMeterFunctionality() {
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
            // console.log("micAvailable", micAvailable);
            adjustPositioning();
            clearInterval(interval);
          }
        }
      }
    }, 50);
  }

  function turnOnMicVisualization() {
    document.querySelector("#waveform").innerHTML = "";
    wavesurfer = WaveSurfer.create({
      container: "#waveform",
      waveColor: "black",
      interact: false,
      cursorWidth: 0,
      fillParent: true,
      minPxPerSec: 10,
      height: 57,
      plugins: [WaveSurfer.microphone.create()],
    });
    wavesurfer.microphone.on("deviceReady", function (stream) {});

    wavesurfer.microphone.on("deviceError", function (code) {});
    wavesurfer.microphone.start();
  }

  function turnOffMicVisualization() {
    wavesurfer.microphone.stop();
  }

  function getFixedElements() {
    let array = [];
    for (let el of document.querySelectorAll("*:not(footer)")) {
      if (window.getComputedStyle(el)["position"] === "fixed") {
        array.push(el);
      }
    }
    return array;
  }

  function listenForMoreFixedElements() {
    observer = new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        for (let node of mutation.addedNodes) {
          if (window.getComputedStyle(node)["position"] === "fixed") {
            if (!fixedElements.includes(node)) {
              console.log("new fixed element");
              fixedElements.push(node);
            }
          }
        }
      }
    });
    observer.observe(document.querySelector("body"), {
      childList: true,
      subtree: true,
    });
  }

  function collideWithFixedElements(checkElements) {
    for (let fixed of fixedElements) {
      for (let checkElem of checkElements) {
        let rect1 = checkElem.getBoundingClientRect();
        if (
          !checkElements.includes(fixed) &&
          checkElem.style.display !== "none"
        ) {
          let fixed_style = window.getComputedStyle(fixed);
          if (
            fixed_style["position"] === "fixed" &&
            fixed_style["visibility"] !== "hidden" &&
            fixed_style["display"] !== "none" &&
            fixed.getBoundingClientRect()["width"] > 0 &&
            fixed.getBoundingClientRect()["height"] > 0
          ) {
            let rect2 = fixed.getBoundingClientRect();
            if (
              !(
                rect1.right + 10 < rect2.left ||
                rect1.left - 10 > rect2.right ||
                rect1.bottom + 10 < rect2.top ||
                rect1.top + 10 > rect2.bottom
              )
            ) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  function positionSiteSearchBtnHorizontally() {
    if (collideWithFixedElements([siteSearchBtn, siteSearchBox])) {
      siteSearchBtn.style.left = startingLeftValue;
      siteSearchBox.style.left = startingLeftValue;
      siteSearchBtn.style.bottom = startingBottomValue;
      siteSearchBox.style.bottom = startingBottomValue;

      for (let i = 0; i < repositioningAttempts; i++) {
        if (collideWithFixedElements([siteSearchBtn, siteSearchBox])) {
          siteSearchBtn.style.left =
            $(siteSearchBtn).position().left + 10 + "px";
          siteSearchBox.style.left =
            $(siteSearchBox).position().left + 10 + "px";
        } else {
          siteSearchBtn.style.visibility = "visible";
          siteSearchBox.style.visibility = "visible";
          return false;
        }
      }
      // console.log("positionSiteSearchBtnHorizontally fail");
      siteSearchBtn.style.visibility = "hidden";
      siteSearchBox.style.visibility = "hidden";
      failedHorizontalPositioning = true;
      return true;
    } else {
      siteSearchBtn.style.visibility = "visible";
      siteSearchBox.style.visibility = "visible";
      return false;
    }
  }

  function positionSiteSearchBtnVertically() {
    if (collideWithFixedElements([siteSearchBtn, siteSearchBox])) {
      siteSearchBtn.style.left = startingLeftValue;
      siteSearchBox.style.left = startingLeftValue;
      siteSearchBtn.style.bottom = startingBottomValue;
      siteSearchBox.style.bottom = startingBottomValue;

      for (let i = 0; i < repositioningAttempts; i++) {
        if (collideWithFixedElements([siteSearchBtn, siteSearchBox])) {
          let rectBtn = siteSearchBtn.getBoundingClientRect();
          let rectBox = siteSearchBox.getBoundingClientRect();
          siteSearchBtn.style.bottom =
            window.innerHeight -
            $(siteSearchBtn).position().top -
            rectBtn["height"] +
            10 +
            "px";
          siteSearchBox.style.bottom =
            window.innerHeight -
            $(siteSearchBox).position().top -
            rectBox["height"] +
            10 +
            "px";
        } else {
          siteSearchBtn.style.visibility = "visible";
          siteSearchBox.style.visibility = "visible";
          return false;
        }
      }
      siteSearchBtn.style.visibility = "hidden";
      siteSearchBox.style.visibility = "hidden";
      failedVerticalPositioning = true;
      return true;
    } else {
      siteSearchBtn.style.visibility = "visible";
      siteSearchBox.style.visibility = "visible";
      return false;
    }
  }

  function adjustPositioning(force = false) {
    if (force) {
      siteSearchBtn.style.left = startingLeftValue;
      siteSearchBox.style.left = startingLeftValue;
      siteSearchBtn.style.bottom = startingBottomValue;
      siteSearchBox.style.bottom = startingBottomValue;
    }
    failVertical = positionSiteSearchBtnVertically();
    if (failVertical) {
      failHorizontal = positionSiteSearchBtnHorizontally();
    }
  }
  // #####################################################################################
  // start of code functionality
  // #####################################################################################

  document.head.insertAdjacentHTML(
    "beforeend",
    `
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  `
  );

  document.body.insertAdjacentHTML(
    "beforeend",
    `   
        <div class="twik-site-search">
            <div class="dictate-btn-wrapper">
                <button class="dictate-btn" id="tw-mic" style="visibility: hidden; left: ${startingLeftValue}; bottom: ${startingBottomValue};">
                  <img class="mic-icon" src="https://raw.githubusercontent.com/DrorBarnea-twik/intern_variants/master/denis_the_terrible/speech-to-text-fix/mic-icon.png" alt="">
                    <div class="dictate-btn-text">
                      <div>Site</div>
                      <div>Search</div>
                    </div>
                </button>
            </div>
            <div class="twik-site-search-mainBox" style="visibility: hidden; left: ${startingLeftValue}; bottom: ${startingBottomValue};">
                <div class="loader-container">
                    <div class="stop-listening-btn-div site-search-top-section">
                        <button class="stop-listening-btn">
                            Stop
                        </button>
                    </div>
                    <div class="site-search-bottom-section">
                      <div class="load-text">
                          Say something...
                      </div>
                      <div class="load-animation">
                      <!-- <div id="waveform"></div> -->
                      <div id="waveform"></div>
                      </div>
                    </div>
                </div>
                <div class="twik-results-container">
                    <div class="twik-results-buttons site-search-top-section">
                        <button class="site-search-submit">
                            Search
                        </button>
                        <button class="site-search-try-again">
                            Try Again
                        </button>
                        <button class="site-search-close">
                            Close
                        </button>
                    </div>
                    <div class="results-text-container site-search-bottom-section">
                        <div class="results-text">
                          <span style='color: grey;'>Did you say anything?</span>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        `
  );

  document.head.insertAdjacentHTML(
    "beforeend",
    `
<style>

.twik-site-search button:focus {
  border: none;
  outline: none;
  background-color: transparent;
}

.site-search-top-section {
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 20%;
  width: 100%;
  background-color: lightgrey;
}

.site-search-top-section button {
  border: none;
  background-color: transparent;
}

.mic-icon {
  width: 30px;
  height: 30px;
}

.site-search-bottom-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80%;
  width: 100%;
}
.twik-site-search {
  font-family: ${fontFamily};
  direction: ltr;
}
  .twik-site-search-mainBox {
  z-index: 9999999999999999999999999999;
  }

  #waveform {
    height: 100%;
    width: 100%;
  }

  .dictate-btn-text {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .dictate-btn {
    background-color: white;
  }

  button.dictate-btn {
  opacity: 0.4;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  flex-direction: row;
  z-index: 1000;
  border-color: white;
  border: 0px;
  position: fixed;
  border-radius: 7px;
  min-height: 50px;
  box-shadow: 0px 0px 2px #000000;
  }

  .dictate-btn>div {
    padding: 3px;
  }

  button.dictate-btn > i.fa.fa-microphone {
  font-size: 24px;
  color: black;
  }

  .twik-site-search-mainBox {
  display: block;
  visibility: hidden;
  z-index: 100;
  background-color: white;
  position: fixed;
  width: 240px;
  height: 120px;
  box-shadow: 0px 0px 2px #000000;
  border-radius: 7px;
  }

  .loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  }

  .twik-results-container {
  height: 100%;
  width: 100%;
  display: none;
  }

  .load-text {
  height: 25%;
  width: 100%;
  text-align: center;
  }

  .results-text-container {
  min-height: 75%;
  min-width: 100%;
  text-align: center;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  }

  .results-text {
    padding: 5px;
    height: auto;
    width: auto;
  }

  .twik-results-buttons {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 20%;
  width: 100%;
  }

  .stop-listening-btn-div {
  display: flex;
  justify-content: center;
  height: 20%;
  }

  .load-animation {
  height: 60%;
  width: 180px;
  }

</style>
	`
  );

  siteSearchBtn = document.querySelector(".dictate-btn");
  siteSearchBox = document.querySelector(".twik-site-search-mainBox");
  fixedElements = getFixedElements();
  listenForMoreFixedElements();

  // *********************************************************************
  // setting event listeners
  // *********************************************************************

  document.querySelector(".dictate-btn").addEventListener("click", () => {
    if (!micAvailable) {
      navigator.mediaDevices.getUserMedia({ audio: true });
    }
    $(".loader-container").css({ display: "flex" });
    $(".twik-results-container").css({ display: "none" });
    $(siteSearchBox).css({
      left: $(siteSearchBtn).css("left"),
      bottom: $(siteSearchBtn).css("bottom"),
    });
    $(siteSearchBox).css({ visibility: "visible" });
    $(siteSearchBox).fadeIn("fast");
    $(siteSearchBtn).css({ display: "none" });
    $(siteSearchBtn).css({ visibility: "hidden" });
    turnOnMicVisualization();
    recognition.start();
  });

  window.addEventListener("click", () => {
    if (
      document.querySelector(".twik-site-search-mainBox").style.visibility ===
      "visible"
    ) {
      $(siteSearchBox).fadeOut("fast");
      $(siteSearchBox).css({ visibility: "hidden" });
      $(siteSearchBtn).css({ visibility: "visible" });
      $(siteSearchBtn).fadeIn("fast");

      turnOffMicVisualization();
      try {
        recognition.stop();
      } catch {}
    }
  });

  document
    .querySelector(".site-search-submit")
    .addEventListener("click", () => {
      if (error === false) {
        turnOffMicVisualization();
        window.open("/search?q=" + message, "_self");
      } else {
        message =
          "<span style='color: grey;'>Cannot search for nothing.</span>";
        document.querySelector(".results-text").innerHTML = message;
      }
    });

  document
    .querySelector(".site-search-try-again")
    .addEventListener("click", () => {
      $(".loader-container").css({ display: "flex" });
      $(".twik-results-container").css({ display: "none" });
      turnOnMicVisualization();
      recognition.start();
    });

  document.querySelector(".site-search-close").addEventListener("click", () => {
    $(siteSearchBox).fadeOut("fast");
    $(siteSearchBox).css({ visibility: "hidden" });
    $(siteSearchBtn).css({ visibility: "visible" });
    $(siteSearchBtn).fadeIn("fast");
    turnOffMicVisualization();
    try {
      recognition.stop();
    } catch {}
  });

  document
    .querySelector(".stop-listening-btn")
    .addEventListener("click", () => {
      $(".loader-container").css({ display: "none" });
      $(".twik-results-container").css({ display: "block" });
      document.querySelector(".results-text").innerHTML =
        "<span style='color: grey;'>Stopped listening.</span>";
      turnOffMicVisualization();
      recognition.stop();
    });

  document.querySelector(".twik-site-search").addEventListener("click", (e) => {
    e.stopPropagation();
  });

  $(siteSearchBtn)
    .mouseenter(() => {
      $(siteSearchBtn).css({ opacity: "1" });
      $(".dictate-btn-text").css({ display: "flex" });
    })
    .mouseleave(() => {
      $(siteSearchBtn).css({ opacity: "0.5" });
      $(".dictate-btn-text").css({ display: "none" });
    });

  window.addEventListener("keyup", function (e) {
    let key = e.key || e.keyCode;
    if (key === "Enter") key = 13;
    if (
      key === 13 &&
      document.querySelector(".twik-site-search-mainBox").style.visibility ===
        "visible"
    ) {
      e.preventDefault();
      turnOffMicVisualization();
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

  recognition.addEventListener("result", (e) => {
    // console.log("result");
    error = false;
    message = e.results[e.results.length - 1][0].transcript;
    document.querySelector(".results-text").innerHTML = message;
    $(".loader-container").css({ display: "none" });
    $(".twik-results-container").css({ display: "block" });
  });

  recognition.addEventListener("speechend", (e) => {
    // console.log("stop");
    error = true;
    $(".loader-container").css({ display: "none" });
    $(".twik-results-container").css({ display: "block" });
    message = "<span style='color: grey;'>Did you say anything?</span>";
    document.querySelector(".results-text").innerHTML = message;
    turnOffMicVisualization();
    recognition.stop();
  });

  recognition.addEventListener("error", (e) => {
    // console.log("error");
    error = true;
    message = `<span style='color: grey;'>Error occurred in recognition: ${e.error}</span>`;
    if (e.error === "no-speech") {
      message = "<span style='color: grey;'>Did you say anything?</span>";
    }
    document.querySelector(".results-text").innerHTML = message;
    $(".loader-container").css({ display: "none" });
    $(".twik-results-container").css({ display: "block" });
    turnOffMicVisualization();
  });

  // *************************************************************
  // adding meter functionality and positioning elements and making them visible
  // *************************************************************

  adjustPositioning();
  $(siteSearchBox).css({ display: "none" });
  setInterval(() => {
    // the function loops through all elements and checks if the fixed elements collide with the search elements
    // a potential improvement to this would be using a mutationObserver on the body and listening for ned elements added and adding them to an array with fixed elements. This way we will have only one initial loop, avoiding a full for loop every second.
    adjustPositioning();
  }, 1000);
  setTimeout(() => {
    fixedElements = getFixedElements();
  }, 1000);
  setTimeout(() => {
    fixedElements = getFixedElements();
    adjustPositioning(true);
  }, 3000);
  setTimeout(() => {
    fixedElements = getFixedElements();
    adjustPositioning(true);
  }, 10000);
  addVolumeMeterFunctionality();
}
