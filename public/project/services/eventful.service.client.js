/**
 * Created by Dhara on 6/19/2016.
 */
(function () {
    angular
        .module("MusicAroundMe")
        .factory("EventfulService", EventfulService);

    var key = "TjLhBLhJm4SCTsMx";
    var urlBaseInit = "//api.eventful.com/json/events/search?app_key=API_KEY&category=music&location=LOCATION&date=This Week&sort_order=popularity&sort_direction=ascending&callback=JSON_CALLBACK";
    var urlBase = "//api.eventful.com/json/events/search?app_key=API_KEY&category=music&keywords=TEXT&location=LOCATION&date=This Week&sort_order=popularity&sort_direction=ascending&callback=JSON_CALLBACK";

    function EventfulService($http) {
        var api = {
            searchEvents: searchEvents
        };
        return api;

        function searchEvents(searchText, location) {
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
            return $http.jsonp(url);
        }
    }


})();