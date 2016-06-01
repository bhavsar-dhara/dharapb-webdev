/**
 * Created by Dhara on 5/31/2016.
 */
module.exports = function(app) {

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

    function createPage(websiteId, page) {
        page.websiteId = websiteId;
        pages.push(page);
        return page;
    }

    function findAllPagesForWebsite(websiteId) {
        var resultSet = [];
        for (var i in pages) {
            if(pages[i].websiteId === websiteId) {
                resultSet.push(pages[i]);
            }
        }
        return resultSet;
    }

    function findPageById(pageId) {
        for (var i in pages) {
            if(pages[i]._id === pageId) {
                return pages[i];
            }
        }
        return null;
    }

    function updatePage(pageId, page) {
        for (var i in pages) {
            if(pages[i]._id === pageId) {
                pages[i].name = page.name;
                pages[i].title = page.title;
                return true;
            }
        }
        return false;
    }

    function deletePage(pageId) {
        for (var i in pages) {
            if(pages[i]._id === pageId) {
                pages.splice(i, 1);
                return true;
            }
        }
        return false;
    }
};