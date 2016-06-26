/**
 * Created by Dhara on 6/19/2016.
 */
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

(function () {
    angular
        .module("MusicAroundMe")
        .factory("GoogleMapService", GoogleMapService);

    var key = "AIzaSyBihcuZF4Dcm2ZuJ4BEU09f62kIreSo-Wk";
    var urlBase = "//maps.googleapis.com/maps/api/js?key=API_KEY&libraries=places&callback=JSON_CALLBACK";

    function GoogleMapService($http) {
        var api = {
            loadGMap: loadGMap
        };
        return api;

        function loadGMap(location) {

            var url = urlBase
                .replace("API_KEY", key);

            console.log("gmap url = " + url);
            return $http.jsonp(url);
        }
    }

})();
