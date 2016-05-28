/**
 * Created by Dhara on 5/26/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function updateWebsite(website) {
            if (WebsiteService.updateWebsite(vm.websiteId, website)) {
                $location.url("/user/"+vm.uid+"/website");
            } else {
                vm.error = "Website not updated";
            }
        }

        function deleteWebsite() {
            var newWebsite = WebsiteService.deleteWebsite(vm.websiteId);
            if (newWebsite) {
                $location.url("/user/"+vm.uid+"/website");
            } else {
                vm.error = "Unable to delete website";
            }
        }
    }
})();