/**
 * Created by Dhara on 5/26/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        
        vm.headers = ['Please select', '1', '2', '3', '4', '5', '6'];

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (response) {
                    vm.widget = response.data;
                    // console.log("edit controller wgid init = "+vm.widget._id);
                    // console.log("edit controller type init = "+vm.widget.type);
                    if (vm.widget.type === "HEADER" && vm.widget.size != null) {
                        switch (vm.widget.size+"") {
                            case '1':
                                vm.widget.size = vm.headers[1];
                                break;
                            case '2':
                                vm.widget.size = vm.headers[2];
                                break;
                            case '3':
                                vm.widget.size = vm.headers[3];
                                break;
                            case '4':
                                vm.widget.size = vm.headers[4];
                                break;
                            case '5':
                                vm.widget.size = vm.headers[5];
                                break;
                            case '6':
                                vm.widget.size = vm.headers[6];
                                break;
                        }
                    } else {
                        vm.widget.size = vm.headers[0];
                    }
                    if (vm.widget.type === "TEXT" && vm.widget.rows != null) {
                        // TODO to populate the rows value on the view
                    }
                });            
        }
        init();

        function updateWidget() {
            // console.log("edit controller size init = "+vm.widget.size);
            WidgetService
                .updateWidget(vm.widgetId, vm.widget)
                .then(
                    function (response) {
                        $location.url("/user/"+vm.uid+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    }, 
                    function (error) {
                        vm.error = "Widget not updated";
                    });
        }
        
        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.uid + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }, function (error) {
                        vm.error = "Unable to delete widget";
                    });
        }
    }
})();