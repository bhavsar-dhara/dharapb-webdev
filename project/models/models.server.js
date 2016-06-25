/**
 * Created by Dhara on 6/19/2016.
 */
module.exports = function () {

    var models = {
        userModel: require("./user/user.model.server.js")(),
        eventModel: require("./event/event.model.server.js")()
    };
    return models;
};