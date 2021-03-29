// flip flop
let url =
  "https://www.bingo-shoes.co.il/%D7%A0%D7%A2%D7%9C%D7%99-%D7%91%D7%99%D7%A0%D7%92%D7%95/74/%D7%A0%D7%A2%D7%9C%D7%99-%D7%A0%D7%A9%D7%99%D7%9D/%D7%9B%D7%A4%D7%9B%D7%A4%D7%99%D7%9D-%D7%9E%D7%9B%D7%9C-%D7%94%D7%9E%D7%99%D7%A0%D7%99%D7%9D";

function resize_underTopContainerElement() {
  underTopContainerElement.style.height = window.getComputedStyle(
    topContainerDiv
  )["height"];
}

let bannerStyle_desktop = `
  <style>
  
    .top-banner-container {
        background: #d1ae98;
        margin: 0;
      }
  
      .top-banner-wrapper {
        padding-top: 10px;
        padding-bottom: 10px;
      }
  
      .top-banner {
        display: flex;
        justify-content: center;
        flex-direction: column;
      }
  
      .top-banner-line {
        color: white;
        text-align: center;
      }
  
      .top-banner-line1-desktop {
        font-size: 28px;
      }
  
      .top-banner-line2-desktop {
        font-size: 16px;
      }
  
      .top-banner-link:link {
        text-decoration: none;
      }
      .top-banner-link:visited {
        text-decoration: none;
      }

      .topContainer {
        background-color: white;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 9999;
    }

    .topbuttons LI:last-child {
        top: -7px !important;
    }
  
      @media only screen and (max-width: 800px) {
        .top-banner-line1-desktop {
        font-size: 24px;
      }
  
      .top-banner-line2-desktop {
        font-size: 12px;
      }
  
      @media only screen and (max-width: 650px) {
        .top-banner-line1-desktop {
        font-size: 20px;
      }
  
      .top-banner-line2-desktop {
        font-size: 10px;
      }
    }

  }
  </style>
  `;

let bannerStyle_mobile = `
  <style>
  .top-banner-container {
    background: #d1ae98;
    margin: 0;
  }

  .top-banner {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .top-banner-line {
    color: white;
    text-align: center;
  }

    .top-banner-line1-desktop {
      font-size: 28px;
    }

    .top-banner-line2-desktop {
      font-size: 16px;
    }

    .top-banner-link:link {
      text-decoration: none;
    }

    .top-banner-link:visited {
      text-decoration: none;
    }

    .topContainer {
      background-color: white;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 9999;
    }

    .topbuttons LI:last-child {
      top: -7px !important;
    }


    @media only screen and (max-width: 580px) {

      .top-banner-wrapper {
        padding: 3px;
      }

      .top-banner-line1-desktop {
      font-size: 20px;
    }

    .top-banner-line2-desktop {
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 410px) {

    .top-banner-wrapper {
      padding: 3px;
      padding-top: 5px;
      padding-bottom: 5px;
    }

    .top-banner-line1-desktop {
    font-size: 16px;
  }

  .top-banner-line2-desktop {
    font-size: 12px;
  }

  @media only screen and (max-width: 350px) {

    .top-banner-wrapper {
      padding: 3px;
      padding-top: 5px;
      padding-bottom: 5px;
    }

    .top-banner-line1-desktop {
    font-size: 15px;
  }

  .top-banner-line2-desktop {
    font-size: 12px;
  }
}
}
  </style>
  `;

if (
  /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  document.head.insertAdjacentHTML("beforeend", bannerStyle_mobile);
} else {
  document.head.insertAdjacentHTML("beforeend", bannerStyle_desktop);
}

let bannerHTML = `
  <div class="top-banner-container">
      <a class="top-banner-link" href="${url}">
        <div class="top-banner-wrapper">
          <div class="top-banner top-banner-desktop">
            <div class="top-banner-line top-banner-line1 top-banner-line1-desktop">העונה החדשה כבר פה! לחצי כאן לקולקציה החדשה</div>
          </div>
        </div>
      </a>
    </div>
    `;

let mobile_banner = `      
    <div class="top-banner top-banner-mobile">
      <div class="top-banner-line top-banner-line1 top-banner-line1-mobile">
        משב רוח רענן: העונה החדשה </div>
      <div class="top-banner-line top-banner-line2 top-banner-line2-mobile">
        7% הנחה לחברי/ות מועדון </div>
      <div class="top-banner-line top-banner-line3 top-banner-line3-mobile">
        ההנחה תתעדכן בקופה - התחברו לאתר ולמועדון </div>
    </div>
        `;

let topstrip = document.querySelector(".topstrip");
let heightmob = document.querySelector(".heightmob");
heightmob.style.setProperty("height", "0px", "important");
topstrip.style.setProperty("position", "static", "important");
let topContainerDiv = document.createElement("DIV");
topContainerDiv.classList.add("topContainer");
topstrip.remove();
topContainerDiv.appendChild(topstrip);
topContainerDiv.insertAdjacentHTML("afterbegin", bannerHTML);
document.body.insertAdjacentElement("afterbegin", topContainerDiv);

let underTopContainerElement = document.createElement("DIV");
document.body.insertAdjacentElement("afterbegin", underTopContainerElement);
resize_underTopContainerElement();

window.addEventListener("resize", () => {
  resize_underTopContainerElement();
});
