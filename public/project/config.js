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
            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "UserProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "UserProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid/event", {
                templateUrl: "views/event/event-list.view.client.html",
                controller: "EventsController",
                controllerAs: "model"
            })
            .when("/user/:uid/event/:eventId", {
                templateUrl: "views/event/event-details.view.client.html",
                controller: "EventDetailController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/"
            });

        function checkLoggedIn(UserService, $location, $q, $rootScope) {
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        console.log(user);
                        if(user == '0') {
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/login");
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function (error) {
                        $location.url("/login");
                    }
                );
            return deferred.promise;
        }
    }
})();