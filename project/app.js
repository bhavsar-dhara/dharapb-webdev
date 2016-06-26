/**
 * Created by Dhara on 6/19/2016.
 */
module.exports = function (app) {

    var mongoose = require("mongoose");

    // create a default connection string
    var connectionString = 'mongodb://127.0.0.1:27017/cs5610summer1';

    // use remote connection string
    // if running in remote server
    if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
        // connect to the database -- on OPENSHIFT
        mongoose.connect(connectionString);
    } else {
        // connect to local database
        mongoose.connect('mongodb://localhost/cs5610summer1');
    }
    
    var models = require("./models/models.server.js")();

    require("./services/user.service.server.js")(app, models);
    require("./services/event.service.server.js")(app, models);
};