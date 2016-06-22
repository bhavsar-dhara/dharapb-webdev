/**
 * Created by Dhara on 6/21/2016.
 */
module.exports = function (app) {
    var models = require('./models/models.server.js')();
    
    require('./controllers/script.controllers.server.js')(app, models);
};