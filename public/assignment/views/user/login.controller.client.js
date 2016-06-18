/**
 * Created by Dhara on 5/24/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope) {
        var vm = this; // viewModel = vm
        vm.isEmptyUser = false;
        vm.isEmptyPassword = false;
        vm.loginForm = undefined;

        vm.login = function(username, password) {
            vm.isEmptyUser = vm.loginForm.username.$error.required;
            vm.isEmptyPassword = vm.loginForm.password.$error.required;
            if(!vm.isEmptyUser && !vm.isEmptyPassword) {
                UserService
                    .login(username, password)
                    .then(
                        function (response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            if (user != null) {
                                $location.url("/user/" + user._id);
                            } else {
                                vm.error = "User not found. Please register first.";
                            }
                        },
                        function (error) {
                            vm.error = "Sorry! Something went wrong.";
                        });
            }
        }
    }
})();