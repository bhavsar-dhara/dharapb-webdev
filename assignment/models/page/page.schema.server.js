/**
 * Created by Dhara on 6/7/2016.
 */
module.exports = function () {
    
    var mongoose = require('mongoose');
    
    var PageSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        dob: Date,
        // TODO : widgets of type [Widget] remaining to be added
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.page"});
    
    return PageSchema;
};