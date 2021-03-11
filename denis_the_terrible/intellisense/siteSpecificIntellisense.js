var maxSuggestions = 5;
var suggestionsHistoryCookieName = "searchHistory";
var cookieExpirationInDays = 1;

let suggestionListBackgroundColor = "white";

let apiKey = "AIzaSyA16SPRHCyW6_2NoKPtAV6cwtR8n8s-Kgw";
let cx = "6b2ceadb15bfde761";

var url = "https://suggestqueries.google.com/complete/search?client=firefox&q=";

document.head.insertAdjacentHTML(
  "beforeend",
  `
  <style>
    .suggestions-list-intellisense {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: none; 
      flex-direction: column !important;
      flex-wrap: nowrap !important;
      background-color: ${suggestionListBackgroundColor};
    }
    .intellisenseSuggestionsRow {
      width: 100%;
      cursor: pointer;
      padding: 2px;
      border: 1px solid black;
    }
    .intellisenseHistorySuggestion {
      font-weight: bold;
    }
    .intellisenseGoogleSuggestion {
      font-weight: normal;
    }
  </style>
`
);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCookies() {
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookies = decodedCookie.split(";");
  let cookiesObject = {};
  for (let cookie of cookies) {
    var [name, value] = cookie.split("=");
    name = name.replace(/\s/g, "");
    cookiesObject[name] = value;
  }
  return cookiesObject;
}

function appendRowToSuggestionsUl(value, classes = [], ul) {
  let newRow = document.createElement("li");
  newRow.classList.add("intellisenseSuggestionsRow");
  newRow.innerHTML = value;
  for (let cls of classes) {
    newRow.classList.add(cls);
  }
  ul.appendChild(newRow);
}

function clearSuggestionsUl(ul) {
  ul.innerHTML = "";
}

function hideSuggestionsUl(ul) {
  if (document.querySelector(`#${ul.id}_style`)) {
    document.querySelector(`#${ul.id}_style`).remove();
  }
}

function unhideSuggestionsUl(ul, elFixed) {
  if (!document.querySelector(`#${ul.id}_style`)) {
    // if position is fixed
    if (elFixed) {
      document.head.insertAdjacentHTML(
        "beforeend",
        `
      <style id="${ul.id}_style">
        #${ul.id} {
          position: fixed;
          display: flex;
        }
      </style>
      `
      );
    }
    // if position is not fixed
    else {
      document.head.insertAdjacentHTML(
        "beforeend",
        `
      <style id="${ul.id}_style">
        #${ul.id} {
          position: absolute;
          display: flex;
        }
      </style>
      `
      );
    }
  }
}

function resizeSuggestionsUl(ul, inputElement, inputElementIsFixed) {
  let elRect = inputElement.getBoundingClientRect();

  if (inputElementIsFixed) {
    if (ul.style.top !== elRect.bottom + "px") {
      ul.style.top = elRect.bottom + "px";
    }

    if (ul.style.left !== elRect.left + "px") {
      ul.style.left = elRect.left + "px";
    }

    if (ul.style.width !== window.getComputedStyle(inputElement).width) {
      ul.style.width = window.getComputedStyle(inputElement).width;
    }
  } else {
    if (ul.style.top !== window.scrollY + elRect.bottom + "px") {
      ul.style.top = window.scrollY + elRect.bottom + "px";
    }

    if (ul.style.left !== window.scrollX + elRect.left + "px") {
      ul.style.left = window.scrollX + elRect.left + "px";
    }

    if (ul.style.width !== window.getComputedStyle(inputElement).width) {
      ul.style.width = window.getComputedStyle(inputElement).width;
    }
  }
}

function setSuggestionRowsEventListeners(ul) {
  let suggestionRows = document.querySelectorAll(
    `#${ul.id} .intellisenseSuggestionsRow`
  );

  let inputElement = document.querySelector(`.${ul.id}`);

  for (let row of suggestionRows) {
    row.addEventListener("click", (e) => {
      e.preventDefault();

      let cookies = getCookies();

      let selectionValue = e.target.textContent;

      // insert selection into search field and clear suggestions
      inputElement.value = selectionValue;
      clearSuggestionsUl(ul);
      hideSuggestionsUl(ul);

      // add selection to cookie
      if (
        Object.keys(cookies)[0] === "" ||
        !cookies[suggestionsHistoryCookieName]
      ) {
        newSuggestionsHistory_string = JSON.stringify([inputElement.value]);
      } else {
        let suggestionsHistory_string = cookies[suggestionsHistoryCookieName];
        let suggestionsHistory_array = JSON.parse(suggestionsHistory_string);
        if (!suggestionsHistory_array.includes(inputElement.value)) {
          suggestionsHistory_array.push(selectionValue);
        }
        var newSuggestionsHistory_string = JSON.stringify(
          suggestionsHistory_array
        );
      }

      setCookie(
        suggestionsHistoryCookieName,
        newSuggestionsHistory_string,
        cookieExpirationInDays
      );
    });
    row.parentNode.addEventListener("click", (e) => {
      try {
        e.stopEventPropagation();
      } catch {}
    });
    window.addEventListener("click", () => {
      hideSuggestionsUl(ul);
    });
  }
}

