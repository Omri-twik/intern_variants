var maxSuggestions = 5;
var suggestionsHistoryCookieName = "searchHistory";
var cookieExpirationInDays = 1;

let suggestionListBackgroundColor = "white";

var url = "https://suggestqueries.google.com/complete/search?client=firefox&q=";

var searchInputSelector = "#searchCard";
var inputElement = document.querySelector(searchInputSelector);

var inputElementIsFixed = false;
var inputElementParent = inputElement;
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

if (inputElementIsFixed === true) {
  var suggestionList_zIndex =
    window.getComputedStyle(inputElementParent)["zIndex"] + 1;
} else {
  var suggestionList_zIndex;
  var inputElementParent = inputElement;
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

document.head.insertAdjacentHTML(
  "beforeend",
  `
  <style>

    #suggestions-list-intellisense {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: none; 
      z-index: ${suggestionList_zIndex};
      flex-direction: column !important;
      flex-wrap: nowrap !important;
      background-color: ${suggestionListBackgroundColor};
    }

    .intellisenseSuggestionsRow {
      width: 100%;
      cursor: pointer;
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

document.body.insertAdjacentHTML(
  "beforeend",
  `
    <ul id="suggestions-list-intellisense">
    </ul>
`
);

var suggestionsUl = document.querySelector("#suggestions-list-intellisense");

function getCookies() {
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookies = decodedCookie.split(";");
  let cookiesObject = {};
  for (cookie of cookies) {
    var [name, value] = cookie.split("=");
    cookiesObject[name] = value;
  }
  return cookiesObject;
}

function appendRowToSuggestionsUl(value, classes = []) {
  let newRow = document.createElement("li");
  newRow.classList.add("intellisenseSuggestionsRow");
  newRow.innerHTML = value;
  for (let cls of classes) {
    newRow.classList.add(cls);
  }
  suggestionsUl.appendChild(newRow);
}

function clearSuggestionsUl() {
  suggestionsUl.innerHTML = "";
}

function unhideSuggestionsUl() {
  if (!document.querySelector("#intellisenseSuggestionsList_style")) {
    // if position is fixed
    if (inputElementIsFixed) {
      document.head.insertAdjacentHTML(
        "beforeend",
        `
      <style id="intellisenseSuggestionsList_style">
        #suggestions-list-intellisense {
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
      <style id="intellisenseSuggestionsList_style">
        #suggestions-list-intellisense {
          position: absolute;
          display: flex;
        }
      </style>
      `
      );
    }
  }
}

function hideSuggestionsUl() {
  if (document.querySelector("#intellisenseSuggestionsList_style")) {
    document.querySelector("#intellisenseSuggestionsList_style").remove();
  }
}

function resizeSuggestionsUl() {
  let elRect = inputElement.getBoundingClientRect();

  if (inputElementIsFixed) {
    if (suggestionsUl.style.top !== elRect.bottom + "px") {
      suggestionsUl.style.top = elRect.bottom + "px";
    }

    if (suggestionsUl.style.left !== elRect.left + "px") {
      suggestionsUl.style.left = elRect.left + "px";
    }

    if (
      suggestionsUl.style.width !== window.getComputedStyle(inputElement).width
    ) {
      suggestionsUl.style.width = window.getComputedStyle(inputElement).width;
    }
  } else {
    if (suggestionsUl.style.top !== window.scrollY + elRect.bottom + "px") {
      suggestionsUl.style.top = window.scrollY + elRect.bottom + "px";
    }

    if (suggestionsUl.style.left !== window.scrollX + elRect.left + "px") {
      suggestionsUl.style.left = window.scrollX + elRect.left + "px";
    }

    if (
      suggestionsUl.style.width !== window.getComputedStyle(inputElement).width
    ) {
      suggestionsUl.style.width = window.getComputedStyle(inputElement).width;
    }
  }
}

function setSuggestionRowsEventListeners() {
  let suggestionRows = document.querySelectorAll(".intellisenseSuggestionsRow");
  for (let row of suggestionRows) {
    row.addEventListener("click", (e) => {
      e.preventDefault();

      let cookies = getCookies();

      let selectionValue = e.target.textContent;

      // insert selection into search field and clear suggestions
      inputElement.value = selectionValue;
      clearSuggestionsUl();
      hideSuggestionsUl();

      // add selection to cookie
      if (Object.keys(cookies)[0] === "") {
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

function getHistorySuggestions() {
  let cookies = getCookies();

  try {
    // Create list of suggestions based on google results and search history.
    let suggestionsHistory_string = cookies[suggestionsHistoryCookieName];
    let suggestionsHistory_array = JSON.parse(suggestionsHistory_string);

    var suggestions = suggestionsHistory_array.filter((value) =>
      value.includes(inputElement.value)
    );
    return suggestions;
  } catch {}
}

// Sets cookie and cookie's expiration date.
// Denis's comments: apparently expireIn is in days
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

// Get google autocomplete results.
inputElement.addEventListener("keyup", (e) => {
  if (e.target.value.length > 0) {
    jsonp(url + e.target.value)
      .then((googleSuggestions) => googleSuggestions[1])
      .then((googleSuggestions) => {
        // SUCCESS

        if (googleSuggestions.length === 0) {
          clearSuggestionsUl();
          hideSuggestionsUl();
        }

        clearSuggestionsUl();
        unhideSuggestionsUl();

        // add history and google suggestions
        // addHistorySuggestionsToUl();
        let historySuggestions = getHistorySuggestions();

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
            appendRowToSuggestionsUl(hist, ["intellisenseHistorySuggestion"]);
          }
        }
        for (let goog of googleSuggestionsArray) {
          if (typeof goog !== "undefined") {
            appendRowToSuggestionsUl(goog, ["intellisenseGoogleSuggestion"]);
          }
        }

        resizeSuggestionsUl();
        setSuggestionRowsEventListeners();
      })
      .catch(() => {
        // ERROR
        clearSuggestionsUl();
        hideSuggestionsUl();
      });
  } else {
    clearSuggestionsUl();
    hideSuggestionsUl();
  }
});

window.addEventListener("resize", () => {
  resizeSuggestionsUl();
  console.log("resize");
});
