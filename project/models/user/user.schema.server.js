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
        google: {
            token: String,
            id: String,
            displayName: String,
            name: String,
            gender: String,
            email: String
        },
        twitter: {
            token: String,
            id: String,
            twitterHandle: String,
            name: String,
            gender: String,
            email: String
        },
        roles: String,
        invites: [{
            _eid: String,
            _user: String,
            eventUrl: String,
            eventTitle: String
        }],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});
    
    return UserSchema;
};