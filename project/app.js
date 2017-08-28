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
        if (process.env.DATABASE_SERVICE_NAME) {
            var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
                mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
                mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
                mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
                mongoPassword = process.env[mongoServiceName + '_PASSWORD'],
                mongoUser = process.env[mongoServiceName + '_USER'];

            if (mongoHost && mongoPort && mongoDatabase) {
                connectionString = 'mongodb://';
                if (mongoUser && mongoPassword) {
                    connectionString += mongoUser + ':' + mongoPassword + '@';
                }
                // Provide UI label that excludes user id and pw
                connectionString += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

            }
        } else {
            connectionString = process.env.MONGO_URL;
        }
        mongoose.connect(connectionString);
    } else {
        // connect to local database
        mongoose.connect('mongodb://localhost/cs5610summer1');
    }
    
    var models = require("./models/models.server.js")();

    require("./services/user.service.server.js")(app, models);
    require("./services/event.service.server.js")(app, models);
};