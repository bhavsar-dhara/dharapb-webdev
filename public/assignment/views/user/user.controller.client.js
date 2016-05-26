/**
 * Created by Dhara on 5/24/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function LoginController() {
        var vm = this; // viewModel = vm

        vm.login = function(username, password) {
            for(var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    console.log("YAY");
                } else {
                    console.log("NO User");
                    vm.error = "User not found.";
                }
            }
            console.log(username);
        }
    }
})();