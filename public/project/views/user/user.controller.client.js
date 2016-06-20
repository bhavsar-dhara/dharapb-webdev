/**
 * Created by Dhara on 6/19/2016.
 */
(function () {
    angular
        .module("MusicAroundMe")
        .controller("LoginRegController", LoginRegController)
        .controller("UserProfileController", UserProfileController);
    
    function LoginRegController($location, UserService) {
        var vm = this;
        vm.showSuccess = false;
        vm.showError = false;
        vm.login = login;
        vm.register = register;

        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if (user) {
                $location.url("/user/" + user._id);
            } else {
                vm.showError = true;
                vm.error = "User not found";
            }
        }   
        
        function register(user) {
            var uid = (new Date()).getTime()+"";
            if(vm.password2 === user.password) {
                user._id = uid;
                var newUser = UserService.createUser(user);
                if (newUser) {
                    $location.url("/user/"+newUser._id);
                } else {
                    vm.showError = true;
                    vm.error = "Unable to register user";
                }
            } else {
                vm.showError = true;
                vm.error = "Passwords don't match";
            }
        }
    }
    
    function UserProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.showSuccess = false;
        vm.showError = false;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        var uid = $routeParams.uid;

        function init() {
            vm.user = UserService.findUserById(uid);
        }
        init();

        function updateUser(user) {
            if (UserService.updateUser(uid, user)) {
                console.log("updated..");
                vm.showSuccess = true;
                $location.url("/user/"+uid);
                vm.success = "User details updated successfully";
            } else {
                vm.showError = true;
                vm.error = "User not found";
            }
        }
        
        function deleteUser() {
            if (UserService.deleteUser(uid)) {
                $location.url("/login");
                vm.success = "User successfully unregistered";
            } else {
                vm.error = "User not deleted";
            }
        }
    }
    
})();