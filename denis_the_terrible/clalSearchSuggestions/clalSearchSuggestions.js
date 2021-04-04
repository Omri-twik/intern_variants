let suggestionListBackgroundColor = "rgba(255,255,255,0.95)";

if (window.jQuery) {
  $ = window.jQuery;
  main_js();
} else {
  var script = document.createElement("SCRIPT");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
  script.type = "text/javascript";
  // this is doc.ready
  //-------------------
  script.onload = function () {
    var $ = window.jQuery;
    main_js();
  };
  document.getElementsByTagName("head")[0].appendChild(script);
}

function main_js() {
  function appendRowToSuggestionsUl(value) {
    let newRow = document.createElement("li");
    newRow.classList.add("suggestionsRowClal");
    newRow.innerHTML = value;
    ul.appendChild(newRow);
  }

  document.body.insertAdjacentHTML(
    "beforeend",
    `
          <ul class="suggestions-list-clal" id="suggestions-list-clal">
          </ul>
      `
  );

  let ul = document.querySelector("#suggestions-list-clal");

  let suggestions = [
    `איך מגישים תביעה`,
    `עדכון פרטים אישיים`,
    `פדיון ומשיכת כספים`,
    `הפקת אישור מס`,
    `דוח שנתי ורבעוני`,
    `איך מושכים כספי פיצויים`,
  ];

  suggestions.forEach((val) => {
    appendRowToSuggestionsUl(val);
  });

  function hideSuggestionsUl() {
    if (document.querySelector(`#suggestions-list-clal-style`)) {
      document.querySelector(`#suggestions-list-clal-style`).remove();
    }
  }

  function unhideSuggestionsUl() {
    if (!document.querySelector(`#suggestions-list-clal-style`)) {
      document.head.insertAdjacentHTML(
        "beforeend",
        `
            <style id="suggestions-list-clal-style">
              #suggestions-list-clal {
                position: absolute;
                display: flex;
              }
            </style>
            `
      );
    }
  }

  function resizeSuggestionsUl(inputElement, searchDiv) {
    let elRect = inputElement.parentNode.getBoundingClientRect();
    if (window.getComputedStyle(searchDiv)["display"] !== "none") {
      if (ul.style.top !== window.scrollY + elRect.bottom + 1 + "px") {
        ul.style.top = window.scrollY + elRect.bottom + 1 + "px";
      }

      if (ul.style.left !== window.scrollX + elRect.left + "px") {
        ul.style.left = window.scrollX + elRect.left + "px";
      }

      if (
        ul.style.width !==
        window.getComputedStyle(inputElement.parentNode).width
      ) {
        ul.style.width = window.getComputedStyle(inputElement.parentNode).width;
      }

      if (document.querySelector("#stylesClal")) {
        document.querySelector("#stylesClal").remove();
        document.head.insertAdjacentHTML("beforeend", stylesClal);
      }
    }
  }

  function setSuggestionRowsEventListeners(inputElement) {
    let $inputElement = $(inputElement);
    let suggestionRows = document.querySelectorAll(`.suggestionsRowClal`);

    for (let row of suggestionRows) {
      row.addEventListener("click", (e) => {
        e.preventDefault();

        // insert selection into search field and clear suggestions
        inputElement.value = e.target.textContent;
        hideShowLabelOfSearchField(inputElement);
        hideSuggestionsUl();

        inputElement.focus();

        row.parentNode.addEventListener("click", (e) => {
          try {
            e.stopEventPropagation();
          } catch {}
        });
        $inputElement.trigger("input");
      });
    }
  }

  function hideShowLabelOfSearchField(inputElement) {
    if (inputElement.value.length > 0) {
      document.querySelector(".SearchBarInputContianer > label").style.display =
        "none";
    } else {
      document.querySelector(".SearchBarInputContianer > label").style.display =
        "block";
    }
  }

  document.querySelector(".SearchBarInput").addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      document.querySelector(".doSearchLabel").click();
    }
  });

  document.querySelector("#SearchBarInput").addEventListener("input", (e) => {
    hideShowLabelOfSearchField(e.target);
  });

  document.querySelector("#SearchBarInput").addEventListener("change", (e) => {
    hideShowLabelOfSearchField(e.target);
  });

  function applySuggestionsRowsClal(inputElement_selector, searchDiv_selector) {
    let inputElement = document.querySelector(inputElement_selector);
    let searchDiv = document.querySelector(searchDiv_selector);

    resizeSuggestionsUl(inputElement, searchDiv);
    setSuggestionRowsEventListeners(inputElement);
    inputElement.addEventListener("focus", () => {
      resizeSuggestionsUl(inputElement, searchDiv);
      unhideSuggestionsUl();
      try {
        document.head.querySelector("#styles-clal").remove();
      } catch {}
      document.head.insertAdjacentHTML(
        "beforeend",
        `
        <style id="styles-clal">
          .suggestions-list-clal {
            list-style-type: none;
            padding: 0;
            margin: 0;
            display: none; 
            flex-direction: column !important;
            flex-wrap: nowrap !important;
            background-color: ${suggestionListBackgroundColor};
          }
          .suggestionsRowClal {
            width: 100%;
            cursor: pointer;
            border-top: ${
              window.getComputedStyle(inputElement.parentNode)["borderTop"]
            };
            border-left: ${
              window.getComputedStyle(inputElement.parentNode)["borderLeft"]
            };
            border-right: ${
              window.getComputedStyle(inputElement.parentNode)["borderRight"]
            };
            border-bottom: 1px solid rgba(0, 30, 125, 0.2);
            font-size: 20px;
            font-family: ${
              window.getComputedStyle(searchDiv.querySelector("label"))[
                "fontFamily"
              ]
            };
            color: rgb(0, 30, 125);
            line-height: ${window.getComputedStyle(inputElement)["lineHeight"]};
            padding-top: 3px;
            padding-bottom: 3px;
            padding-right: ${
              window.getComputedStyle(inputElement)["paddingRight"]
            };
            padding-left: ${
              window.getComputedStyle(inputElement)["paddingLeft"]
            };
        </style>
        `
      );

      inputElement.classList.add("inputFocus");
    });

    window.addEventListener("resize", () => {
      if (window.getComputedStyle(ul)["display"] !== "none") {
        if (window.getComputedStyle(inputElement)["display"] !== "none") {
          resizeSuggestionsUl(inputElement, searchDiv);
        }
      }
    });

    // taking care of the z-index
    var suggestionList_zIndex;
    let inputElementParent = inputElement;
    while (inputElementParent) {
      if (inputElementParent.parentNode !== document) {
        inputElementParent = inputElementParent.parentNode;
        let zIndex = window.getComputedStyle(inputElementParent)["zIndex"];
        if (zIndex !== "auto") {
          suggestionList_zIndex = parseInt(zIndex) + 1000;
          break;
        }
      } else {
        break;
      }
    }
    document.head.insertAdjacentHTML(
      "beforeend",
      `
      <style>
        #suggestions-list-clal {
          z-index: ${suggestionList_zIndex};
        }
      </style>
      `
    );

    inputElement.parentNode.addEventListener("click", (e) => {
      if (e.stopPropagation) {
        e.stopPropagation();
      }
    });

    window.addEventListener("click", () => {
      if (window.getComputedStyle(ul)["display"] !== "none") {
        hideSuggestionsUl();
      }
    });
  }

  applySuggestionsRowsClal(
    `.SearchBarSection.hide-mobile-new-header > div > div > div > div.SearchBarTopSection > div > input#SearchBarInput`,
    `.SearchBarSection.hide-mobile-new-header`
  );
  applySuggestionsRowsClal(
    `.SearchBarSection.hide-desktop > div > div.SearchBarTopSection > div > input#SearchBarInput`,
    `.SearchBarSection.hide-desktop`
  );
}
