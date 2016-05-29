/**
 * Created by Dhara on 5/26/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];
    
    function WidgetService() {
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            widgets.pageId = pageId;
            widgets.push(widget);
            return widget;
        }

        function findWidgetsByPageId(pageId) {
            var resultSet = [];
            for (var i in widgets) {
                if(widgets[i].pageId === pageId && (widgets[i].text != null || widgets[i].url != null)) {
                    resultSet.push(widgets[i]);
                }
            }
            return resultSet;
        }

        function findWidgetById(widgetId) {
            for (var i in widgets) {
                if(widgets[i]._id === widgetId) {
                    return widgets[i];
                }
            }
        }

        function updateWidget(widgetId, widget) {
            for (var i in widgets) {
                if(widgets[i]._id === widgetId) {
                    if (widget.widgetType === "HEADER") {
                        widgets[i].name = widget.name;
                        widgets[i].text = widget.text;
                        widgets[i].size = widget.size;
                    } else if (widget.widgetType === "IMAGE") {
                        widgets[i].name = widget.name;
                        widgets[i].text = widget.text;
                        widgets[i].url = widget.url;
                        widgets[i].width = widget.width;
                        widgets[i].fileName = widget.fileName;
                    } else if (widget.widgetType === "YOUTUBE") {
                        widgets[i].name = widget.name;
                        widgets[i].text = widget.text;
                        widgets[i].url = widget.url;
                        widgets[i].width = widget.width;
                    } else {
                        widgets[i].name = widget.name;
                        widgets[i].text = widget.text;
                    }
                    return true;
                }
            }
            return false;
        }

        function deleteWidget(widgetId) {
            for (var i in widgets) {
                if(widgets[i]._id === widgetId) {
                    widgets.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();