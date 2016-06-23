/**
 * Created by Dhara on 6/19/2016.
 */
(function () {
    angular
        .module("MusicAroundMe")
        .controller("EventsController", EventsController)
        .controller("EventDetailController", EventDetailController);
    
    function EventsController($routeParams, EventfulService, $sce) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.searchText = undefined;
        vm.location = "Boston";
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;

        function init() {
            EventfulService
                .searchEvents(vm.searchText, vm.location)
                .then(
                    function (response) {
                        data = response.data;
                        // console.log("data = " + JSON.stringify(data));
                        vm.events = data.events;
                    },
                    function (error) {
                        console.log("Something went wrong..." + error);
                    }
                )
        }
        init();

        function getSafeHtml(description) {
            if(description != null) {
                return $sce.trustAsHtml(description);
            }
        }

        function getSafeUrl(eventUrl) {
            if(eventUrl != null) {
                return $sce.trustAsResourceUrl(eventUrl);
            }
        }

    }

    function EventDetailController($routeParams) {
        var vm = this;
        vm.userId = $routeParams.uid;


    }
})();
