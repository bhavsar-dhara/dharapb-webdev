/**
 * Created by Dhara on 6/7/2016.
 */
module.exports = function () {
    
    var mongoose = require('mongoose');
    
    var WidgetSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        dob: Date,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.widget"});
    
    return WidgetSchema;
};