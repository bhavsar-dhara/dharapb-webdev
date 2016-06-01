/**
 * Created by Dhara on 5/31/2016.
 */
module.exports = function(app) {

    var websites = [
        { "_id": "123", "name": "Facebook", "developerId": "456" },
        { "_id": "234", "name": "Tweeter", "developerId": "456" },
        { "_id": "456", "name": "Gizmodo", "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers", "developerId": "123" },
        { "_id": "789", "name": "Chess", "developerId": "234" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(userId, website) {
        website.developerId = userId;
        websites.push(website);
        return website;
    }

    function findAllWebsitesForUser(userId) {
        var resultSet = [];
        for (var i in websites) {
            if(websites[i].developerId === userId) {
                resultSet.push(websites[i]);
            }
        }
        return resultSet;
    }

    function findWebsiteById(websiteId) {
        for (var i in websites) {
            if(websites[i]._id === websiteId) {
                return websites[i];
            }
        }
        return null;
    }

    function updateWebsite(websiteId, website) {
        for (var i in websites) {
            if(websites[i]._id === websiteId) {
                websites[i].name = website.name;
                websites[i].description = website.description;
                return true;
            }
        }
        return false;
    }

    function deleteWebsite(websiteId) {
        for (var i in websites) {
            if(websites[i]._id === websiteId) {
                websites.splice(i, 1);
                return true;
            }
        }
        return false;
    }
};