let decodedCode;
let codeArea;

function decodeBinaryToText(binary) {
  return binary
    .split(" ") //Split string in array of binary chars
    .map((bin) => String.fromCharCode(parseInt(bin, 2))) //Map every binary char to real char
    .join(""); //Join the array back to a string
}

function convertCode() {
  try {
    codeArea = document.querySelector("textarea#code");
    // console.log("codeArea.textContent", codeArea.textContent);
    decodedCode = decodeBinaryToText(codeArea.textContent);
    new Function(decodedCode); // check if the decoded text is valid as JS code; throws error if isn't
    codeArea.innerHTML = decodedCode;
    // console.log("codeArea.textContent", codeArea.textContent);
  } catch {
    console.log("invalid decoding");
  }
}

let interval = setInterval(() => {
  if (
    document.querySelector("textarea#code") &&
    document.querySelector("textarea#code").textContent.length > 0
  ) {
    convertCode();
    clearInterval(interval);
  }
}, 10);
