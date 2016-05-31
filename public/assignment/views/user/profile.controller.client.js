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
            if (UserService.updateUser(uid, newUser)) {
                $location.url("/user/"+uid);
                vm.success = "success";
            } else {
                vm.error = "User not found";
            }
        }
    }
})();