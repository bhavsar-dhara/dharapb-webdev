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

        /*vm.headers = [
            {value:'Please select', text:'Please select'},
            {value:'1', text:'1'},
            {value:'2', text:'2'},
            {value:'3', text:'3'},
            {value:'4', text:'4'},
            {value:'5', text:'5'},
            {value:'6', text:'6'}
            ];*/
        vm.headers = ['Please select', '1', '2', '3', '4', '5', '6'];

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
            if (vm.widget.size == null) {
                vm.widget.size = vm.headers[0];
            } else {
                console.log("init: vm.widget.size = " + vm.widget.size);
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
            }
        }
        init();

        function updateWidget() {
            if (WidgetService.updateWidget(vm.widgetId, vm.widget)) {
                $location.url("/user/"+vm.uid+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            } else {
                vm.error = "Widget not updated";
            }
        }
        
        function deleteWidget() {
            var newWidget = WidgetService.deleteWidget(vm.widgetId);
            if (newWidget) {
                $location.url("/user/"+vm.uid+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            } else {
                vm.error = "Unable to delete widget";
            }
        }
    }
})();