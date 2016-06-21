/**
 * Created by Dhara on 6/19/2016.
 */
(function () {
    angular
        .module("MusicAroundMe")
        .controller("EventsController", EventsController)
        .controller("EventDetailController", EventDetailController);
    
    function EventsController($routeParams) {
        var vm = this;
        vm.userId = $routeParams.uid;


    }

    function EventDetailController($routeParams) {
        var vm = this;
        vm.userId = $routeParams.uid;

        
    }
})();
