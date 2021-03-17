// if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//     // some code..
//    }

var distanceScrolledUp = 0;
var oldValue;
var newValue;

function showPopup() {
  console.log("popup");
  alert("popup");
}

function scrollTracking() {
  newValue = window.pageYOffset;

  if (oldValue - newValue > 0) {
    console.log("UP");
    distanceScrolledUp = distanceScrolledUp + (oldValue - newValue);
    console.log("distanceScrolledUp", distanceScrolledUp);
    if (distanceScrolledUp >= 300) {
      showPopup();
      window.removeEventListener("scroll", scrollTracking);
    }
  } else {
    distanceScrolledUp = 0;
  }

  oldValue = newValue;
}

function startTrackingScrollUp() {
  window.addEventListener("scroll", scrollTracking);
}

setTimeout(startTrackingScrollUp, 3000);
