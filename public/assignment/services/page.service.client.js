/**
 * Created by Dhara on 5/26/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    
    function PageService($http) {
        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.push(page);
            return page;
        }

        function findPageByWebsiteId(websiteId) {
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
    }
})();