/**
 * Created by Dhara on 6/7/2016.
 */
module.exports = function () {
    
    var mongoose = require('mongoose');
    
    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.ObjectId, ref:"Website"},
        name: {type: String, required: true},
        description: String,
        // TODO : widgets of type [Widget] remaining to be added
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.page"});
    
    return PageSchema;
};