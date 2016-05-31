/**
 * Created by Dhara on 5/27/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        var uid = (new Date()).getTime()+"";
        vm.createUser = createUser;

        function createUser(user) {
            if(vm.password2 === user.password) {
                user._id = uid;
                UserService
                    .createUser(user)
                    .then(function (response) {
                        var newUser = response.data;
                        if (newUser) {
                            $location.url("/user/"+newUser._id);
                        } else {
                            vm.error = "Unable to register user";
                        }
                    });
                // var newUser = UserService.createUser(user);
                // if (newUser) {
                //     $location.url("/user/"+newUser._id);
                // } else {
                //     vm.error = "Unable to register user";
                // }
            } else {
                vm.error = "Passwords must match";
            }
        }
    }
})();