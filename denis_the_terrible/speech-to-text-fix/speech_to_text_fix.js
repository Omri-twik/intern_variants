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
let buttonTextWidth;
let buttonHeight;
let timeUntilFunctionality = 2000;
let micShowedUp = false;

let startingLeftValueNumber = startingLeftValue.match(/\d+/)[0];
let startingBottomValueNumber = startingBottomValue.match(/\d+/)[0];

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
  setTimeout(() => {
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
      wavesurfer.microphone.start();
    }

    function turnOffMicVisualization() {
      wavesurfer.microphone.stop();
    }

    function getFixedElements() {
      let array = [];
      for (let el of document.querySelectorAll("*:not(footer)")) {
        if (window.getComputedStyle(el)["position"] === "fixed") {
          if (el === document.querySelector("#onesignal-bell-container")) {
          }
          if (
            el.getBoundingClientRect()["width"] === 0 ||
            el.getBoundingClientRect()["height"] === 0
          ) {
            for (let child of el.querySelectorAll("*")) {
              if (
                child.getBoundingClientRect()["width"] !== 0 &&
                child.getBoundingClientRect()["height"] !== 0
              ) {
                array.push(child);
              }
            }
          } else {
            array.push(el);
          }
        }
      }
      return array;
    }

    function collideWithFixedElements(checkElements, startingPos = false) {
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
              if (startingPos) {
                if (
                  !(
                    window.innerWidth -
                      startingLeftValueNumber -
                      rect1["width"] -
                      10 <
                      rect2.left ||
                    startingLeftValueNumber - 10 > rect2.right ||
                    startingBottomValueNumber + 10 < rect2.top ||
                    window.innerHeight -
                      startingBottomValueNumber -
                      rect1["height"] -
                      10 >
                      rect2.bottom
                  )
                ) {
                  return true;
                }
              } else {
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
      }
      return false;
    }

    function adjustPositioning() {
      if (collideWithFixedElements([siteSearchBtn, siteSearchBox])) {
        siteSearchBtn.style.visibility = "hidden";
        siteSearchBox.style.visibility = "hidden";

        let rectBtn = siteSearchBtn.getBoundingClientRect();
        let rectBox = siteSearchBox.getBoundingClientRect();

        let originalBottom;
        let newBottom;

        if (siteSearchBtn.style.display !== "none") {
          originalBottom =
            window.innerHeight -
            $(siteSearchBtn).position().top -
            rectBox["height"];
        } else if (siteSearchBox.style.display !== "none") {
          originalBottom =
            window.innerHeight -
            $(siteSearchBox).position().top -
            rectBox["height"];
        }

        siteSearchBtn.style.bottom = startingBottomValue;
        siteSearchBox.style.bottom = startingBottomValue;

        for (let i = 0; i < repositioningAttempts; i++) {
          if (collideWithFixedElements([siteSearchBtn, siteSearchBox])) {
            siteSearchBtn.style.visibility = "hidden";
            siteSearchBox.style.visibility = "hidden";

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
          }
        }
        newBottom = siteSearchBtn.style.bottom;
        if (newBottom && newBottom !== originalBottom) {
          $(siteSearchBtn).css({ bottom: newBottom });
          $(siteSearchBox).css({ bottom: newBottom });
          siteSearchBtn.style.visibility = "visible";
          siteSearchBox.style.visibility = "visible";
          $(siteSearchBtn).css({ display: "none" });
          $(siteSearchBtn).fadeIn();
          micShowedUp = true;
          return false;
        }
        siteSearchBtn.style.visibility = "hidden";
        siteSearchBox.style.visibility = "hidden";
        $(siteSearchBtn).css({ display: "none" });
        return true;
      } else {
        siteSearchBtn.style.visibility = "visible";
        siteSearchBox.style.visibility = "visible";
        $(siteSearchBtn).css({ display: "none" });
        $(siteSearchBtn).fadeIn();
        micShowedUp = true;
        return false;
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
              <button class="dictate-btn" id="tw-mic"
                style="visibility: hidden; bottom: ${startingBottomValue};">
                <img class="mic-icon"
                  src="https://raw.githubusercontent.com/DrorBarnea-twik/intern_variants/master/denis_the_terrible/speech-to-text-fix/mic-icon.png"
                  alt="mic-icon">
                <div class="dictate-btn-text">
                  <div class="dictate-btn-text-inner-div">
                    <div>Site</div>
                    <div>Search</div>
                  </div>
                </div>
              </button>
            </div>
            <div class="twik-site-search-mainBox"
              style="visibility: hidden; bottom: ${startingBottomValue};">
                <img class="close-icon site-search-close"
                  src="https://raw.githubusercontent.com/DrorBarnea-twik/intern_variants/master/denis_the_terrible/speech-to-text-fix/close-btn.png"
                  alt="close-icon">
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
  
   .twik-site-search button {
    width: initial;
    height: initial;
    color: initial;
    letter-spacing: initial;
  }
  
  .twik-site-search * {
    font-size: 18px !important;
  }
  
  .twik-site-search button:focus {
    border: none;
    outline: none;
    background-color: transparent;
  }
  
  .twik-site-search button {
    margin-bottom: 0px !important;
    padding: 0px !important;
    font-weight: 400 !important;
    font-size: 18px !important;
    text-transform: capitalize !important;
    min-height:initial
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
    align-items: center;
  
  }
  
  .site-search-top-section button {
    border: none;
    background-color: transparent;
    margin-left: 15px;
    margin-right: 15px;
  }
  
  .site-search-close {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    width: 17px;
    height: 17px;
  }
  
  .mic-icon {
    width: 30px;
    height: 30px;
    margin-left: 5px;
    margin-right: 5px;
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
      overflow-x: hidden;
    }
  
    .dictate-btn-text-inner-div {
      display: flex;
      flex-direction: column;
    }
  
    .dictate-btn {
      background-color: white;
      left: ${startingLeftValue};
      margin: 0px;
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
    border-radius: 20px;
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
    left: ${startingLeftValue};
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
  
  
  
    .stop-listening-btn-div {
    display: flex;
    justify-content: center;
    height: 20%;
    }
  
    .load-animation {
    height: 60%;
    width: 180px;
    }
  
    @media screen and (max-width: 500px) {
      .twik-site-search-mainBox {
        left: 50% !important;
        transform: translateX(-50%);
      }
    }
  
  </style>
    `
    );

    siteSearchBtn = document.querySelector(".dictate-btn");
    siteSearchBox = document.querySelector(".twik-site-search-mainBox");
    fixedElements = getFixedElements();
    // listenForMoreFixedElements();
    buttonTextWidth = window.getComputedStyle(
      document.querySelector(".dictate-btn-text")
    )["width"];
    buttonHeight = window.getComputedStyle(siteSearchBtn)["height"];
    $(siteSearchBtn).css({ minHeight: buttonHeight });
    $(".dictate-btn-text-inner-div").css({ minWidth: buttonTextWidth });
    $(".dictate-btn-text").css({ width: "0px", padding: "0px" });

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

    document
      .querySelector(".site-search-close")
      .addEventListener("click", () => {
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

    document
      .querySelector(".twik-site-search")
      .addEventListener("click", (e) => {
        e.stopPropagation();
      });

    $(siteSearchBtn)
      .mouseenter(() => {
        $(siteSearchBtn).animate({ opacity: "1", borderRadius: "7px" }, "fast");
        $(".dictate-btn-text").animate(
          {
            width: buttonTextWidth,
          },
          "fast"
        );
      })
      .mouseleave(() => {
        $(siteSearchBtn).animate(
          { opacity: "0.5", borderRadius: "20px" },
          "fast"
        );
        $(".dictate-btn-text").animate({ width: "0px" }, "fast");
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
    if (document.getElementsByTagName("html")[0].getAttribute("lang")) {
      recognition.lang = document
        .getElementsByTagName("html")[0]
        .getAttribute("lang");
    }

    recognition.addEventListener("result", (e) => {
      error = false;
      message = e.results[e.results.length - 1][0].transcript;
      document.querySelector(".results-text").innerHTML = message;
      $(".loader-container").css({ display: "none" });
      $(".twik-results-container").css({ display: "block" });
    });

    recognition.addEventListener("speechend", (e) => {
      error = true;
      $(".loader-container").css({ display: "none" });
      $(".twik-results-container").css({ display: "block" });
      message = "<span style='color: grey;'>Did you say anything?</span>";
      document.querySelector(".results-text").innerHTML = message;
      turnOffMicVisualization();
      recognition.stop();
    });

    recognition.addEventListener("error", (e) => {
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
    $(siteSearchBox).css({ display: "none" });
    addVolumeMeterFunctionality();
    let appearInterval = setInterval(() => {
      // console.log("micAvailable", micAvailable);
      if (micAvailable) {
        adjustPositioning();
        if (micShowedUp) {
          // console.log("micShowedUp", micShowedUp);
          clearInterval(appearInterval);
          // console.log("cleared interval");
        }
      }
    }, 500);
  }, timeUntilFunctionality);
}
