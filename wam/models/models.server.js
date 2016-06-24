/**
 * Created by Dhara on 6/21/2016.
 */
module.exports = function () {
    // var models = {
    //     scriptModel: require('./script/script.model.server.js')()
    // };

    var models = {};
    
    models.scriptModel = require('./script/script.model.server.js')();
    models.statementModel = require('./statement/statement.model.server.js')(models);
    
    return models;
};