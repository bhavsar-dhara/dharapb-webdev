/**
 * Created by Dhara on 6/28/2016.
 */
(function () {
    angular
        .module("MusicAroundMe")
        .controller("AdminController", AdminController);

    function AdminController(UserService, $routeParams, $location, $rootScope) {

        var vm = this;
        vm.userId = $routeParams.uid;

        vm.sortField = 'firstName';
        vm.order = false;

        vm.addNewUser = addNewUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.cancelEdit = cancelEdit;
        vm.new_user = {
            '_id': '',
            'username': '',
            'password': '',
            'firstName': '',
            'lastName': '',
            'roles': ''
        };

        function init() {
            if (!$rootScope.user) {
                $location.url("/");
            }
            populateUsers();
        }
        init();

        function addNewUser(user) {
            if (!$rootScope.user) {
                $location.url("/");
            }
            if (!user) {
                return;
            }
            delete user._id;
            UserService
                .createUser(rolesToArray(user))
                .then(
                    function (response) {
                        vm.new_user = {
                            '_id': '',
                            'username': '',
                            'password': '',
                            'firstName': '',
                            'lastName': '',
                            'roles': ''
                        };
                        populateUsers();
                    },
                    function (error) {
                        console.log(error);
                    }
                );
        }

        function updateUser(user) {
            if (!$rootScope.user) {
                $location.url("/");
            }
            if (!user || !user._id) {
                return;
            }
            var userId = user._id;
            delete user._id;
            UserService
                .updateUser(userId, rolesToArray(user))
                .then(
                    function (response) {
                        vm.new_user = {
                            '_id': '',
                            'username': '',
                            'password': '',
                            'firstName': '',
                            'lastName': '',
                            'roles': ''
                        };
                        populateUsers();
                    },
                    function (error) {
                        console.log(error);
                    }
                );
        }

        function deleteUser(userId) {
            if (!$rootScope.user) {
                $location.url("/");
            }
            if (!userId) {
                return;
            }
            UserService
                .deleteUser(userId)
                .then(
                    function (response) {
                        populateUsers();
                    },
                    function (error) {
                        console.log(error);
                    });
        }

        function selectUser(user) {
            if (!$rootScope.user) {
                $location.url("/");
            }
            if (!user) {
                return;
            }
            var selectedUser = rolesToString(angular.copy(user));
            vm.new_user = {
                '_id': selectedUser._id,
                'username': selectedUser.username,
                'password': selectedUser.password,
                'roles': selectedUser.roles,
                'firstName': selectedUser.firstName,
                'lastName': selectedUser.lastName,
                'email': selectedUser.email,
                'phone': selectedUser.phone
            };
        }

        function populateUsers() {
            UserService
                .findAllUsers()
                .then(
                    function (response) {
                        vm.users = rolesToString(response.data);
                    },
                    function (error) {
                        console.log(error);
                    });
        }

        function rolesToString(user) {
            if (user.roles) {
                user.roles = user.roles.join();
            }
            return user;
        }

        function rolesToArray(user) {
            if (user.roles) {
                user.roles = user.roles.split(",");
            }
            return user;
        }
        
        function cancelEdit() {
            vm.new_user = {
                '_id': '',
                'username': '',
                'password': '',
                'firstName': '',
                'lastName': '',
                'roles': ''
            };
            // populateUsers();
        }
    }
})();