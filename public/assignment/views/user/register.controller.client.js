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
        // console.log("uid = " + uid);
        vm.createUser = createUser;

        function createUser(user) {
            if(vm.password2 === user.password) {
                user._id = uid;
                var newUser = UserService.createUser(user);
                if (newUser) {
                    // console.log("user registered");
                    $location.url("/user/"+uid)
                } else {
                    // console.log("user not registered");
                    vm.error = "Unable to register user";
                }
            } else {
                // console.log("password mismatch");
                vm.error = "Passwords don't match";
            }
        }
    }
})();