// Function for getting JSONP.
function jsonp(uri) {
  return new Promise((resolve, reject) => {
    var id = "_" + Math.round(10000 * Math.random());
    var callbackName = "jsonp_callback_" + id;
    window[callbackName] = function (data) {
      delete window[callbackName];
      var ele = document.getElementById(id);
      ele.parentNode.removeChild(ele);
      resolve(data);
    };

    var src = uri + "&callback=" + callbackName;
    var script = document.createElement("script");
    script.src = src;
    script.id = id;
    script.addEventListener("error", reject);
    (
      document.getElementsByTagName("head")[0] ||
      document.body ||
      document.documentElement
    ).appendChild(script);
  });
}

function getHistorySuggestions(ul) {
  try {
    let cookies = getCookies();

    // Create list of suggestions based on google results and search history.
    let suggestionsHistory_string = cookies[suggestionsHistoryCookieName];
    let suggestions = JSON.parse(suggestionsHistory_string);

    return suggestions;
  } catch {
    return [];
  }
}

// Sets cookie and cookie's expiration date.
function setCookie(name, value, expireIn) {
  var d = new Date();
  d.setTime(d.getTime() + expireIn * 24 * 60 * 60 * 1000);
  document.cookie =
    name +
    "=" +
    value +
    ";expires=" +
    d.toUTCString() +
    ";path=/;domain=" +
    window.location.hostname;
}

function displaySuggestionsOnInputElement(inputElem) {
  let suggestionsUl;
  for (let cls of inputElem.classList) {
    suggestionsUl = document.querySelector(`#${cls}`);
    if (suggestionsUl && suggestionsUl.tagName.toLowerCase() === "ul") {
      break;
    }
  }

  if (inputElem.value.length > 0) {
    fetch(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${inputElem.value}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // SUCCESS
        let googleSuggestionsRaw = [];
        data.items.forEach((i) => {
          googleSuggestionsRaw.push(i.title);
        });
        let googleSuggestions = [];
        googleSuggestionsRaw.forEach((i) => {
          googleSuggestions.push(i.split(" – ")[0]);
        });

        if (googleSuggestions.length === 0) {
          clearSuggestionsUl(suggestionsUl);
          hideSuggestionsUl(suggestionsUl);
        }

        clearSuggestionsUl(suggestionsUl);
        unhideSuggestionsUl(
          suggestionsUl,
          suggestionsUl.classList.contains("ulFixed")
        );

        // leaving only unique suggestions
        googleSuggestions = [...new Set(googleSuggestions)];

        // add history and google suggestions
        let historySuggestions = [];
        try {
          historySuggestions = getHistorySuggestions(suggestionsUl);
        } catch {}

        let historySuggestionsArray = [];
        let googleSuggestionsArray = [];
        for (let i = 0; i < maxSuggestions; i++) {
          if (historySuggestions.includes(googleSuggestions[i])) {
            historySuggestionsArray.push(googleSuggestions[i]);
          } else {
            googleSuggestionsArray.push(googleSuggestions[i]);
          }
        }

        for (let hist of historySuggestionsArray) {
          if (typeof hist !== "undefined") {
            appendRowToSuggestionsUl(
              hist,
              ["intellisenseHistorySuggestion"],
              suggestionsUl
            );
          }
        }
        for (let goog of googleSuggestionsArray) {
          if (typeof goog !== "undefined") {
            appendRowToSuggestionsUl(
              goog,
              ["intellisenseGoogleSuggestion"],
              suggestionsUl
            );
          }
        }

        resizeSuggestionsUl(
          suggestionsUl,
          inputElem,
          suggestionsUl.classList.contains("ulFixed")
        );
        setSuggestionRowsEventListeners(suggestionsUl);
      })
      .catch(() => {
        // ERROR
        clearSuggestionsUl(suggestionsUl);
        hideSuggestionsUl(suggestionsUl);
      });
  } else {
    clearSuggestionsUl(suggestionsUl);
    hideSuggestionsUl(suggestionsUl);
  }
}

