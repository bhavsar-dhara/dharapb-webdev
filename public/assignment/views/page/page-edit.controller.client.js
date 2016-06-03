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
            PageService
                .findPageById(vm.pageId)
                .then(function (response) {
                    vm.page = response.data;
                });
        }
        init();

        function updatePage(page) {
            PageService
                .updatePage(vm.pageId, page)
                .then(
                    function (response) {
                        $location.url("/user/"+vm.uid+"/website/"+vm.websiteId+"/page");
                    },
                    function (error) {
                        vm.error = "Page not updated";
                    });
        }

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .then(
                    function (response) {
                        $location.url("/user/"+vm.uid+"/website/"+vm.websiteId+"/page");
                    },
                    function (error) {
                        vm.error = "Unable to delete page";
                    });
        }
    }
})();