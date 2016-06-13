/**
 * Created by Dhara on 5/31/2016.
 */
module.exports = function(app, models) {

    var userModel = models.userModel;

    app.post("/api/user", createUser);
    app.get("/api/user", findUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(
                function (user) {
                    // console.log(user);
                    res.json(user);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(userId, newUser)
            .then(
                function (stats) {
                    // console.log(stats);
                    res.send(stats);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function (user) {
                    // console.log(user);
                    res.json(user);
                }, 
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findUserById(req, res) {
        var id = req.params.userId;
        userModel
            .findUserById(id)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }
    
    function findUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        // console.log(username);
        // console.log(password);
        if (username && password) {
            findUserByCredentials(username, password, res);
        } else if (username) {
            findUserByUsername(username, res);
        } else {
            res.json(users);
        }
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }
};