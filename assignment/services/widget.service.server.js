/**
 * Created by Dhara on 5/31/2016.
 */
module.exports = function(app, models) {

    var widgetModel = models.widgetModel; 
        
    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];
    
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
        // console.log("server wgid = "+widget.type);
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
        // widget._id = (new Date()).getTime()+"";
        // widgets.pageId = pageId;
        // widgets.push(widget);
        // res.send(widget);
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
        // var resultSet = [];
        // for (var i in widgets) {
        //     if(widgets[i].pageId === pageId && (widgets[i].text != null || widgets[i].url != null)) {
        //         resultSet.push(widgets[i]);
        //     }
        // }
        // res.send(resultSet);
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
        // for (var i in widgets) {
        //     if(widgets[i]._id === widgetId) {
        //         res.send(widgets[i]);
        //         return;
        //     }
        // }
        // res.status(404).send("Unable to find widget with id : " + widgetId);
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
        // for (var i in widgets) {
        //     if(widgets[i]._id === widgetId) {
        //         if (widget.widgetType === "HEADER") {
        //             widgets[i].name = widget.name;
        //             widgets[i].text = widget.text;
        //             widgets[i].size = widget.size;
        //         } else if (widget.widgetType === "IMAGE") {
        //             widgets[i].name = widget.name;
        //             widgets[i].text = widget.text;
        //             widgets[i].url = widget.url;
        //             widgets[i].width = widget.width;
        //             widgets[i].fileName = widget.fileName;
        //         } else if (widget.widgetType === "YOUTUBE") {
        //             widgets[i].name = widget.name;
        //             widgets[i].text = widget.text;
        //             widgets[i].url = widget.url;
        //             widgets[i].width = widget.width;
        //         } else {
        //             widgets[i].name = widget.name;
        //             widgets[i].text = widget.text;
        //         }
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
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
        // for (var i in widgets) {
        //     if(widgets[i]._id === widgetId) {
        //         widgets.splice(i, 1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
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