/**
 * Created by Dhara on 5/27/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;

        var uid = $routeParams.uid;

        function init() {
            vm.user = UserService.findUserById(uid);
        }
        init();

        function updateUser(newUser) {
            UserService.updateUser(uid, newUser);
        }
    }
})();