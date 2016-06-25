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
        updateEvent: updateEvent,
        deleteEvent: deleteEvent
    };
    return api;

    // Creates a new event instance
    function createEvent(event) {
        return Event.create(event);
    }

    // Retrieves a event instance whose _id is equal to parameter eventId
    function findEventById(eventId) {
        return Event.findById({_id: eventId});
    }

    // Updates event instance whose _id is equal to parameter eventId
    function updateEvent(eventId, event) {
        return Event
            .update({_id: eventId}, {
                $set: {
                    firstName: event.firstName,
                    lastName: event.lastName,
                    email: event.email,
                    phone: event.phone,
                    websites: event.websites
                }
            });
    }

    // Removes event instance whose _id is equal to parameter eventId
    function deleteEvent(eventId) {
        return Event.remove({_id: eventId});
    }
};