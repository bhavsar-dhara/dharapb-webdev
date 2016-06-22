/**
 * Created by Dhara on 6/21/2016.
 */
module.exports = function () {

    var mongoose = require('mongoose');

    var ScriptSchema = mongoose.Schema({
        name: String,
        description: String
    }, {collection: "test.script"});

    return ScriptSchema;
};