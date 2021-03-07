// Promise

// Cookies

// Intellisense

var maxCookieSuggestions = 3;
var maxGoogleSuggestions = 5;
var suggestionsHistoryCookieName = "searchHistory";
var cookieExpirationInDays = 1;

var url = "https://suggestqueries.google.com/complete/search?client=firefox&q=";

var searchBoxSelector =
  "body > div.row.fixed-top > div > div > nav > div:nth-child(3)";
var searchInputSelector = "#searchCard";

document.head.insertAdjacentHTML(
  "beforeend",
  `
  <style>

    #suggestions-list-intellisense {
      display: none; 
      position: fixed;
      background-color: green;
    }

    .intellisenseSuggestionsRow {
      background-color: red;
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

var searchBox = document.querySelector(searchBoxSelector);
var inputElement = document.querySelector(searchInputSelector);
var suggestionsList = document.querySelector("#suggestions-list-intellisense");

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

function appendRowToSuggestionsList(value) {
  let suggestionsUl = document.querySelector("#suggestions-list-intellisense");
  let newRow = document.createElement("li");
  newRow.classList.add("intellisenseSuggestionsRow");
  newRow.innerHTML = value;
  suggestionsUl.appendChild(newRow);
}

function clearSuggestionsList() {
  let suggestionsUl = document.querySelector("#suggestions-list-intellisense");
  suggestionsUl.innerHTML = "";
}

function unhideSuggestionsList() {
  if (!document.querySelector("#intellisenseSuggestionsList_style")) {
    document.head.insertAdjacentHTML(
      "beforeend",
      `
    <style id="intellisenseSuggestionsList_style">
      #suggestions-list-intellisense {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
      }
    </style>
    `
    );
  }
}

function hideSuggestionsList() {
  if (document.querySelector("#intellisenseSuggestionsList_style")) {
    document.querySelector("#intellisenseSuggestionsList_style").remove();
  }
}

function resizeSuggestionsList() {
  if (
    suggestionsUl.style.top !==
    window.scrollY + inputElement.getBoundingClientRect().bottom + "px"
  ) {
    suggestionsUl.style.top =
      window.scrollY + inputElement.getBoundingClientRect().bottom + "px";
  }

  if (
    suggestionsUl.style.left !==
    window.scrollX + inputElement.getBoundingClientRect().left + "px"
  ) {
    suggestionsUl.style.left =
      window.scrollX + inputElement.getBoundingClientRect().left + "px";
  }

  if (
    suggestionsUl.style.width !== window.getComputedStyle(inputElement).width
  ) {
    suggestionsUl.style.width = window.getComputedStyle(inputElement).width;
  }
}

function setSuggestionRowsEventListeners() {
  let suggestionRows = document.querySelectorAll(".intellisenseSuggestionsRow");
  for (let row of suggestionRows) {
    row.addEventListener("click", (e) => {
      e.preventDefault();
      let selectionValue = e.target.textContent;

      // insert selection into search field and clear suggestions
      inputElement.value = selectionValue;
      clearSuggestionsList();
      hideSuggestionsList();

      // add selection to cookie
      let suggestionsHistory_string = cookies[suggestionsHistoryCookieName];
      let suggestionsHistory_array = JSON.parse(suggestionsHistory_string);
      suggestionsHistory_array.push(selectionValue);
      let newSuggestionsHistory_string = JSON.stringify(
        suggestionsHistory_array
      );
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

function getSuggestions() {
  var cookies = getCookies();

  // Create list of suggestions based on google results and search history.
  let suggestionsHistory_string = cookies[suggestionsHistoryCookieName];
  let suggestionsHistory_array = JSON.parse(suggestionsHistory_string);

  var suggestions = suggestionsHistory_array.filter((value) =>
    value.includes(e.target.value)
  );
  suggestions = suggestions.concat(
    res.filter((value) => !suggestions.includes(value))
  );

  return suggestions;
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

for (var i = 0; i < maxGoogleSuggestions; i++) {
  let suggestion = cookies[i];
  let suggestionLi = document.createElement("li");
  suggestionLi.innerHTML = suggestion;
  suggestionsUl.appendChild(suggestionLi);
}

// Get google autocomplete results.
searchInputSelector.addEventListener("keydown", (e) => {
  jsonp(url + e.target.value)
    .then((res) => res[1])
    .then((res) => {
      // SUCCESS

      // Clear and unhide list.
      clearSuggestionsList();
      unhideSuggestionsList();

      let suggestions = getSuggestions();

      for (let suggestion of suggestions) {
        appendRowToSuggestionsList(suggestion);
      }

      resizeSuggestionsList();
      setSuggestionRowsEventListeners();
    })
    .catch(() => {
      // ERROR
      clearSuggestionsList();
      hideSuggestionsList();
    });
});
