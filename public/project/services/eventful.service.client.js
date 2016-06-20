/**
 * Created by Dhara on 6/19/2016.
 */
(function () {
    angular
        .module("MusicAroundMe")
        .factory("EventfulService", EventfulService);

    // API to be used
    // http://api.eventful.com/json/events/search?app_key=TjLhBLhJm4SCTsMx&keywords=books&location=San+Diego&date=Future
    var key = "TjLhBLhJm4SCTsMx";
    var urlBase = "http://api.eventful.com/json/events/search?app_key=API_KEY&keywords=TEXT&location=LOCATION&date=Future";

    function EventfulService($http) {
        var api = {
            searchEvents: searchEvents
        };
        return api;

        function searchEvents(searchText, location) {
            if(location == null) {
                location = Boston;
            }
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchText)
                .replace("LOCATION", location);
            return $http.get(url);
        }
    }


})();