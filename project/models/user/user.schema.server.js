/**
 * Created by Dhara on 6/7/2016.
 */
module.exports = function () {
    
    var mongoose = require('mongoose');
    
    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        dob: Date,
        email: String,
        phone: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});
    
    return UserSchema;
};