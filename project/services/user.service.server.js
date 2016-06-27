/**
 * Created by Dhara on 6/24/2016.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function (app, models) {

    var userModel = models.userModel;

    app.get("/project/auth/google", passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']}));
    app.get("/project/oauth2callback", passport.authenticate('google', {
        successRedirect: '/project/#/user',
        failureRedirect: '/project/#/login'
    }));
    app.get("/project/auth/twitter", passport.authenticate('twitter'));
    app.get("/project/auth/twitter/callback", passport.authenticate('twitter', {
        successRedirect: '/project/#/user',
        failureRedirect: '/project/#/login'
    }));
    app.post("/api/project/user", createUser);
    app.post("/api/project/register", register);
    app.get("/api/project/loggedIn", loggedIn);
    app.post("/api/project/logout", logout);
    app.post("/api/project/login", passport.authenticate('project'), login);
    app.get("/api/project/user", findUsers);
    app.get("/api/project/user/:userId", findUserById);
    app.put("/api/project/user/:userId", updateUser);
    app.delete("/api/project/user/:userId", deleteUser);

    passport.use('project', new LocalStrategy(localStrategy));
    var googleConfig = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    };
    passport.use('google', new GoogleStrategy(googleConfig, googleLogin));
    var twitterConfig = {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL
    };
    passport.use('twitter', new TwitterStrategy(twitterConfig, twitterLogin));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    // console.log("in local strategy");
                    // TODO
                    if (user && bcrypt.compareSync(password, user.password)) {
                        // console.log("in local strategy", user);
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (error) {
                    return done(error);
                }
            );
    }

    function serializeUser(user, done) {
        delete user.password;
        // console.log("serializeUSer = " + user);
        done(null, user);
    }

    function deserializeUser(user, done) {
        // console.log("deserializeUSer = " + user);
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    delete user.password;
                    // console.log("serializeUSer = " + user);
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }


    function googleLogin(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function (googleUser) {
                    if (googleUser) {
                        return done(null, googleUser);
                    } else {
                        googleUser = {
                            username: profile.displayName.replace(/ /g, ''),
                            google: {
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        userModel
                            .createUser(googleUser)
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


    function twitterLogin(token, refreshToken, profile, done) {
        userModel
            .findUserByTwitterId(profile.id)
            .then(
                function (twitterUser) {
                    if (twitterUser) {
                        return done(null, twitterUser);
                    } else {
                        twitterUser = {
                            username: profile.displayName.replace(/ /g, ''),
                            twitter: {
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        userModel
                            .createUser(twitterUser)
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
        // console.log("in logged = " + req.isAuthenticated());
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.json('0');
        }
    }

    function register(req, res) {
        var userObj = req.body;
        var username = userObj.username;
        var password = userObj.password;
        // console.log("in server reg");
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        res.status(400).send("Username already in use");
                    } else {
                        userObj.password = bcrypt.hashSync(password);
                        userModel
                            .createUser(userObj)
                            .then(
                                function (user) {
                                    // console.log("user = " + user);
                                    if (user) {
                                        req.login(user, function (err) {
                                            if (err) {
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
                },
                function (error) {
                    // console.log("error = " + error);
                    res.status(400).send(error);
                }
            );
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function login(req, res) {
        var user = req.user;
        delete user.password;
        // console.log("in login = " + user);
        res.json(user);
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(
                function (user) {
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