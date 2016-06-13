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
        vm.isEmptyName = false;
        vm.newPage = undefined;

        function createPage(name, title) {
            vm.isEmptyName = vm.newPage.name.$error.required;
            if(!vm.isEmptyName) {
                var page = {
                    name: name,
                    title: title
                };
                PageService
                    .createPage(vm.websiteId, page)
                    .then(function (response) {
                        var newPage = response.data;
                        if (newPage) {
                            $location.url("/user/" + vm.uid + "/website/" + vm.websiteId + "/page");
                        } else {
                            vm.error = "Unable to create page";
                        }
                    });
            }
        }
    }
})();