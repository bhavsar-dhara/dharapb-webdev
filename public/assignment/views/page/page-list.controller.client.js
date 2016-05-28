/**
 * Created by Dhara on 5/26/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);
    
    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
    }
})();