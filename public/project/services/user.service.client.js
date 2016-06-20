/**
 * Created by Dhara on 6/19/2016.
 */
(function () {
    angular
        .module("MusicAroundMe")
        .factory("UserService", UserService);

    var users = [
        {_id:"123", username:"alice", password:"alice", firstName:"Alice", lastName:"Wonderland"},
        {_id:"234", username:"bob", password:"bob", firstName:"Bob", lastName:"Marley"},
        {_id:"345", username:"charlie", password:"charlie", firstName:"Charlie", lastName:"Garcia"},
        {_id:"456", username:"jannunzi", password:"jannunzi", firstName:"Jose", lastName:"Annunziato"}
    ];

    function UserService() {
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        }
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
            for(var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    return users[i];
                }
            }
        }

        function updateUser(userId, user) {
            for (var i in users) {
                if(users[i]._id === userId) {
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    return users[i];
                }
            }
            return null;
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