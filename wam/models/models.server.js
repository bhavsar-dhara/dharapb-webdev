/**
 * Created by Dhara on 6/21/2016.
 */
module.exports = function () {
    var models = {
        scriptModel: require('./script/script.model.server.js')()
    };
    
    return models;
};