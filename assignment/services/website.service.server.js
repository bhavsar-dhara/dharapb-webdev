/**
 * Created by Dhara on 5/31/2016.
 */
module.exports = function(app, models) {

    var websiteModel = models.websiteModel;
    var userModel = models.userModel;

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;
        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    websiteModel
                        .createWebsite(userId, website)
                        .then(
                            function (website) {
                                user['websites'].push(website);
                                userModel
                                    .updateUser(userId, user)
                                    .then(
                                        function (stats) {
                                            res.json(website);
                                        }, function (error) {
                                            res.statusCode(400).send(error);
                                        }
                                    );
                            }, function (error) {
                                res.statusCode(400).send(error);
                            }
                        );
                }, function (error) {
                    res.statusCode(404).send(error);
                }
            );
        // websiteModel
        //     .createWebsite(userId, website)
        //     .then(
        //         function (website) {
        //             res.json(website);
        //         },
        //         function (error) {
        //             res.statusCode(400).send(error);
        //         }
        //     );
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    res.json(website);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;
        userModel
            .findUserById(website._user)
            .then(
                function (user) {
                    websiteModel
                        .updateWebsite(websiteId, website)
                        .then(
                            function (stats) {
                                console.log(user);
                                // var userStr = JSON.stringify(user);
                                // console.log(typeof userStr);
                                // var userJsonObj = JSON.parse(userStr);
                                // var userWebsites = userJsonObj.getJSONArray("websites");
                                // console.log(typeof userWebsites);
                                // var userWebsites = [];
                                // userWebsites = user.websites;
                                // for (var i=0; i<userWebsites.length; i++) {
                                //     console.log(typeof userWebsites);
                                //     console.log(userWebsites[i]._id);
                                //     console.log(website._id);
                                //     if (userWebsites[i]._id == websiteId) {
                                //         userWebsites.splice(i, 1);
                                //         userWebsites.splice(i, 0, website);
                                //         return;
                                //     }
                                // }
                                for (var i=0; i<user.websites.length; i++) {
                                    // console.log(user.websites[i]._id);
                                    // console.log(websiteId);
                                    if (user.websites[i] != undefined) {
                                        if (user.websites[i]._id == websiteId) {
                                            delete user.websites[i];
                                            user.websites[i] = website;
                                            // user.websites.splice(i, 1);
                                            // user.websites.splice(i, 0, website);
                                            break;
                                        }
                                    }
                                }
                                console.log(user);
                                userModel
                                    .updateUser(website._user, user)
                                    .then(
                                        function (stats) {
                                            res.json(website);
                                        }, function (error) {
                                            res.statusCode(400).send(error);
                                        }
                                    );
                            }, function (error) {
                                res.statusCode(404).send(error);
                            }
                        );
                }, function (error) {
                    res.statusCode(404).send(error);
                }
            );
        // websiteModel
        //     .updateWebsite(websiteId, website)
        //     .then(
        //         function (stats) {
        //             res.send(stats);
        //         },
        //         function (error) {
        //             res.statusCode(400).send(error);
        //         }
        //     );
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    userModel
                        .findUserById(website._user)
                        .then(
                            function (user) {
                                websiteModel
                                    .deleteWebsite(websiteId)
                                    .then(
                                        function (stats) {
                                            for (var i=0; i<user.websites.length; i++) {
                                                if (user.websites[i] != undefined) {
                                                    if (user.websites[i]._id == websiteId) {
                                                        delete user.websites[i];
                                                        // user.websites[i] = website;
                                                        break;
                                                    }
                                                }
                                            }
                                            userModel
                                                .updateUser(website._user, user)
                                                .then(
                                                    function (stats) {
                                                        res.json(website);
                                                    }, function (error) {
                                                        res.statusCode(400).send(error);
                                                    }
                                                );
                                        }, function (error) {
                                            res.statusCode(404).send(error);
                                        }
                                    );
                            }, function (error) {
                                res.statusCode(404).send(error);
                            }
                        );
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
        // websiteModel
        //     .deleteWebsite(websiteId)
        //     .then(
        //         function (website) {
        //             res.json(website);
        //         },
        //         function (error) {
        //             res.statusCode(400).send(error);
        //         }
        //     );
    }
};