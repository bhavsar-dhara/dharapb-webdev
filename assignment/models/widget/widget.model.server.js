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
        // var widgets = Widget.find({_page: pageId});
        // var priority = widgets.length;
        // console.log("priority = " + priority);
        // widget.priority = priority;
        // return Widget.create(widget);
        return Widget
            .find({_page: pageId})
            .then(
                function (widgets) {
                    var priority = widgets.length;
                    // console.log("priority = " + priority);
                    widget.priority = priority;
                    return Widget.create(widget);
                });
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
        } else if (widget.type === "TEXT") {
            // console.log("inside TEXT update id = " + widgetId);
            // console.log(widget.text + " " + widget.rows + " " + widget.placeholder + " " + widget.formatted);
            return Widget
                .update({_id: widgetId}, {
                    $set: {
                        text: widget.text,
                        rows: widget.rows,
                        placeholder: widget.placeholder,
                        formatted: widget.formatted
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

    //    Modifies the order of widget at position start into final position end in page whose _id is pageId
    function reorderWidget(pageId, start, end) {
        // console.log("inside reorder " + pageId);
        // console.log("inside reorder " + start);
        // console.log("inside reorder " + end);
        return Widget
            .find({_page: pageId})
            .then(function (widgets) {
                widgets.forEach(function (widget) {
                    // console.log(widget.priority);
                    if (start > end) {
                        if (widget.priority >= end && widget.priority < start) {
                            widget.priority++;
                            widget.save(function () {

                            });
                        } else if (widget.priority === start) {
                            widget.priority = end;
                            widget.save(function () {

                            });
                        }
                    } else {
                        if (widget.priority > start && widget.priority <= end) {
                            widget.priority--;
                            widget.save(function () {

                            });
                        } else if (widget.priority === start) {
                            widget.priority = end;
                            widget.save(function () {

                            });
                        }
                    }
                });
            });
    }
};