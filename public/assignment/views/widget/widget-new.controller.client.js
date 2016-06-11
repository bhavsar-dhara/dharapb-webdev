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

        function createWidget(widgetType) {
            vm.widget = {
                // _id: (new Date()).getTime()+"",
                type: widgetType,
                // _page: vm.pageId
            };
            // console.log("controller wgid = "+vm.widget.type);
            WidgetService
                .createWidget(vm.pageId, vm.widget)
                .then(function (response) {
                    var newWidget = response.data;
                    // console.log("controller wgid after webservice = "+newWidget._id);
                    if (newWidget) {
                        $location.url("/user/"+vm.uid+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget._id);
                    } else {
                        vm.error = "Unable to create website";
                    }
                });
        }
    }
})();