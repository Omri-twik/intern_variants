// fixing broken label on mobile search functionality
for (let searchDiv of document.querySelectorAll(".SearchBarInputContianer")) {
  let input = searchDiv.querySelector("input");
  let label = searchDiv.querySelector("label");
  label.addEventListener("click", () => {
    input.focus();
  });
}

// fixing broken search icon functionality on mobile
function openSearchMobile() {
  try {
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
  } catch {}
}

function clearInputFields() {
  document.querySelectorAll("#SearchBarInput").forEach((inp) => {
    inp.value = "";
  });
}

function closeSearchMobile() {
  try {
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
    document
      .querySelector(
        `[ng-class="{'BgPopUp' : showSearchPopup || searchData.displayContactUsSection || searchData.selectedInsurance >=0}"]`
      )
      .removeEventListener("click", closeSearchMobile);
    document.querySelectorAll(".SearchBarSection").forEach((el) => {
      el.style.removeProperty("min-height");
      el.querySelector(".SearchBarLeft").style.removeProperty("min-height");
      el.querySelector(".SearchBarLeft")
        .querySelectorAll(".PopularLinksContianer")
        .forEach((el2) => {
          el2.style.removeProperty("display");
        });
    });
    clearInputFields();
  } catch {}
}

if (window.innerWidth < 769) {
  document
    .querySelector("#HaederSearchBar")
    .addEventListener("click", openSearchMobile);
}

window.addEventListener("resize", () => {
  if (window.innerWidth >= 769) {
    document
      .querySelector("#HaederSearchBar")
      .removeEventListener("click", openSearchMobile);
  } else {
    document
      .querySelector("#HaederSearchBar")
      .addEventListener("click", openSearchMobile);
  }
});
