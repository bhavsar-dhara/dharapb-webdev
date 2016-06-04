/**
 * Created by Dhara on 6/4/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    var key = "8d63c8202023f92be424ec64d2300e72";
    var secret = "621df92de2e20fd4";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http) {
        var api = {
            searchPhotos: searchPhotos
        }
        return api;

        function searchPhotos(searchText) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchText);
            return $http.get(url);
        }
    }
})();