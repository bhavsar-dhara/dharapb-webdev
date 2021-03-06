/**
 * Created by Dhara on 6/7/2016.
 */
module.exports = function () {
    
    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server.js')();
    var User = mongoose.model('User', UserSchema);
    
    var api = {
        findFacebookUser: findFacebookUser,
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;
    
    function findFacebookUser(id) {
        return User.findOne({"facebook.id": id});
    }

    // Creates a new user instance
    function createUser(user) {
        return User.create(user);
    }

    // Retrieves a user instance whose _id is equal to parameter userId
    function findUserById(userId) {
        return User.findById({_id: userId});
    }

    // Retrieves a user instance whose username and password are equal to parameters userId and password
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    // Retrieves a user instance whose username is equal to parameter username
    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    // Updates user instance whose _id is equal to parameter userId
    function updateUser(userId, user) {
        return User
            .update({_id: userId}, {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    websites: user.websites
                }
            });
    }

    // Removes user instance whose _id is equal to parameter userId
    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};