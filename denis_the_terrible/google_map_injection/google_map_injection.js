(() => {
  // * INSTRUCTIONS *
  // ========================================================================================
  //
  //  Replace the string of the "selector" variable with the selector of the element you want
  //
  // to append the map to. Replace the string of the "googleAPIkey" with your Google API key.
  //
  // You can aqcuire an API key following the instructions:
  //
  // https://developers.google.com/maps/documentation/maps-static/get-api-key#get-key
  //
  // Pick the coordinates, size of the map element and the zoom, and enjoy your interactive Google Map
  //
  // ========================================================================================
  //
  // pick a selector from the page and enter it in this section (has to be a string)
  // ------------------------------------------------------------------
  let selector = "enter your selector here";
  // ------------------------------------------------------------------
  //
  // enter your Google API key here (has to be a string)
  // ------------------------------------------------------------------
  let googleAPIkey = "enter your google api key here";
  //
  // change the latitude and longitude where the map will be centered (can be a string or a number)
  let latitude = 32.053;
  let longitude = 34.772;
  //
  // change the size of the map element (has to be a string with pixels or percentages)
  // ------------------------------------------------------------------
  let height = "500px";
  let width = "500px";
  //
  // change the zoom of the map (can be a string or a number)
  let zoom = "16";
  //
  //
  //  OPTIONAL: add or remove coordinates to add markers to the map
  // in case no markers are needed - leave the array empty
  let markers = [
    [32.053, 34.772],
    [31.7683, 35.2137],
  ];
  //
  //
  //
  //
  // start of functionality
  // ========================================================================================
  let targetElement = document.querySelector(selector);
  targetElement.innerHTML = `<div id="map"></div>`;

  $("head").append(
    `<script src = "https://polyfill.io/v3/polyfill.min.js?features=default"></script>`
  );

  $("head").append(`<style> #map {
    height: ${height};
    width: ${width};
    `);

  $("head").append(`<script>
    let map;
    let market;

    function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: ${latitude}, lng: ${longitude} },
        zoom: ${zoom},
    });
    }
  </script>`);

  $("body").append(
    `<script src="https://maps.googleapis.com/maps/api/js?key=${googleAPIkey}&callback=initMap&libraries=&v=weekly" async></script>`
  );

  // adding markers when variable "google" becomes available
  let interval;
  function remove_interval() {
    clearInterval();
  }
  interval = setInterval(() => {
    let google_type = typeof google;
    if (google_type !== "undefined") {
      if (markers.length > 0) {
        for (mkr of markers) {
          $("body").append(`<script>
                            marker = new google.maps.Marker({
                                position: {lat:${mkr[0]}, lng:${mkr[1]}} ,
                                map: map,
                              });</script>`);
        }
      }
    }
    remove_interval();
  }, 5);
})();
