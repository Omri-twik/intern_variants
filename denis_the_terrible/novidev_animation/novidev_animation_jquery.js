if (window.jQuery) {
  $ = window.jQuery;
  mainJS();
} else {
  var script = document.createElement("SCRIPT");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
  script.type = "text/javascript";
  // this is doc.ready
  //-------------------
  script.onload = function () {
    var $ = window.jQuery;
    mainJS();
  };
  document.getElementsByTagName("head")[0].appendChild(script);
}

document.head.insertAdjacentHTML(
  "beforeend",
  `
    <style>
        tr>td>b.active:after {
            transform: rotate(-90deg);
        }
        td:nth-child(1) {
            width: ${
              window.getComputedStyle(
                document.querySelector("td:nth-child(1)")
              )["width"]
            }
        }
  
    </style>
    `
);
function mainJS() {
  $("tr.section-header").nextUntil("tr.section-header").toggle();
  $(".section-header").click(function () {
    $(this).nextUntil("tr.section-header").toggle();
  });

  function toggleArrowRotation(section) {
    let b_arrow = section.querySelector("td:nth-child(2) > b");
    if (b_arrow.classList.contains("active")) {
      b_arrow.classList.remove("active");
    } else {
      b_arrow.classList.add("active");
    }
  }

  for (let section of document.querySelectorAll("tr.section-header")) {
    toggleArrowRotation(section);
    section.addEventListener("click", () => {
      toggleArrowRotation(section);
    });
  }
}
