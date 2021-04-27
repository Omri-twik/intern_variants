function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let currencySign;
let desktopMainSection;
let desktopGreyHeader;
let desktopBlackText;
let totalInvested;
let totalInvestors;
let averageInvestment;

let mainSectionInterval = setInterval(() => {
  if (
    document.querySelector(".totalInvestorsDiv") &&
    document
      .querySelector(".totalInvestorsDiv")
      .querySelector(".greySpanHomepage") &&
    document
      .querySelector(".totalInvestorsDiv")
      .querySelector(".blackSpanHomepage")
  ) {
    desktopMainSection = document.querySelector(".totalInvestorsDiv");
    desktopGreyHeader = desktopMainSection.querySelector(".greySpanHomepage");
    desktopBlackText = desktopMainSection.querySelector(".blackSpanHomepage");

    totalInvested = parseInt(
      document
        .querySelector(".totalInvestedDiv")
        .innerText.match(/([0-9,]+(\.[0-9]{2})?)/)[0]
        .replaceAll(",", "")
    );
    totalInvestors = parseInt(desktopBlackText.innerText.match(/\d+/)[0]);
    currencySign = document.querySelector(".totalInvestedDiv span").innerText;

    averageInvestment = parseInt(totalInvested / totalInvestors);
    averageInvestment = numberWithCommas(averageInvestment);

    let desktopGreyHeader_clone = desktopGreyHeader.cloneNode(true);
    desktopGreyHeader_clone.innerText = "ממוצע השקעה";
    let desktopBlackText_clone = desktopBlackText.cloneNode(true);
    desktopBlackText_clone.innerText = `${currencySign}${averageInvestment}`;
    desktopMainSection.appendChild(desktopGreyHeader_clone);
    desktopMainSection.appendChild(desktopBlackText_clone);
    desktopGreyHeader_clone.style.marginTop = "24px";

    clearInterval(mainSectionInterval);
  }
}, 50);

let mobileMainSectionInterval = setInterval(() => {
  if (document.querySelector(".totalInvestorsTimeDiv")) {
    let mobileMainSection = document.querySelector(".totalInvestorsTimeDiv");
    for (let child of mobileMainSection.children) {
      child.classList.remove("col-sm-6");
      child.classList.add("col-sm-4");
    }

    let mobileCol_clone = mobileMainSection.children[0].cloneNode(true);
    mobileCol_clone.innerHTML = "";
    let mobileHeader_clone = mobileMainSection.children[0].children[0].cloneNode(
      true
    );
    mobileHeader_clone.innerText = "ממוצע השקעה";
    let mobileText_clone = mobileMainSection.children[0].children[1].cloneNode(
      true
    );
    mobileText_clone.innerText = `${currencySign}${averageInvestment}`;
    mobileMainSection.appendChild(mobileHeader_clone);
    mobileMainSection.appendChild(mobileText_clone);

    clearInterval(mobileMainSectionInterval);
  }
}, 50);

let popupTextInterval = setInterval(() => {
  if (
    document.querySelector(
      ".modal-dialog pipelbiz-calculator .calc-component .calc-stocks-text[aria-hidden=false]"
    )
  ) {
    let popup_text = document.querySelector(
      ".modal-dialog pipelbiz-calculator .calc-component .calc-stocks-text[aria-hidden=false]"
    );
    let popup_text_clone = popup_text.cloneNode(true);
    popup_text_clone.innerText = `ממוצע השקעה: ${currencySign}${averageInvestment}`;
    popup_text_clone.style.color = "rgb(100,100,100)";
    popup_text_clone.style.fontSize = "18px";
    popup_text_clone.style.marginTop = "8px";
    popup_text.insertAdjacentElement("afterend", popup_text_clone);
    clearInterval(popupTextInterval);
  }
}, 50);
