/**
 * Created by Dhara on 5/24/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this; // viewModel = vm

        vm.login = function(username, password) {
            var user = UserService.findUserByUserNameAndPassword(username, password);
            if (user) {
                $location.url("/user/" + user._id);
            } else {
                vm.error = "User not found";
            }
        }
    }
})();