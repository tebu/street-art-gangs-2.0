/**
*
* Geo.js
* This file handles the geolocalization functionalities
*
**/

var watchId;

function onGPSSuccess(pos) {
      var latitude = pos.coords.latitude;
      var longitude = pos.coords.longitude;
      var accuracy = pos.coords.accuracy;

      localStorage.latitude=latitude;
      localStorage.longitude=longitude;
      localStorage.accuracy=accuracy;
      updateUserPosition(latitude, longitude);

}

function onGPSError(error) {
//TODO FIx this
  alert (error.code)
}

function watchGPS() {
      // Request repeated updates.
      watchId = navigator.geolocation.watchPosition(onGPSSuccess, onGPSError, {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 1500
        });
}

function stopWatching() {
  // Function needed to cancel the updates.
  navigator.geolocation.clearWatch(watchId);
}
