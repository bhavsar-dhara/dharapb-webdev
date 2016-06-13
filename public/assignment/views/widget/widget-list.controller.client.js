/**
 * Created by Dhara on 5/26/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);
    
    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.reorderWidget = reorderWidget;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function (response) {
                    vm.widgets = response.data;
                });
        }
        init();

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            if(widget.url != null) {
                var urlParts = widget.url.split("/");
                var id = urlParts[urlParts.length - 1];
                var url = "https://www.youtube.com/embed/" + id;
                return $sce.trustAsResourceUrl(url);
            }
        }
        
        function reorderWidget(start, end) {
            WidgetService
                .reorderWidget(start, end, vm.pageId)
                .then(
                    function () {
                        init()
                    },
                    function (error) {
                        vm.error = error;
                    }
                );
        }
    }
})();