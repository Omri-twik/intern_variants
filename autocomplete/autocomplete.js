for (let item of document.getElementsByTagName("input")) {
  let strictNameRegex = /^name$/;
  let itemName = item.name.toLowerCase();
  switch (item.type) {
    case "text":
      if (itemName.indexOf("address") != -1) {
        item.autocomplete = "street-address";
      } else if (itemName.indexOf("user") != -1) {
        item.autocomplete = "username";
      } else if (itemName.indexOf("nick") != -1) {
        item.autocomplete = "nickname";
      } else if (
        itemName.match(strictNameRegex) ||
        (itemName.indexOf("first") != -1 && itemName.indexOf("name") != -1)
      ) {
        item.autocomplete = "given-name";
      } else if (
        itemName.indexOf("middle") != -1 &&
        itemName.indexOf("name") != -1
      ) {
        item.autocomplete = "additional-name";
      } else if (
        itemName.indexOf("surname") != -1 ||
        (itemName.indexOf("last") != -1 && itemName.indexOf("name") != -1) ||
        (itemName.indexOf("family") != -1 && itemName.indexOf("name") != -1)
      ) {
        item.autocomplete = "family-name";
      } else if (
        (itemName.indexOf("single") != -1 &&
          itemName.indexOf("use") != -1 &&
          itemName.indexOf("code") != -1) ||
        (itemName.indexOf("one") != -1 &&
          itemName.indexOf("time") != -1 &&
          itemName.indexOf("code") != -1)
      ) {
        item.autocomplete = "one-time-code";
      } else if (
        itemName.indexOf("organization") != -1 ||
        itemName.indexOf("company") != -1
      ) {
        item.autocomplete = "organization";
      } else if (
        itemName.indexOf("job") != -1 ||
        itemName.indexOf("position") != -1
      ) {
        item.autocomplete = "organization-title";
      } else if (
        itemName.indexOf("zip") != -1 ||
        itemName.indexOf("post") != -1
      ) {
        item.autocomplete = "postal-code";
      } else if (itemName.indexOf("city") != -1) {
        item.autocomplete = "address-level2";
      } else if (itemName.indexOf("state") != -1) {
        item.autocomplete = "address-level1";
      } else if (itemName.indexOf("country") != -1) {
        item.autocomplete = "country";
      } else if (
        itemName.indexOf("country") != -1 &&
        itemName.indexOf("name") != -1
      ) {
        item.autocomplete = "country-name";
      } else if (
        itemName.indexOf("address") != -1 &&
        itemName.indexOf("1") != -1
      ) {
        item.autocomplete = "address-line1";
      } else if (
        itemName.indexOf("address") != -1 &&
        itemName.indexOf("2") != -1
      ) {
        item.autocomplete = "address-line2";
      } else if (
        itemName.indexOf("address") != -1 &&
        itemName.indexOf("3") != -1
      ) {
        item.autocomplete = "address-line3";
      } else if (
        itemName.indexOf("cc") != -1 &&
        itemName.indexOf("name") != -1
      ) {
        item.autocomplete = "cc-name";
      } else if (
        itemName.indexOf("card") != -1 &&
        itemName.indexOf("number") != -1
      ) {
        item.autocomplete = "cc-number";
      } else if (itemName.indexOf("cvc") != -1) {
        item.autocomplete = "cc-csc";
      } else if (
        itemName.indexOf("cc") != -1 &&
        itemName.indexOf("exp") != -1
      ) {
        item.autocomplete = "cc-exp";
      } else if (
        itemName.indexOf("cc") != -1 &&
        itemName.indexOf("exp") != -1 &&
        itemName.indexOf("month") != -1
      ) {
        item.autocomplete = "cc-exp-month";
      } else if (
        itemName.indexOf("cc") != -1 &&
        itemName.indexOf("exp") != -1 &&
        itemName.indexOf("year") != -1
      ) {
        item.autocomplete = "cc-exp-year";
      } else if (itemName.indexOf("currency") != -1) {
        item.autocomplete = "transaction-currency";
      } else if (
        itemName.indexOf("amount") != -1 ||
        itemName.indexOf("sum") != -1 ||
        itemName.indexOf("total") != -1
      ) {
        item.autocomplete = "transaction-amount";
      } else if (itemName.indexOf("lang") != -1) {
        item.autocomplete = "language";
      } else if (
        itemName.indexOf("birth") != -1 &&
        itemName.indexOf("date") != -1
      ) {
        item.autocomplete = "bday";
      } else if (
        itemName.indexOf("birth") != -1 &&
        itemName.indexOf("day") != -1
      ) {
        item.autocomplete = "bday-day";
      } else if (
        itemName.indexOf("birth") != -1 &&
        itemName.indexOf("month") != -1
      ) {
        item.autocomplete = "bday-month";
      } else if (
        itemName.indexOf("birth") != -1 &&
        itemName.indexOf("year") != -1
      ) {
        item.autocomplete = "bday-year";
      } else if (
        itemName.indexOf("gender") != -1 ||
        itemName.indexOf("sex") != -1
      ) {
        item.autocomplete = "sex";
      } else {
        if (item.previousElementSibling != null) {
          try {
            item.autocomplete = item.previousElementSibling.textContent
              .replace(/ /g, "")
              .toLowerCase();
          } catch {}
        } else {
          try {
            item.autocomplete = item.parentElement.previousElementSibling.textContent
              .replace(/ /g, "")
              .toLowerCase();
          } catch {}
        }
      }
      break;
    case "url":
      item.autocomplete = item.type;
      break;
    case "email":
      item.autocomplete = item.type;
      break;
    case "password":
      item.autocomplete = item.type;
      break;
    case "number":
      item.autocomplete = item.type;
      break;
    case "date":
      item.autocomplete = item.type;
      break;
    case "tel":
      item.autocomplete = item.type;
      break;
    case "image":
      item.autocomplete = item.type;
    default:
      break;
  }
}
