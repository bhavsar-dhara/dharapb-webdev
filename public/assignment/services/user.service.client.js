/**
 * Created by Dhara on 5/26/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];
    
    function UserService() {
        var api = {
            findUserByUserNameAndPassword: findUserByUserNameAndPassword
        };
        return api;
        
        function findUserByUserNameAndPassword(username, password) {
            for (var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    return users[i];
                }
            }
            return null;
        }
    }
})();