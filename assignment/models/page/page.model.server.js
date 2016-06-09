/**
 * Created by Dhara on 6/7/2016.
 */
module.exports = function () {
    
    var mongoose = require('mongoose');
    var PageSchema = require('./page.schema.server.js')();
    var Page = mongoose.model('Page', PageSchema);
    
    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;

    function createPage(user) {
        return Page.create(user);
    }

    function findAllPagesForWebsite(userId) {
        return Page.findById({_id: userId});
    }

    function findPageById(username, password) {
        return Page.findOne({username: username, password: password});
    }

    function updatePage(userId, user) {
        return Page
            .update({_id: userId}, {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
    }

    function deletePage(userId) {
        return Page.remove({_id: userId});
    }
};