/**
 * Created by Dhara on 6/7/2016.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/cs5610summer1');

    var models = {
        userModel: require("./user/user.model.server.js")()
    //     TODO add other models: website, page and widgets
    };
    return models;
};