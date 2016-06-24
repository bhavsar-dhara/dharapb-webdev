/**
 * Created by Dhara on 6/19/2016.
 */
module.exports = function (app) {
    require("services/user.services.server.js")(app);
    require("services/event.services.server.js")(app);
};