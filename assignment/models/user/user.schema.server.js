/**
 * Created by Dhara on 6/7/2016.
 */
module.exports = function () {
    
    var mongoose = require('mongoose');
    var WebsiteSchema = require("./website.schema.server.js")(mongoose);
    
    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        dob: Date,
        email: String,
        phone: String,
        websites: [WebsiteSchema],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.user"});
    
    return UserSchema;
};