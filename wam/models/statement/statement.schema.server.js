/**
 * Created by Dhara on 6/21/2016.
 */
module.exports = function () {

    var mongoose = require('mongoose');

    var StatementSchema = mongoose.Schema({
        name: String,
        type: {type: String, enum: ['NUMBER', 'STRING', 'DATE']},
        output: String,
        input: String,
        operation: String,
        parameters:[String]
    });

    return StatementSchema;
};