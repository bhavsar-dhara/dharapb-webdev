/**
 * Created by Dhara on 6/7/2016.
 */
module.exports = function () {
    
    var mongoose = require('mongoose');
    var WebsiteSchema = require('./website.schema.server.js')();
    var Website = mongoose.model('Website', WebsiteSchema);
    
    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    function createWebsite(user) {
        return Website.create(user);
    }

    function findAllWebsitesForUser(userId) {
        return Website.findById({_user: userId});
    }

    function findWebsiteById(username, password) {
        return Website.findOne({username: username, password: password});
    }

    function updateWebsite(userId, user) {
        return Website
            .update({_id: userId}, {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
    }

    function deleteWebsite(userId) {
        return Website.remove({_id: userId});
    }
};