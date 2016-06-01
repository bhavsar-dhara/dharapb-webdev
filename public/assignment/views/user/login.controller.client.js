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
            // var promise = UserService.findUserByCredentials(username, password);
            // promise.then(function (response) {
            UserService
                .findUserByCredentials(username, password)
                .then(function (response) {
                    console.log(response);
                    var user = response.data;
                    if (user._id) {
                        $location.url("/user/" + user._id);
                    } else {
                        vm.error = "User not found";
                    }
                });
        }
    }
})();