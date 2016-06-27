/**
 * Created by Dhara on 6/19/2016.
 */
(function () {
    angular
        .module("MusicAroundMe")
        .factory("EventService", EventService);

    function EventService($http) {
        var api = {
            createEvent: createEvent
        };
        return api;
        
        function createEvent(event) {
            return $http.post("/api/project/event", event);
        }
    }
})();