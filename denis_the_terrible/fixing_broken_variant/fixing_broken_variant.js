// Promise

// Cookies

// Intellisense



var maxSuggestions = 5;

var url = "https://suggestqueries.google.com/complete/search?client=firefox&q=";

var searchBox = ".input-container > .input-confirm";
var searchInput = ".input-container > .input-confirm > .input > input";

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

// Gets cookie's value.
// Denis's comments: undefined: searchHistory, intellisnseUl
// decodeURIComponent replaces each UTF-8 escape sequence with the characters it represents
function getCookie(name) {
var cookieName = name + "=";
var decodedCookie = decodeURIComponent(document.cookie);
var cookies = decodedCookie.split(';');
var inputElement = document.querySelector(searchInput);
if (!document.querySelector("#suggestions-list-intellisense")) {
  var intellisnseUl = document.createElement("ul");
  intellisnseUl.id = "suggestions-list-intellisense";
  intellisnseUl.style.display="none";
  intellisnseUl.style.position = "fixed";
  document.body.appendChild(intellisnseUl);

}
for (var i = 0; i < maxSuggestions; i++) {
  let suggestion = cookies[i];
if (intellisnseUl.style.top !== window.scrollY + inputElement.getBoundingClientRect().bottom + "px") {
intellisnseUl.style.top = window.scrollY + inputElement.getBoundingClientRect().bottom + "px";
}

if (intellisnseUl.style.left !== window.scrollX + inputElement.getBoundingClientRect().left + "px") {
intellisnseUl.style.left = window.scrollX + inputElement.getBoundingClientRect().left + "px";
}

if (intellisnseUl.style.width !== window.getComputedStyle(inputElement).width) {
intellisnseUl.style.width = window.getComputedStyle(inputElement).width;
}

// Get google autocomplete results.
jsonp(url + e.target.value)
.then(res => res[1])
.then(res => {
// Display list.
intellisnseUl.style.display = "block";
// Remove all previous children from list.
while (intellisnseUl.firstChild) {
intellisnseUl.removeChild(intellisnseUl.firstChild);
}

// Create list of suggestions based on google results and search history.
var suggestions = searchHistory.filter(value => value.includes(e.target.value));
suggestions = suggestions.concat(res.filter(value => !suggestions.includes(value)));

// Add all suggestions to list.
for (var i = 0; i {
inputElement.value = e.target.innerHTML;
intellisnseUl.style.display = "none";
currentFocus = -1;
})

// Add suggestions to list
intellisnseUl.appendChild(listItem);
}
})
// If error, don't display list.
.catch(() => { intellisnseUl.style.display = "none" })
