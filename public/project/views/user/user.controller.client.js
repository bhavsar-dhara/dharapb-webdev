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
            UserService
                .findUserByCredentials(username, password)
                .then(function (response) {
                    var user = response.data;
                    if (user._id) {
                        $location.url("/user/" + user._id);
                    } else {
                        vm.showError = true;
                        vm.error = "User not found";
                    }
                });
        }   
        
        function register(user) {
            if(vm.password2 === user.password) {
                UserService
                    .createUser(user)
                    .then(function (response) {
                        var user = response.data;
                        if (user) {
                            $location.url("/user/" + user._id);
                        } else {
                            vm.showError = true;
                            vm.error = "Unable to register user";
                        }
                    });
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
        vm.userId = uid;

        function init() {
            UserService
                .findUserById(uid)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();

        function updateUser(user) {
            UserService
                .updateUser(uid, user)
                .then(
                    function (response) {
                        vm.showSuccess = true;
                        $location.url("/user/" + uid);
                        vm.success = "User details updated successfully";
                    },
                    function (error) {
                        vm.showError = true;
                        vm.error = "User not updated";
                    });
        }
        
        function deleteUser() {
            UserService
                .deleteUser(uid)
                .then(
                    function (response) {
                        vm.showSuccess = true;
                        $location.url("/login");
                        vm.success = "User successfully unregistered";
                    },
                    function (error) {
                        vm.showError = true;
                        vm.error = "User not deleted";
                    }
                );
        }
    }
    
})();