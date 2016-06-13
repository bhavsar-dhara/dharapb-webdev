/**
 * Created by Dhara on 6/11/2016.
 */
(function () {
    angular
        .module("wamDirectives", [])
        .directive("widgetsReorder", widgetsReorder);
    
    function widgetsReorder() {
        function widgetReorder(scope, element, attributes) {
            var startIndex = -1;
            var endIndex = -1;
            $(element)
                .find(".container")
                .sortable({
                    axis: "y",
                    handle: ".handle",
                    start: function (event, ui) {
                        startIndex = ui.item.index();
                    },
                    stop: function (event, ui) {
                        endIndex = ui.item.index();
                        // var reorderedElement = scope.model.widgets.splice(startIndex, 1)[0];
                        // scope.model.widgets.splice(endIndex, 0, reorderedElement);
                        // scope.$apply();
                        scope.reorderWidget({start: startIndex, end: endIndex});
                    }
                });
        }
        return {
            templateUrl: "./views/widget/widget-list-container.view.client.html",
            scope: {
                model: "=",
                reorderWidget: "&"
            },
            link: widgetReorder
        };
    }
    
})();