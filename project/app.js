/**
 * Created by Dhara on 6/19/2016.
 */
module.exports = function (app) {
    
    var models = require("./models/models.server.js")();

    require("./services/user.service.server.js")(app, models);
    require("./services/event.service.server.js")(app, models);
};