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
            findAllUsers: findAllUsers,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            loggedIn: loggedIn,
            register: register,
            addInvite: addInvite,
            createUserByAdmin: createUserByAdmin,
            findUserByAdmin: findUserByAdmin,
            findAllUsersByAdmin: findAllUsersByAdmin,
            updateUserByAdmin: updateUserByAdmin,
            deleteUserByAdmin: deleteUserByAdmin
        };
        return api;

        function createUserByAdmin(user) {
            var url = "/api/project/user/admin/";
            return $http.post(url, user);
        }

        function findUserByAdmin(userId) {
            var url = "/api/project/user/admin/" + userId;
            return $http.get(url);
        }
        
        function findAllUsersByAdmin() {
            var url = "/api/project/user/admin/";
            return $http.get(url);
        }

        function updateUserByAdmin(userId, newUser) {
            var url = "/api/project/user/admin/" + userId;
            console.log(url);
            return $http.put(url, newUser);
        }

        function deleteUserByAdmin(userId) {
            var url = "/api/project/user/admin/" + userId;
            return $http.delete(url);
        }

        function addInvite(userId, invite) {
            var url = "/api/project/user/addInvite/" + userId;
            return $http.put(url, invite);
        }
        
        function findAllUsers() {
            return $http.get("/api/project/users");
        }
        
        function loggedIn() {
            return $http.get("/api/project/loggedIn");
        }

        function register(user) {
            // console.log("in client reg.." + JSON.stringify(user));
            return $http.post("/api/project/register", user);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }
        
        function login(user) {
            return $http.post("/api/project/login", user);
        }
        
        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function findUserById(userId) {
            // console.log("in find user by id");
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