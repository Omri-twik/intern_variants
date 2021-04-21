// ############################################################################
// declaring variables
// ############################################################################

var doneTypingInterval = 100;
var maxSuggestions = 5;
let source_products = [];
let products = [];
let collections = [];
let collectionsFetched_bool = false;
let collectionsFetchPage = 1;
let current_list_index = -1;
let productsFetched_bool = false;
let ul;
let inputElement;
var typingTimer;

// ############################################################################
// defining functions
// ############################################################################

async function fetchAllCollections() {
  collectionsFetched_bool = false;
  collectionsFetchPage = 1;
  while (collectionsFetched_bool === false) {
    await fetch(
      `https://${window.location.hostname}/collections.json?limit=250;page=${collectionsFetchPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data["collections"].length === 0) {
          collectionsFetched_bool = true;
        }
        for (let i = 0; i < data["collections"].length; i++) {
          collections.push(data["collections"][i]);
        }
      });
    collectionsFetchPage++;
  }
}

function fetchProductsForCollection(collectionHandle) {
  fetch(
    `https://${window.location.hostname}/collections/${collectionHandle}/products.json`
  )
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data["products"].length; i++) {
        products.push(data["products"][i]);
        source_products.push(data["products"][i]["title"]);
      }
    });
}

async function fetchAllProducts() {
  await fetchAllCollections();
  collections.forEach((collection) => {
    fetchProductsForCollection(collection["handle"]);
  });
}

function appendRowToSuggestionsUl(value, classes = []) {
  let newRow = document.createElement("li");
  newRow.classList.add("intellisenseSuggestionsRow");
  newRow.innerHTML = value;
  for (let cls of classes) {
    newRow.classList.add(cls);
  }
  ul.appendChild(newRow);
}

function clearSuggestionsUl() {
  ul.innerHTML = "";
}

function hideSuggestionsUl() {
  if (document.querySelector(`#intellisense_style`)) {
    document.querySelector(`#intellisense_style`).remove();
  }
}

function unhideSuggestionsUl(elFixed = false) {
  if (!document.querySelector(`#intellisense_style`)) {
    // if position is fixed
    if (elFixed) {
      document.head.insertAdjacentHTML(
        "beforeend",
        `
      <style id="intellisense_style">
        .suggestions-list-intellisense {
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
      <style id="intellisense_style">
        .suggestions-list-intellisense {
          position: absolute;
          display: flex;
        }
      </style>
      `
      );
    }
  }
}

