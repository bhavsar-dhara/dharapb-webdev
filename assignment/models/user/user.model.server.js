/**
 * Created by Dhara on 6/7/2016.
 */
module.exports = function () {
    
    var mongoose = require('mongoose');
    
    var UserSchema = require('./user.schema.server')();
    var User = mongoose.model('User', UserSchema);
    
    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        // console.log("user.model.server.createUser()");
        // console.log(user);
        return User.create(user);
    }

    function findUserById(userId) {
        // return User.find({_id: userId});   // returns an array with one object
        return User.findById({_id: userId});
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function updateUser(userId, user) {
        // delete user._id;  // remove _id before updating the whole object
        return User
            .update({_id: userId}, {
                // $set: user   // won't work with older version of mongodb which could be on openshift server
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};