/**
 * Created by Dhara on 6/19/2016.
 */
(function () {
    angular
        .module("MusicAroundMe")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home-page.view.client.html"
            })
            .when("/login", {
                templateUrl: "views/user/login-register.view.client.html",
                controller: "LoginRegController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "UserProfileController",
                controllerAs: "model"
            })
            .when("/event", {
                templateUrl: "views/user/event-list.view.client.html"
            })
            .when("/event/:eventId", {
                templateUrl: "views/user/event-details.view.client.html"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();