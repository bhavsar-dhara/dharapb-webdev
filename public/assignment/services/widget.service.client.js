/**
 * Created by Dhara on 5/26/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    
    function WidgetService($http) {
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