/**
 * Created by Dhara on 6/19/2016.
 */
(function () {
    angular
        .module("MusicAroundMe")
        .factory("EventfulService", EventfulService);

    // API to be used
    // http://api.eventful.com/json/events/search?app_key=TjLhBLhJm4SCTsMx&keywords=books&location=San+Diego&date=Future
    // var key = "Pc55hFFcncSQH6qW";
    var key = "TjLhBLhJm4SCTsMx";
    var urlBaseInit = "http://api.eventful.com/json/events/search?app_key=API_KEY&category=music&location=LOCATION&date=Future&sort_order=date&sort_direction=ascending&callback=JSON_CALLBACK";
    var urlBase = "http://api.eventful.com/json/events/search?app_key=API_KEY&category=music&keywords=TEXT&location=LOCATION&date=Future&sort_order=date&sort_direction=ascending&callback=JSON_CALLBACK";

    function EventfulService($http) {
        var api = {
            searchEvents: searchEvents
        };
        return api;

        function searchEvents(searchText, location) {
            var url = "";
            if(location == null) {
                location = Boston;
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
            // return $http.get(url);
            return $http.jsonp(url);
        }
    }


})();