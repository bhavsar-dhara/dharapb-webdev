/**
 * Created by Dhara on 5/26/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function updatePage(page) {
            if (PageService.updatePage(vm.pageId, page)) {
                $location.url("/user/"+vm.uid+"/website/"+vm.websiteId+"/page");
            } else {
                vm.error = "Page not updated";
            }
        }

        function deletePage() {
            var newPage = PageService.deletePage(vm.pageId);
            if (newPage) {
                $location.url("/user/"+vm.uid+"/website/"+vm.websiteId+"/page")
            } else {
                vm.error = "Unable to delete page";
            }
        }
    }
})();