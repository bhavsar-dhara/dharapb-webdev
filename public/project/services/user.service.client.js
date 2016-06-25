/**
 * Created by Dhara on 6/19/2016.
 */
(function () {
    angular
        .module("MusicAroundMe")
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
            return $http.post("/api/project/user", user);
        }

        function findUserById(userId) {
            var url = "/api/project/user/"+userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/project/user/?username="+username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/api/project/user/" + userId;
            return $http.put(url, user);
        }
        
        function deleteUser(userId) {
            var url = "/api/project/user/" + userId;
            return $http.delete(url);
        }
    }
})();