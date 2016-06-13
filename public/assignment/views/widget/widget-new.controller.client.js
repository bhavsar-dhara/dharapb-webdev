/**
 * Created by Dhara on 5/26/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.createHeader = createHeader;
        vm.createImage = createImage;
        vm.createYouTube = createYouTube;
        vm.createHtml = createHtml;
        vm.createText = createText;

        function createHeader() {
            createWidget("HEADER");
        }

        function createImage() {
            createWidget("IMAGE");
        }

        function createYouTube() {
            createWidget("YOUTUBE");
        }

        // adding to test ng-switch-default in widget-edit.view.client.html
        function createHtml() {
            createWidget("HTML");
        }

        function createText() {
            createWidget("TEXT");
        }

        function createWidget(widgetType) {
            vm.widget = {
                type: widgetType
            };
            WidgetService
                .createWidget(vm.pageId, vm.widget)
                .then(function (response) {
                    var newWidget = response.data;
                    if (newWidget) {
                        $location.url("/user/" + vm.uid + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
                    } else {
                        vm.error = "Unable to create website";
                    }
                });
        }
    }
})();