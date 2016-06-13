/**
 * Created by Dhara on 5/24/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this; // viewModel = vm
        vm.isEmptyUser = false;
        vm.isEmptyPassword = false;
        vm.loginForm = undefined;

        vm.login = function(username, password) {
            vm.isEmptyUser = vm.loginForm.username.$error.required;
            vm.isEmptyPassword = vm.loginForm.password.$error.required;
            // var promise = UserService.findUserByCredentials(username, password);
            // promise.then(function (response) {
            if(!vm.isEmptyUser && !vm.isEmptyPassword) {
                UserService
                    .findUserByCredentials(username, password)
                    .then(function (response) {
                        // console.log(response);
                        var user = response.data;
                        if (user != null) {
                            $location.url("/user/" + user._id);
                        } else {
                            vm.error = "User not found. Please register first.";
                        }
                    });
            }
        }
    }
})();