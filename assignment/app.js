/**
 * Created by Dhara on 5/31/2016.
 */
module.exports = function(app) {

    require("./services/user.service.server.js")(app);

//    SAMPLE CODE STARTS

    console.log("Hello from the server");
    app.get("/sayHello", function () {
        console.log("Hello");
    });
    app.get("/say/:something", function (req, res) {
        var msg = req.params['something'];
        console.log(msg);
        // res.send(msg);
        res.send({message: msg});
    });

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.get("/users", function (req, res) {
        // var id = req.params.id;
        res.send(users);
        // res.send({users: users});
    });

    app.get("/users/:id", function (req, res) {
        var id = req.params.id;
        for (i in users) {
            if(users[i]._id === id) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    });

//    SAMPLE CODE ENDS
};