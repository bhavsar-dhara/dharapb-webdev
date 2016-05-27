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
        vm.deleteWebsite = deleteWebsite;

        function deleteWebsite() {
            var newWebsite = WebsiteService.deleteWebsite(vm.websiteId);
            if (newWebsite) {
                $location.url("/user/"+vm.uid+"/website")
            } else {
                vm.error = "Unable to delete website";
            }
        }
    }
})();