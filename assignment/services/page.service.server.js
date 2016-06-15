/**
 * Created by Dhara on 5/31/2016.
 */
module.exports = function (app, models) {

    var pageModel = models.pageModel;
    var websiteModel = models.websiteModel;
    var userModel = models.userModel;
    var userObj = undefined;
    var websiteObj = undefined;
    var pageObj = undefined;
    var websiteIdObj = undefined;

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    websiteObj = website;
                    return pageModel
                        .createPage(websiteId, page);
                }, function (error) {
                    res.statusCode(404).send(error);
                }
            )
            .then(
                function (page) {
                    websiteObj['pages'].push(page);
                    return websiteModel
                        .updateWebsite(websiteId, websiteObj);
                }, function (error) {
                    res.statusCode(400).send(error);
                }
            )
            .then(
                function (stats) {
                    return userModel
                        .findUserById(websiteObj._user);
                }, function (error) {
                    res.statusCode(400).send(error);
                }
            )
            .then(
                function (user) {
                    for (var i = 0; i < user.websites.length; i++) {
                        if (user.websites[i] != undefined) {
                            if (user.websites[i]._id == page._website) {
                                delete user.websites[i];
                                user.websites[i] = websiteObj;
                                break;
                            }
                        }
                    }
                    userObj = user;
                    return userModel
                        .updateUser(websiteObj._user, userObj);
                }, function (error) {
                    res.statusCode(404).send(error);
                }
            )
            .then(
                function (stats) {
                    res.json(page);
                }, function (error) {
                    res.statusCode(400).send(error);
                }
            );
        // pageModel
        //     .createPage(websiteId, page)
        //     .then(
        //         function (page) {
        //             res.json(page);
        //         },
        //         function (error) {
        //             res.statusCode(400).send(error);
        //         }
        //     );
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        websiteModel
            .findWebsiteById(page._website)
            .then(
                function (website) {
                    websiteObj = website;
                    return pageModel
                        .updatePage(pageId, page);
                }, function (error) {
                    res.statusCode(404).send(error);
                }
            )
            .then(
                function (stats) {
                    for (var i = 0; i < websiteObj.pages.length; i++) {
                        if (websiteObj.pages[i] != undefined) {
                            if (websiteObj.pages[i]._id == pageId) {
                                delete websiteObj.pages[i];
                                websiteObj.pages[i] = page;
                                break;
                            }
                        }
                    }
                    return websiteModel
                        .updateWebsite(page._website, websiteObj);
                }, function (error) {
                    res.statusCode(404).send(error);
                }
            )
            .then(
                function (stats) {
                    return userModel
                        .findUserById(websiteObj._user);
                }, function (error) {
                    res.statusCode(400).send(error);
                }
            )
            .then(
                function (user) {
                    for (var i = 0; i < user.websites.length; i++) {
                        if (user.websites[i] != undefined) {
                            if (user.websites[i]._id == page._website) {
                                delete user.websites[i];
                                user.websites[i] = websiteObj;
                                break;
                            }
                        }
                    }
                    userObj = user;
                    return userModel
                        .updateUser(websiteObj._user, userObj);
                }, function (error) {
                    res.statusCode(404).send(error);
                }
            )
            .then(
                function (stats) {
                    res.send(stats);
                }, function (error) {
                    res.statusCode(400).send(error);
                }
            );
        // pageModel
        //     .updatePage(pageId, page)
        //     .then(
        //         function (stats) {
        //             res.send(stats);
        //         },
        //         function (error) {
        //             res.statusCode(400).send(error);
        //         }
        //     );
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    pageObj = page;
                    websiteIdObj = page._website;
                    return websiteModel
                        .findWebsiteById(websiteIdObj);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
            .then(
                function (website) {
                    websiteObj = website;
                    return pageModel
                        .deletePage(pageId);
                }, function (error) {
                    res.statusCode(404).send(error);
                }
            )
            .then(
                function (stats) {
                    // console.log("websiteObj before update  ==>  " + websiteObj);
                    for (var i = 0; i < websiteObj.pages.length; i++) {
                        if (websiteObj.pages[i] != undefined) {
                            if (websiteObj.pages[i]._id == pageId) {
                                delete websiteObj.pages[i];
                                break;
                            }
                        }
                    }
                    return websiteModel
                        .updateWebsite(pageObj._website, websiteObj);
                }, function (error) {
                    res.statusCode(404).send(error);
                }
            )
            .then(
                function (stats) {
                    return userModel
                        .findUserById(websiteObj._user);
                }, function (error) {
                    res.statusCode(400).send(error);
                }
            )
            .then(
                function (user) {
                    for (var i = 0; i < user.websites.length; i++) {
                        if (user.websites[i] != undefined) {
                            // TODO comparison not working as expected
                            if (user.websites[i]._id == websiteIdObj) {
                                delete user.websites[i];
                                user.websites[i] = websiteObj;
                                break;
                            } else {
                                console.log("NOT EQUAL");
                            }
                        }
                    }
                    userObj = user;
                    return userModel
                        .updateUser(websiteObj._user, userObj);
                    // function (user) {
                    //     console.log("websiteObj after update  ==>  " + websiteObj);
                    //     for (var i = 0; i < user.websites.length; i++) {
                    //         if (user.websites[i] != undefined) {
                    //             console.log(typeof user.websites[i]._id);
                    //             console.log(user.websites[i]._id);
                    //             console.log(typeof websiteIdObj);
                    //             console.log(pageObj._website);
                    //             if (user.websites[i]._id == pageObj._website) {
                    //                 // console.log("user.websites[i] before update  ==>  " + user.websites[i]);
                    //                 delete user.websites[i];
                    //                 user.websites[i] = websiteObj;
                    //                 // console.log("user.websites[i] after update  ==>  " + user.websites[i]);
                    //                 break;
                    //             } else {
                    //                 console.log(pageObj._website);
                    //             }
                    //         }
                    //     }
                    //     userObj = user;
                    //     return userModel
                    //         .updateUser(websiteObj._user, userObj);
                }, function (error) {
                    res.statusCode(404).send(error);
                }
            )
            .then(
                function (stats) {
                    res.send(stats);
                }, function (error) {
                    res.statusCode(400).send(error);
                }
            );
        // pageModel
        //     .deletePage(pageId)
        //     .then(
        //         function (page) {
        //             res.json(page);
        //         },
        //         function (error) {
        //             res.statusCode(400).send(error);
        //         }
        //     );
    }
};