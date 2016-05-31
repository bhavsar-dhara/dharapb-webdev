/**
 * Created by Dhara on 5/26/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    
    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(user) {
            users.push(user);
            return user;
        }

        function findUserById(userId) {
            for (var i in users) {
                if(users[i]._id === userId) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var i in users) {
                if(users[i].username === username) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            // $http.get(url);
            return $http.get(url); // promise
        }

        function updateUser(userId, newUser) {
            for (var i in users) {
                if(users[i]._id === userId) {
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    return true;
                }
            }
            return false;
        }

        function deleteUser(userId) {
            for (var i in users) {
                if(users[i]._id === userId) {
                    users.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();