/**
 * Created by Dhara on 6/21/2016.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var StatementSchema = require('../statement/statement.schema.server.js')();

    var ScriptSchema = mongoose.Schema({
        name: String,
        description: String,
        statements: [StatementSchema]
    }, {collection: "test.script"});

    return ScriptSchema;
};