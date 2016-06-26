/**
 * Created by Dhara on 6/19/2016.
 */
(function () {
    angular
        .module("MusicAroundMe")
        .factory("EventfulService", EventfulService);

    var key = "TjLhBLhJm4SCTsMx";
    var urlBaseInit = "//api.eventful.com/json/events/search?app_key=API_KEY&category=music&location=LOCATION&within=15&date=This Week&sort_order=popularity&sort_direction=ascending&callback=JSON_CALLBACK";
    var urlBase = "//api.eventful.com/json/events/search?app_key=API_KEY&category=music&keywords=TEXT&location=LOCATION&within=15&date=This Week&sort_order=popularity&sort_direction=ascending&callback=JSON_CALLBACK";
    var urlBaseInitLatLng = "//api.eventful.com/json/events/search?app_key=API_KEY&category=music&where=LAT,LNG&within=15&date=This Week&sort_order=popularity&sort_direction=ascending&callback=JSON_CALLBACK";
    var urlBaseLatLng = "//api.eventful.com/json/events/search?app_key=API_KEY&category=music&keywords=TEXT&where=LAT,LNG&within=15&date=This Week&sort_order=popularity&sort_direction=ascending&callback=JSON_CALLBACK";

    function EventfulService($http) {
        var api = {
            searchEvents: searchEvents,
            searchEventsOnLatLng: searchEventsOnLatLng
        };
        return api;

        function searchEvents(searchText, location) {
            // console.log("location = " + location);
            var url = "";
            if(location == null) {
                location = "Boston";
            }
            if(searchText == null) {
                url = urlBaseInit
                    .replace("API_KEY", key)
                    .replace("LOCATION", location);
            } else {
                url = urlBase
                    .replace("API_KEY", key)
                    .replace("TEXT", searchText)
                    .replace("LOCATION", location);
            }
            console.log("url = " + url);
            return $http.jsonp(url);
        }

        function searchEventsOnLatLng(searchText, latitude, longitude) {
            if(searchText == null) {
                url = urlBaseInitLatLng
                    .replace("API_KEY", key)
                    .replace("LAT", latitude)
                    .replace("LNG", longitude);
            } else {
                url = urlBaseLatLng
                    .replace("API_KEY", key)
                    .replace("TEXT", searchText)
                    .replace("LAT", latitude)
                    .replace("LNG", longitude);
            }
            return $http.jsonp(url);
        }
    }


})();