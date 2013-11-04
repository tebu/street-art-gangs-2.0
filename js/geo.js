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
      console.log(
        " lat: " + latitude +
        " lon " + longitude +
        " accuracy " + accuracy
      );
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
          maximumAge: 60000,
          timeout: 15000
        });
}

function stopWatching() {
  // Function needed to cancel the updates.
  navigator.geolocation.clearWatch(watchId);
}
