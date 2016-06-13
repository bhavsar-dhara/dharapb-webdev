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
        vm.isEmptyName = false;
        vm.youTubeForm = undefined;
        vm.textForm = undefined;
        vm.imageForm = undefined;
        vm.htmlForm = undefined;
        vm.headerForm = undefined;

        function createHeader() {
            // vm.isEmptyName = vm.headerForm.name.$error.required;
            createWidget("HEADER");
        }

        function createImage() {
            // vm.isEmptyName = vm.imageForm.name.$error.required;
            createWidget("IMAGE");
        }

        function createYouTube() {
            // vm.isEmptyName = vm.youTubeForm.name.$error.required;
            createWidget("YOUTUBE");
        }

        // adding to test ng-switch-default in widget-edit.view.client.html
        function createHtml() {
            // vm.isEmptyName = vm.htmlForm.name.$error.required;
            createWidget("HTML");
        }

        function createText() {
            // vm.isEmptyName = vm.textForm.name.$error.required;
            createWidget("TEXT");
        }

        function createWidget(widgetType) {
            // if(!vm.isEmptyName) {
                vm.widget = {
                    // _id: (new Date()).getTime()+"",
                    type: widgetType
                    // _page: vm.pageId
                };
                // console.log("controller wgid = "+vm.widget.type);
                WidgetService
                    .createWidget(vm.pageId, vm.widget)
                    .then(function (response) {
                        var newWidget = response.data;
                        // console.log("inside newWidget = " + newWidget.type);
                        // console.log("controller wgid after webservice = "+newWidget._id);
                        if (newWidget) {
                            $location.url("/user/" + vm.uid + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
                        } else {
                            vm.error = "Unable to create website";
                        }
                    });
            // }
        }
    }
})();