/**
 * Created by Dhara on 5/31/2016.
 */
module.exports = function(app, models) {

    var pageModel = models.pageModel;

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        pageModel
            .createPage(websiteId, page)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
        // page._id = (new Date()).getTime()+"";
        // page.websiteId = websiteId;
        // pages.push(page);
        // res.send(page);
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
        // var resultSet = [];
        // for (var i in pages) {
        //     if(pages[i].websiteId === websiteId) {
        //         resultSet.push(pages[i]);
        //     }
        // }
        // res.send(resultSet);
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
        // for (var i in pages) {
        //     if(pages[i]._id === pageId) {
        //         res.send(pages[i]);
        //         return;
        //     }
        // }
        // res.send(400);
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        pageModel
            .updatePage(pageId, page)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
        // for (var i in pages) {
        //     if(pages[i]._id === pageId) {
        //         pages[i].name = page.name;
        //         pages[i].title = page.title;
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
        // for (var i in pages) {
        //     if(pages[i]._id === pageId) {
        //         pages.splice(i, 1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }
};