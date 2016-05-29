/**
 * Created by Dhara on 5/26/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);
    
    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        function createPage(name, title) {
            var page = {
                _id: (new Date()).getTime()+"",
                name: name,
                title: title
            };
            var newPage = PageService.createPage(vm.websiteId, page);
            if (newPage) {
                $location.url("/user/"+vm.uid+"/website/"+vm.websiteId+"/page");
            } else {
                vm.error = "Unable to create page";
            }
        }
    }
})();