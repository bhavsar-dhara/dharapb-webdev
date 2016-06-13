/**
 * Created by Dhara on 5/27/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;
        vm.registerForm = undefined;
        vm.isEmptyUser = false;
        vm.isEmptyPassword = false;
        vm.isEmptyPassword2 = false;

        function createUser(user) {
            vm.isEmptyUser = vm.registerForm.username.$error.required;
            vm.isEmptyPassword = vm.registerForm.password.$error.required;
            vm.isEmptyPassword2 = vm.registerForm.$error.required;
            if(!vm.isEmptyUser && !vm.isEmptyPassword && !vm.isEmptyPassword2) {
                if (vm.password2 === user.password) {
                    UserService
                        .createUser(user)
                        .then(function (response) {
                            var newUser = response.data;
                            if (newUser) {
                                $location.url("/user/" + newUser._id);
                            } else {
                                vm.error = "Unable to register user.";
                            }
                        });
                } else {
                    vm.error = "Passwords must match.";
                }
            }
        }
    }
})();