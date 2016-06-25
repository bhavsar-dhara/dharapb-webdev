/**
 * Created by Dhara on 6/7/2016.
 */
module.exports = function () {
    
    var mongoose = require('mongoose');
    
    var EventSchema = mongoose.Schema({
        eventId: String,
        eventTitle: String,
        eventUrl: String,
        eventDesc: String,
        eventImgUrl: String,
        eventVenueAddr: String,
        eventVenueUrl: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.event"});
    
    return EventSchema;
};