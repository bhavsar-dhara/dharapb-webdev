/**
 * Created by Dhara on 5/31/2016.
 */
module.exports = function(app, models) {

    var widgetModel = models.widgetModel;
    // var pageModel = models.pageModel;
    // var websiteModel = models.websiteModel;
    // var userModel = models.userModel;
    // var userObj = undefined;
    // var websiteObj = undefined;
    // var pageObj = undefined;
    // var websiteIdObj = undefined;
    // var widgetObj = undefined;
    
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pageId/widget", reorderWidget);

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        // pageModel
        //     .findPageById(pageId)
        //     .then(
        //         function (page) {
        //             pageObj = page;
        //             return widgetModel
        //                 .createWidget(pageId, widget);
        //         }, function (error) {
        //             res.statusCode(404).send(error);
        //         }
        //     )
        //     .then(
        //         function (widget) {
        //             widgetObj = widget;
        //             pageObj['widgets'].push(widget);
        //             return pageModel
        //                 .updatePage(widget._page, pageObj);
        //         }, function (error) {
        //             res.statusCode(400).send(error);
        //         }
        //     )
        //     .then(
        //         function (stats) {
        //             return  websiteModel
        //                 .findWebsiteById(pageObj._website);
        //         }, function (error) {
        //             res.statusCode(400).send(error);
        //         }
        //     )
        //     .then(
        //         function (website) {
        //             websiteObj = website;
        //             websiteObj['pages'].push(pageObj);
        //             return websiteModel
        //                 .updateWebsite(pageObj._website, websiteObj);
        //         }, function (error) {
        //             res.statusCode(404).send(error);
        //         }
        //     )
        //     .then(
        //         function (stats) {
        //             return userModel
        //                 .findUserById(websiteObj._user);
        //         }, function (error) {
        //             res.statusCode(400).send(error);
        //         }
        //     )
        //     .then(
        //         function (user) {
        //             for (var i = 0; i < user.websites.length; i++) {
        //                 if (user.websites[i] != undefined) {
        //                     if (user.websites[i]._id == pageObj._website) {
        //                         delete user.websites[i];
        //                         user.websites[i] = websiteObj;
        //                         break;
        //                     }
        //                 }
        //             }
        //             userObj = user;
        //             return userModel
        //                 .updateUser(websiteObj._user, userObj);
        //         }, function (error) {
        //             res.statusCode(404).send(error);
        //         }
        //     )
        //     .then(
        //         function (stats) {
        //             res.json(widget);
        //         }, function (error) {
        //             res.statusCode(400).send(error);
        //         }
        //     );
        widgetModel
            .createWidget(pageId, widget)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.json(widgets);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .deleteWidget(widgetId)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function uploadImage(req, res) {

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        if (myFile != null) {
            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename;     // new file name in upload folder
            var path = myFile.path;         // full path of uploaded file
            var destination = myFile.destination;  // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;

            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets[i].url = "/uploads/" + filename;
                }
            }
        }

        res.redirect("/assignment/#/user/"+ userId +"/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
    }
    
    function reorderWidget(req, res) {
        var pageId = req.params.pageId;
        var start = parseInt(req.query.start);
        var end = parseInt(req.query.end);
        widgetModel
            .reorderWidget(pageId, start, end)
            .then(
                function () {
                    res.status(200).send("Success reordering");
                }, function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }
};