let interval = setInterval(() => {
  if (
    document.querySelector(".amount") &&
    document.querySelector(".startingFromSpan")
  ) {
    let amount = document.querySelector(".amount");
    let fromSpan = document.querySelector(".startingFromSpan");
    amount.value = fromSpan.textContent.match(/([0-9,]+(\.[0-9]{2})?)/)[0];
    amount.dispatchEvent(new Event("input"));
    clearInterval(interval);
  }
}, 50);
