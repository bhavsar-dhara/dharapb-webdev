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
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };
    return api;

    function createWidget(pageId, widget) {
        // console.log("model wgid = "+widget.type);
        widget._page = pageId;
        return Widget.create(widget);
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById({_id: widgetId});
    }

    function updateWidget(widgetId, widget) {
        // widget.size = parseInt(widget.size);
        if (widget.type === "HEADER") {
            return Widget
                .update({_id: widgetId}, {
                    $set: {
                        name: widget.name,
                        text: widget.text,
                        size: widget.size
                    }
                });
        } else if (widget.type === "IMAGE") {
            return Widget
                .update({_id: widgetId}, {
                    $set: {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width,
                        fileName: widget.fileName
                    }
                });
        } else if (widget.type === "YOUTUBE") {
            return Widget
                .update({_id: widgetId}, {
                    $set: {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width
                    }
                });
        } else {
            return Widget
                .update({_id: widgetId}, {
                    $set: {
                        name: widget.name,
                        text: widget.text
                    }
                });
        }
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }
    
    function reorderWidget(pageId, start, end) {
    //    TODO: Modifies the order of widget at position start into final position end in page whose _id is pageId
    }
};