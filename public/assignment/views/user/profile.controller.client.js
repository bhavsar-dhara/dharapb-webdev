/**
 * Created by Dhara on 5/24/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unRegister = unRegister;
        
        var uid = $routeParams.uid;
        
        function init() {
            UserService
                .findUserById(uid)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();
        
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