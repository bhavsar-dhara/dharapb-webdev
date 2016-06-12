/**
 * Created by Dhara on 6/7/2016.
 */
module.exports = function () {
    
    var mongoose = require('mongoose');
    
    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.ObjectId, ref:"Page"},
        type: {type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        // rows: Number,
        // size: Number,
        rows: parseInt(Number),
        size: parseInt(Number),
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.widget"});
    
    return WidgetSchema;
};