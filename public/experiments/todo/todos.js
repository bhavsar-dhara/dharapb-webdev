/**
 * Created by Dhara on 6/9/2016.
 */
(function () {
    angular
        .module("MyDirectives", [])
        .directive("todos", todos);

    function todos() {
        function linker(scope, element, attributes) {
            var data = scope.data;
            var startIndex = -1;
            var endIndex = -1;
            $(element)
                .find("tbody")
                .sortable({
                    axis: "y",
                    start: function (event, ui) {
                        startIndex = ui.item.index();
                        // console.log("sorting started");
                        // console.log(event);
                        // console.log(ui.item.index());
                    },
                    stop: function (event, ui) {
                        endIndex = ui.item.index();
                        // console.log("sorting stopped");
                        // console.log(event);
                        // console.log(ui);
                        // console.log(ui.item.index());
                        // console.log([startIndex, stopIndex]);
                        scope.callback({start: startIndex, end: endIndex});
                        console.log(scope);
                        // var reorderedElement = scope.data.splice(startIndex, 1);
                        // console.log(reorderedElement);
                        // scope.data.splice(endIndex, 0, reorderedElement);
                        // scope.$apply();
                    }
                });
        }
        return {
            // template: "These are my todos"
            templateUrl: "todos.html",
            scope: {
                // data: "=task"
                data: "=",
                callback: "&"
            },
            link: linker
        };
    }

})();