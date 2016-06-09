/**
 * Created by Dhara on 6/7/2016.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    
    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref:"User"},
        name: {type: String, required: true},
        description: String,
        // TODO : pages of type [Page] remaining to be added
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.website"});
    
    return WebsiteSchema;
};