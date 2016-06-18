/**
 * Created by Dhara on 5/31/2016.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {

    var userModel = models.userModel;

    // app.get("/auth/facebook", facebookLogin);
    app.get("/auth/facebook", passport.authenticate('facebook'));
    app.get("/auth/facebook/callback", passport.authenticate('facebook', {
        successRedirect: '/assignment/#/profile',
        failureRedirect: '/assignment/#/login'
    }));
    app.post("/api/user", createUser);
    app.post("/api/register", register);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/logout", logout);
    app.post("/api/login", passport.authenticate('wam'), login);
    app.get("/api/user", findUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    passport.use('wam', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    // TODO
                    if(user && bcrypt.compareSync(password, user.password)) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                },
                function (error) {
                    done(error);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }
    
    // function facebookLogin(req, res) {
    //     res.send(200);
    // }

    function facebookLogin(token, refreshToken, profile, done) {
        userModel
            .findFacebookUser(profile.id)
            .then(
                function (facebookUser) {
                    if(facebookUser) {
                        return done(null, facebookUser);
                    } else {
                        facebookUser = {
                            username: profile.displayName.replace(/ /g, ''),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        userModel
                            .createUser(facebookUser)
                            .then(
                                function (user) {
                                    done(null, user);
                                },
                                function (error) {
                                    done(error, null);
                                }
                            )
                    }
                },
                function (error) {
                    done(error, null);
                }
            );
    }
    
    function loggedIn(req, res) {
        if(req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.json('0');
        }
    }
    
    function register(req, res) {
        var userObj = req.body;
        var username = userObj.username;
        var password = userObj.password;
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user) {
                        res.status(400).send("Username already in use");
                        return;
                    } else {
                        userObj.password = bcrypt.hashSync(password);
                        return userModel
                            .createUser(userObj);
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
            .then(
                function (user) {
                    if(user) {
                        req.login(user, function (err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    } else {
                        console.log("Error in register login");
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }
    
    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

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
            findUserByCredentials(username, password, req, res);
        } else if (username) {
            findUserByUsername(username, req, res);
        } else {
            res.json(users);
        }
    }

    function findUserByCredentials(username, password, req, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    console.log(req.session);
                    //noinspection JSAnnotator
                    req.session.currentUser = user;
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