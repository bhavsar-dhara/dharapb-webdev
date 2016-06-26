/**
 * Created by Dhara on 6/19/2016.
 */
(function () {
    angular
        .module("MusicAroundMe")
        .controller("LoginRegController", LoginRegController)
        .controller("UserProfileController", UserProfileController);
    
    function LoginRegController($location, UserService, $rootScope) {
        var vm = this;
        vm.showSuccess = false;
        vm.showError = false;
        vm.login = login;
        vm.register = register;

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            UserService
                .login(user)
                .then(function (response) {
                    var user = response.data;
                    if (user != null) {
                        $rootScope.currentUser = user;
                        $location.url("/user/" + user._id);
                    } else {
                        vm.showError = true;
                        vm.error = "User not found";
                    }
                });
        }   
        
        function register(user) {
            if(vm.password2 === user.password) {
                console.log("in controller reg");
                UserService
                    .register(user)
                    .then(function (response) {
                        var user = response.data;
                        if (user) {
                            $rootScope.currentUser = user;
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
    
    function UserProfileController($location, $routeParams, UserService, $rootScope) {
        var vm = this;
        vm.showSuccess = false;
        vm.showError = false;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        
        // var uid = $routeParams.uid;
        var uid = $rootScope.currentUser._id;
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
        
        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    }
                )
        }
    }
    
})();