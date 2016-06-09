/**
 * Created by Dhara on 6/7/2016.
 */
module.exports = function () {
    
    var mongoose = require('mongoose');
    var WidgetSchema = require('./widget.schema.server.js')();
    var Widget = mongoose.model('Widget', WidgetSchema);
    
    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget
    };
    return api;

    function createWidget(user) {
        return Widget.create(user);
    }

    function findAllWidgetsForPage(userId) {
        return Widget.findById({_id: userId});
    }

    function findWidgetById(username, password) {
        return Widget.findOne({username: username, password: password});
    }

    function updateWidget(userId, user) {
        return Widget
            .update({_id: userId}, {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
    }

    function deleteWidget(userId) {
        return Widget.remove({_id: userId});
    }
};