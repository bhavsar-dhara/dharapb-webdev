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
        vm.isEmptyName = false;
        vm.isEmptyText = false;
        vm.youTubeForm = undefined;
        vm.textForm = undefined;
        vm.imageForm = undefined;
        vm.htmlForm = undefined;
        vm.headerForm = undefined;
        
        vm.headers = ['Please select', '1', '2', '3', '4', '5', '6'];

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (response) {
                    vm.widget = response.data;
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
                });            
        }
        init();

        function updateWidget() {
            if(vm.headerForm != undefined) {
                vm.isEmptyName = vm.headerForm.name.$error.required;
                vm.isEmptyText = vm.headerForm.text.$error.required;
            } else if(vm.imageForm != undefined) {
                vm.isEmptyName = vm.imageForm.name.$error.required;
            } else if(vm.youTubeForm != undefined) {
                vm.isEmptyName = vm.youTubeForm.name.$error.required;
            } else if(vm.htmlForm != undefined) {
                vm.isEmptyName = vm.htmlForm.name.$error.required;
            } else if(vm.textForm != undefined) {
                vm.isEmptyName = vm.textForm.name.$error.required;
            }
            if(!vm.isEmptyName || (!vm.isEmptyText && vm.headerForm != undefined)) {
                WidgetService
                    .updateWidget(vm.widgetId, vm.widget)
                    .then(
                        function (response) {
                            $location.url("/user/" + vm.uid + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        },
                        function (error) {
                            vm.error = "Widget not updated";
                        });
            }
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