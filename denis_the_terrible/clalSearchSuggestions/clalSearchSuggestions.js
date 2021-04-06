let suggestionListBackgroundColor = "rgba(255,255,255,0.95)";
let current_list_index = -1;
let originalSuggestionRows = [];
let extractedSuggestionRows = [];

let suggestions = [
  `איך מגישים תביעה`,
  `עדכון פרטים אישיים`,
  `פדיון ומשיכת כספים`,
  `הפקת אישור מס`,
  `דוח שנתי ורבעוני`,
  `איך מושכים כספי פיצויים`,
];

function main_js() {
  // function definitions

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  function toNodes(html) {
    return new DOMParser().parseFromString(html, "text/html").body
      .childNodes[0];
  }

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

              .tw_toggled {
                font-weight: 900;
              }
            </style>
            `
      );
    }
  }

  function resizeSuggestionsUl(inputElement, searchDiv) {
    if (
      window.getComputedStyle(searchDiv)["display"] !== "none" &&
      inputElement === document.activeElement
    ) {
      unhideSuggestionsUl();

      let elRect = inputElement.parentNode.getBoundingClientRect();

      if (
        window.getComputedStyle(document.querySelector(".Header"))[
          "position"
        ] === "fixed"
      ) {
        ul.style.position = "fixed";
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
        ul.style.position = "absolute";
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
          ul.style.width = window.getComputedStyle(
            inputElement.parentNode
          ).width;
        }
      }
    } else {
      hideSuggestionsUl();
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

        if (/Mobi/i.test(window.navigator.userAgent)) {
          if (document.querySelector("#searchBtn")) {
            document.querySelector("#searchBtn").click();
          } else if (document.querySelector(".doSearchLabel")) {
            document.querySelector(".doSearchLabel").click();
          }
        }
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

  function toggle_options(current_list_index) {
    document.querySelectorAll(".suggestions-list-clal>li").forEach((row) => {
      row.classList.remove("tw_toggled");
    });
    if (current_list_index !== -1) {
      document
        .querySelector(".suggestions-list-clal")
        .children[current_list_index].classList.add("tw_toggled");
    }
  }

  function select_choice(index) {
    ul.children[index].click();
  }

  function addListNavigationFunctionality(inputElement) {
    inputElement.addEventListener("keydown", (e) => {
      if (e.keyCode !== 13) {
        unhideSuggestionsUl();
      }
      switch (e.keyCode) {
        case 13:
          e.preventDefault();
          // enter key

          let tw_toggled = false;
          document.querySelectorAll(".suggestionsRowClal").forEach((row) => {
            if (row.classList.contains("tw_toggled")) {
              tw_toggled = true;
            }
          });

          if (!tw_toggled) {
            if (document.querySelector("#searchBtn")) {
              document.querySelector("#searchBtn").click();
            } else if (document.querySelector(".doSearchLabel")) {
              document.querySelector(".doSearchLabel").click();
            } else {
              console.log("search btn not found");
            }
            break;
          } else if (current_list_index == -1) {
            select_choice(0);
          } else {
            select_choice(current_list_index);
          }
          document
            .querySelectorAll(".suggestionsRowClal")
            [current_list_index].classList.remove("tw_toggled");
          current_list_index = 0;
          break;

        case 38:
          // up arrow
          current_list_index -= 1;
          if (current_list_index < 0) {
            current_list_index = suggestions.length - 1;
          }
          toggle_options(current_list_index);
          break;

        case 40:
          // down arrow
          current_list_index += 1;
          if (current_list_index >= suggestions.length) {
            // reset counter to 0 when value becomes larger than list size
            current_list_index = 0;
            // reset scroll to top of window
          }
          toggle_options(current_list_index);
          break;

        default:
          // normal text input
          setTimeout(() => {
            filterSuggestionsUL(inputElement.value);
            current_list_index = -1;
            toggle_options(current_list_index);
          }, 100);
      }
    });
  }

  // fixing broken search icon functionality on mobile
  function openSearchMobile() {
    document.body.classList.add("bodyFixed");
    document.querySelector(".Header").classList.add("HeaderHeightOpenPopup");
    document
      .querySelector(".SearchBarSection.hide-desktop")
      .classList.remove("animatedElement");
    document
      .querySelector(".SearchBarSection.hide-desktop input#SearchBarInput")
      .classList.add("inputFocus");
    document
      .querySelector(
        `[ng-class="{'BgPopUp' : showSearchPopup || searchData.displayContactUsSection || searchData.selectedInsurance >=0}"]`
      )
      .classList.add("BgPopUp");
    document
      .querySelector(
        `[ng-class="{'BgPopUp' : showSearchPopup || searchData.displayContactUsSection || searchData.selectedInsurance >=0}"]`
      )
      .addEventListener("click", closeSearchMobile);
    document.querySelectorAll(".SearchBarSection").forEach((el) => {
      el.style.setProperty("min-height", "100px");
      el.querySelector(".SearchBarLeft").style.setProperty(
        "min-height",
        "100px"
      );
      el.querySelector(".SearchBarLeft")
        .querySelectorAll(".PopularLinksContianer")
        .forEach((el2) => {
          el2.style.setProperty("display", "none");
        });
    });
  }

  function closeSearchMobile() {
    document.body.classList.remove("bodyFixed");
    document.querySelector(".Header").classList.remove("HeaderHeightOpenPopup");
    document
      .querySelector(".SearchBarSection.hide-desktop")
      .classList.add("animatedElement");
    document
      .querySelector(
        `[ng-class="{'BgPopUp' : showSearchPopup || searchData.displayContactUsSection || searchData.selectedInsurance >=0}"]`
      )
      .classList.remove("BgPopUp");
    document.querySelector(
      `[ng-class="{'BgPopUp' : showSearchPopup || searchData.displayContactUsSection || searchData.selectedInsurance >=0}"]`
    ),
      removeEventListener("click", closeSearchMobile);
    document.querySelectorAll(".SearchBarSection").forEach((el) => {
      el.style.removeProperty("min-height");
      el.querySelector(".SearchBarLeft").style.removeProperty("min-height");
      el.querySelector(".SearchBarLeft")
        .querySelectorAll(".PopularLinksContianer")
        .forEach((el2) => {
          el2.style.removeProperty("display");
        });
    });
  }

  function addOrRemoveSearchButtonFunctionalityMobile() {
    if ($(window).width() < 769) {
      document
        .querySelector("#HaederSearchBar")
        .addEventListener("click", openSearchMobile);
    } else {
      document
        .querySelector("#HaederSearchBar")
        .removeEventListener("click", openSearchMobile);
    }
  }
  addOrRemoveSearchButtonFunctionalityMobile();
  window.addEventListener("resize", () => {
    closeSearchMobile();
    addOrRemoveSearchButtonFunctionalityMobile();
  });

  function filterSuggestionsUL(textValue) {
    removeAllChildNodes(ul);
    for (let row of originalSuggestionRows) {
      if (textValue.length === 0) {
        ul.insertAdjacentElement("beforeend", row);
      } else if (row.textContent.indexOf(textValue) !== -1) {
        ul.insertAdjacentElement("beforeend", row);
      }
    }
  }

  function applySuggestionsRowsClal(inputElement_selector, searchDiv_selector) {
    let inputElement = document.querySelector(inputElement_selector);
    let searchDiv = document.querySelector(searchDiv_selector);

    inputElement.autocomplete = "off";

    resizeSuggestionsUl(inputElement, searchDiv);
    setSuggestionRowsEventListeners(inputElement);
    addListNavigationFunctionality(inputElement);

    inputElement.addEventListener("input", (e) => {
      hideShowLabelOfSearchField(e.target);
    });
    inputElement.addEventListener("change", (e) => {
      hideShowLabelOfSearchField(e.target);
    });

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
              window
                .getComputedStyle(inputElement)
                ["paddingRight"].match(/\d+/)[0] > 5
                ? window.getComputedStyle(inputElement)["paddingRight"]
                : "5px"
            };
            padding-left: ${
              window
                .getComputedStyle(inputElement)
                ["paddingLeft"].match(/\d+/)[0] > 5
                ? window.getComputedStyle(inputElement)["paddingLeft"]
                : "5px"
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
        current_list_index = -1;
        toggle_options(current_list_index);
      }
    });
  }

  // function activations
  document.head.insertAdjacentHTML(
    "beforeend",
    `
          <style>
            #suggestions-list-clal {
              display: none;
            }
          </style>
      `
  );

  document.body.insertAdjacentHTML(
    "beforeend",
    `
          <ul class="suggestions-list-clal" id="suggestions-list-clal">
          </ul>
      `
  );

  document.head.insertAdjacentHTML(
    "beforeend",
    `
    <style>
      .SearchBarLeft {
        width: 100% !important;
      }
    </style>
  `
  );

  let ul = document.querySelector("#suggestions-list-clal");

  // fixing broken label on mobile search functionality
  for (let searchDiv of document.querySelectorAll(".SearchBarInputContianer")) {
    let input = searchDiv.querySelector("input");
    let label = searchDiv.querySelector("label");
    label.addEventListener("click", () => {
      input.focus();
    });
  }

  // function correctSearchIconVisibility() {
  //   if (
  //     window.getComputedStyle(
  //       document.querySelector(".SearchBarSection.hide-mobile-new-header")
  //     )["position"] === "static" &&
  //     !document.querySelector("#twik-hide-search-icon")
  //   ) {
  //     document.head.insertAdjacentHTML(
  //       "beforeend",
  //       `
  //       <style id="twik-hide-search-icon">
  //         #HaederSearchBar.hide-desktop {
  //           visibility: hidden !important;
  //         }
  //       </style>
  //       `
  //     );
  //   } else if (
  //     window.getComputedStyle(
  //       document.querySelector(".SearchBarSection.hide-mobile-new-header")
  //     )["position"] !== "static" &&
  //     document.querySelector("#twik-hide-search-icon")
  //   ) {
  //     try {
  //       document.querySelector("#twik-hide-search-icon").remove();
  //     } catch {}
  //   }
  // }
  // correctSearchIconVisibility();
  // window.addEventListener("resize", correctSearchIconVisibility);

  // inserting rows and storing them in an array
  suggestions.forEach((val) => {
    let elem = toNodes(`<li class="suggestionsRowClal">${val}</li>`);
    ul.insertAdjacentElement("beforeend", elem);
    originalSuggestionRows.push(elem);
  });

  // applying main suggestions functionality on two search fields
  applySuggestionsRowsClal(
    `.SearchBarSection.hide-mobile-new-header input#SearchBarInput`,
    `.SearchBarSection.hide-mobile-new-header`
  );
  applySuggestionsRowsClal(
    `.SearchBarSection.hide-desktop input#SearchBarInput`,
    `.SearchBarSection.hide-desktop`
  );
}

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
