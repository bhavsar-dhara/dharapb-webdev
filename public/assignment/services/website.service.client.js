/**
 * Created by Dhara on 5/26/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            website.developerId = userId;
            websites.push(website);
            return website;
        }

        function findWebsitesByUser(userId) {
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
    }
})();