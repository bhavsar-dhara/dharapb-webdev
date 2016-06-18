/**
 * Created by Dhara on 5/24/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, UserService, $rootScope) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unRegister = unRegister;
        vm.logout = logout;
        
        // var uid = $routeParams.uid;
        var uid = $rootScope.currentUser._id;
        
        function init() {
            UserService
                .findUserById(uid)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function (error) {
                        $location.url("/login");
                    }
                )
        }
        
        function updateUser(newUser) {
            UserService
                .updateUser(uid, newUser)
                .then(
                    function (response) {
                        vm.success = "Updated successfully.";
                    },
                    function (error) {
                        vm.error = "Unable to update user.";
                    }
                );
        }
        
        function unRegister() {
            UserService
                .deleteUser(uid)
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function (error) {
                        vm.error = "Unable to unregister user.";
                    }
                );
        }
    }
})();