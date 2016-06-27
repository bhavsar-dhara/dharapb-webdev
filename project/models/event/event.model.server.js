/**
 * Created by Dhara on 6/7/2016.
 */
module.exports = function () {
    
    var mongoose = require('mongoose');
    var EventSchema = require('./event.schema.server.js')();
    var Event = mongoose.model('Event', EventSchema);
    
    var api = {
        createEvent: createEvent,
        findEventById: findEventById,
        findEventByEventId: findEventByEventId,
        updateEvent: updateEvent,
        deleteEvent: deleteEvent
    };
    return api;

    // Creates a new event instance
    function createEvent(event) {
        // console.log("in model");
        return Event.create(event);
    }

    // Retrieves a event instance whose _id is equal to parameter eventId
    function findEventById(eventId) {
        return Event.findById({_id: eventId});
    }

    function findEventByEventId(eventId) {
        return Event.findOne({eventId: eventId});
    }

    // Updates event instance whose _id is equal to parameter eventId
    function updateEvent(eventId, event) {
        return Event
            .update({_id: eventId}, {
                $set: {
                    comments: event.comments
                }
            });
    }

    // Removes event instance whose _id is equal to parameter eventId
    function deleteEvent(eventId) {
        return Event.remove({_id: eventId});
    }
};