function addListNavigationFunctionality(inputElement) {
  // search for form tag of the input element
  let inputElement_parent = inputElement;
  let form;
  while (inputElement_parent) {
    inputElement_parent = inputElement_parent.parentElement;
    if (inputElement_parent.tagName.toLowerCase() === "form") {
      form = inputElement_parent;
      break;
    }
  }

  inputElement.addEventListener("keydown", (e) => {
    if (e.keyCode !== 13) {
      unhideSuggestionsUl(ul.classList.contains("ulFixed"));
    }
    switch (e.keyCode) {
      case 13:
        e.preventDefault();
        // enter key

        let tw_toggled = false;
        document
          .querySelectorAll(".intellisenseSuggestionsRow")
          .forEach((row) => {
            if (row.classList.contains("tw_toggled")) {
              tw_toggled = true;
            }
          });

        if (!tw_toggled) {
          if (form) {
            form.submit();
          }
          break;
        } else if (current_list_index == -1) {
          select_choice(0);
        } else {
          select_choice(current_list_index);
        }
        try {
          document
            .querySelectorAll(".intellisenseSuggestionsRow")
            [current_list_index].classList.remove("tw_toggled");
        } catch {}
        current_list_index = 0;
        break;

      case 38:
        // up arrow
        current_list_index -= 1;
        if (current_list_index < 0) {
          current_list_index =
            document.querySelectorAll(".intellisenseSuggestionsRow").length - 1;
        }
        toggle_options(current_list_index);
        break;

      case 40:
        // down arrow
        current_list_index += 1;
        if (
          current_list_index >=
          document.querySelectorAll(".intellisenseSuggestionsRow").length
        ) {
          // reset counter to 0 when value becomes larger than list size
          current_list_index = 0;
          // reset scroll to top of window
        }
        toggle_options(current_list_index);
        break;

      default:
        // normal text input
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          displaySuggestionsOnInputElement(inputElement);
          current_list_index = -1;
          toggle_options(current_list_index);
        }, doneTypingInterval);
    }
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function toggle_options(current_list_index) {
  ul.querySelectorAll("li").forEach((row) => {
    row.classList.remove("tw_toggled");
  });
  if (current_list_index !== -1) {
    ul.children[current_list_index].classList.add("tw_toggled");
  }
}

function select_choice(index) {
  document
    .querySelector(".suggestions-list-intellisense")
    .children[index].click();
}

function resizeSuggestionsUl(inputElementIsFixed) {
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
  let suggestionRows = document.querySelectorAll(`.intellisenseSuggestionsRow`);

  for (let row of suggestionRows) {
    row.addEventListener("click", (e) => {
      e.preventDefault();

      let selectionValue = e.target.textContent;

      // insert selection into search field and clear suggestions
      inputElement.value = selectionValue;
      clearSuggestionsUl();
      hideSuggestionsUl();
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

function displaySuggestionsOnInputElement(inputElem) {
  if (inputElem.value.length > 0) {
    let intellisenseSuggestions = source_products
      .filter((product) => {
        if (
          product.toLowerCase().indexOf(inputElem.value.toLowerCase()) != -1
        ) {
          return true;
        }
      })
      .slice(0, maxSuggestions);

    if (intellisenseSuggestions.length === 0) {
      clearSuggestionsUl();
      hideSuggestionsUl();
    }

    clearSuggestionsUl();
    unhideSuggestionsUl(ul.classList.contains("ulFixed"));

    // leaving only unique suggestions
    intellisenseSuggestionsArray = [...new Set(intellisenseSuggestions)];

    for (let suggestion of intellisenseSuggestionsArray) {
      if (typeof suggestion !== "undefined") {
        appendRowToSuggestionsUl(suggestion);
      }
    }

    resizeSuggestionsUl(ul.classList.contains("ulFixed"));
    setSuggestionRowsEventListeners(ul);
  } else {
    clearSuggestionsUl(ul);
    hideSuggestionsUl(ul);
  }
}

function applySiteIntellisenseToInputElement() {
  // check if input element is fixed or not
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

  if (inputElementIsFixed) {
    ul.classList.add("ulFixed");
  } else {
    ul.classList.add("ulNotFixed");
  }

  // carry over some style of the input field
  document.head.insertAdjacentHTML(
    "beforeend",
    `
        <style>
        .intellisenseSuggestionsRow {
            font-size: ${window.getComputedStyle(inputElement)["fontSize"]};
            font-family: 'Helvetica', 'Arial', sans-serif;
            color: black !important;
            line-height: ${window.getComputedStyle(inputElement)["lineHeight"]};
            background-color: white !important;
          }
        </style>
        `
  );

  //setup before functions

  window.addEventListener("resize", () => {
    let suggestionsUls = document.querySelectorAll(
      ".suggestions-list-intellisense"
    );
    for (let ul of suggestionsUls) {
      let fixed = false;
      if (ul.classList.contains("ulFixed")) {
        fixed = true;
      }

      if (window.getComputedStyle(ul)["display"] !== "none") {
        resizeSuggestionsUl(fixed);
      }
    }
  });

  inputElement.addEventListener("click", () => {
    unhideSuggestionsUl(ul.classList.contains("ulFixed"));
  });
  inputElement.parentElement.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

function locateSearchInput() {
  let inputFields = document.querySelectorAll("input");
  let secondary_candidate;
  inputFields.forEach((input) => {
    let inputStyle = window.getComputedStyle(input);
    let inputRect = input.getBoundingClientRect();
    let inputElemHTML = input.outerHTML.replace(input.innerHTML, "");
    if (inputElemHTML.toLowerCase().indexOf("search") != -1) {
      secondary_candidate = input;
      if (
        inputStyle["display"] !== "none" &&
        inputStyle["visibility"] !== "hidden" &&
        inputStyle["opacity"] != 0
      ) {
        secondary_candidate = input;
        if (inputRect.width * inputRect.height > 0) {
          inputElement = input;
          inputElement.autocomplete = "off";
          return;
        }
      }
    }
  });
  if (!inputElement) {
    inputElement = secondary_candidate;
  }
}

// ############################################################################
// activating functionality
// ############################################################################

fetchAllProducts();

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
      z-index: 999999999999999999;
    }
    .intellisenseSuggestionsRow {
      width: 100%;
      cursor: pointer;
      padding: 5px;
      border-bottom: 1px solid lightgrey;
      margin-bottom: 0px;
    }
    .intellisenseHistorySuggestion {
      font-weight: bold;
    }

    .tw_toggled {
      font-weight: 900 !important;
    }
  </style>
`
);

document.body.insertAdjacentHTML(
  "beforeend",
  `
      <ul class="suggestions-list-intellisense">
      </ul>
  `
);

ul = document.querySelector(".suggestions-list-intellisense");

locateSearchInput();

applySiteIntellisenseToInputElement(inputElement);

addListNavigationFunctionality(inputElement);