function applySiteIntellisenseToInputElement(inputElem) {
  // check if input element is fixed or not
  var inputElementIsFixed = false;
  var inputElementParent = inputElem;
  while (inputElementParent) {
    if (inputElementParent.parentNode !== document) {
      inputElementParent = inputElementParent.parentNode;
      let position = window.getComputedStyle(inputElementParent)["position"];
      if (position === "fixed") {
        inputElementIsFixed = true;
        break;
      }
    } else {
      break;
    }
  }

  // make ul fixed if input is fixed, absolute if input is not fixed
  if (inputElementIsFixed === true) {
    var suggestionList_zIndex =
      window.getComputedStyle(inputElementParent)["zIndex"] + 1;
  } else {
    var suggestionList_zIndex;
    let inputElementParent = inputElem;
    while (inputElementParent) {
      if (inputElementParent.parentNode !== document) {
        inputElementParent = inputElementParent.parentNode;
        let zIndex = window.getComputedStyle(inputElementParent)["zIndex"];
        if (zIndex !== "auto") {
          suggestionList_zIndex = zIndex + 1;
          break;
        }
      } else {
        break;
      }
    }
  }

  // assign an identifier to both inputElement and ul
  let randomTenDigitSequence = (() => {
    let randomTenDigitNumber_array = [];
    for (let i = 0; i < 10; i++) {
      randomTenDigitNumber_array.push(getRandomInt(0, 9));
    }
    let randomTenDiginNumber_string = randomTenDigitNumber_array.join("");
    return "_" + randomTenDiginNumber_string;
  })();

  let boxId = `intellisenseBox${randomTenDigitSequence}`;
  inputElem.classList.add(`intellisenseBox${randomTenDigitSequence}`);

  document.body.insertAdjacentHTML(
    "beforeend",
    `
        <ul class="suggestions-list-intellisense" id="${boxId}">
        </ul>
    `
  );

  let suggestionsUl = document.querySelector(`#${boxId}`);

  if (inputElementIsFixed) {
    suggestionsUl.classList.add("ulFixed");
  } else {
    suggestionsUl.classList.add("ulNotFixed");
  }

  // apply z-index+1 on the ul
  document.head.insertAdjacentHTML(
    "beforeend",
    `
    <style>
      #${boxId} {
        z-index: ${suggestionList_zIndex};
      }
    </style>
    `
  );

  // carry over some style of the input field
  document.head.insertAdjacentHTML(
    "beforeend",
    `
        <style>
        #${boxId} .intellisenseSuggestionsRow {
            font-size: ${window.getComputedStyle(inputElem)["fontSize"]};
            font-family: ${window.getComputedStyle(inputElem)["fontFamily"]};
            color: ${window.getComputedStyle(inputElem)["color"]};
            line-height: ${window.getComputedStyle(inputElem)["lineHeight"]};
          }
        </style>
        `
  );

  //setup before functions
  var typingTimer; //timer identifier
  var doneTypingInterval = 1000;

  //on keyup, start the countdown
  inputElem.addEventListener("keyup", function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      displaySuggestionsOnInputElement(inputElem);
    }, doneTypingInterval);
  });

  //on keydown, clear the countdown
  inputElem.addEventListener("keydown", function () {
    clearTimeout(typingTimer);
  });
}

window.addEventListener("resize", () => {
  let suggestionsUls = document.querySelectorAll(
    ".suggestions-list-intellisense"
  );
  for (let ul of suggestionsUls) {
    var inpElem = document.querySelector(`.${ul.id}`);

    let fixed = false;
    if (ul.classList.contains("ulFixed")) {
      fixed = true;
    }

    if (window.getComputedStyle(ul)["display"] !== "none") {
      resizeSuggestionsUl(ul, inpElem, fixed);
    }
  }
});

let inputsForIntellisense = [];
document.querySelectorAll("input").forEach((i) => {
  if (["text", "search"].includes(i.type)) {
    inputsForIntellisense.push(i);
  }
});

inputsForIntellisense.forEach((el) => {
  applySiteIntellisenseToInputElement(el);
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    let suggestionsUl;
    for (let cls of el.classList) {
      suggestionsUl = document.querySelector(`#${cls}`);
      if (suggestionsUl && suggestionsUl.tagName.toLowerCase() === "ul") {
        break;
      }
    }
    unhideSuggestionsUl(
      suggestionsUl,
      suggestionsUl.classList.contains("ulFixed")
    );
  });
});
