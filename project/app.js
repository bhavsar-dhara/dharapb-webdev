/**
 * Created by Dhara on 6/19/2016.
 */
module.exports = function (app) {
    require("./services/user.service.server.js")(app);
    require("./services/event.service.server.js")(app);
};