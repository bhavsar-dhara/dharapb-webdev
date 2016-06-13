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

    // Creates a new website instance for user whose _id is userId
    function createWebsite(userId, website) {
        website._user = userId;
        return Website.create(website);
    }

    // Retrieves all website instances for user whose  _id is userId
    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId});
    }

    // Retrieves single website instance whose _id is websiteId
    function findWebsiteById(websiteId) {
        return Website.findById({_id: websiteId});
    }

    // Updates website instance whose _id is websiteId
    function updateWebsite(websiteId, website) {
        return Website
            .update({_id: websiteId}, {
                $set: {
                    name: website.name,
                    description: website.description
                }
            });
    }

    // Removes website instance whose _id is websiteId
    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }
};