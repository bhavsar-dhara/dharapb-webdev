/**
 * Created by Dhara on 6/24/2016.
 */
module.exports = function(app) {

    var users = [
        {_id:"123", username:"alice", password:"alice", firstName:"Alice", lastName:"Wonderland"},
        {_id:"234", username:"bob", password:"bob", firstName:"Bob", lastName:"Marley"},
        {_id:"345", username:"charlie", password:"charlie", firstName:"Charlie", lastName:"Garcia"},
        {_id:"456", username:"jannunzi", password:"jannunzi", firstName:"Jose", lastName:"Annunziato"}
    ];

    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findUsers);
    app.get("/api/project/user/:userId", findUserById);
    app.put("/api/project/user/:userId", updateUser);
    app.delete("/api/project/user/:userId", deleteUser);

    function deleteUser(req, res) {
        var userId = req.params.userId;
        for (var i in users) {
            if (users[i]._id === userId) {
                users.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        for (var i in users) {
            if (users[i]._id === userId) {
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date().getTime()+"");
        users.push(user);
        res.json(user);
    }

    function findUserById(req, res) {
        var id = req.params.userId;
        for (i in users) {
            if (users[i]._id === id) {
                res.json(users[i]);
                return;
            }
        }
        res.send({});
    }

    function findUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(username, password, req, res);
        } else if (username) {
            findUserByUsername(username, req, res);
        } else {
            res.json(users);
        }
    }

    function findUserByCredentials(username, password, req, res) {
        for (i in users) {
            if (users[i].username === username && users[i].password === password) {
                res.json(users[i]);
                return;
            }
        }
        res.send({});
    }

    function findUserByUsername(username, req, res) {
        for (i in users) {
            if (users[i].username === username) {
                res.json(users[i]);
                return;
            }
        }
        res.send({});
    }
};