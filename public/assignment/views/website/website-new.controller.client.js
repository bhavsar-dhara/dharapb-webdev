/**
 * Created by Dhara on 5/26/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);
    
    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.createWebsite = createWebsite;
        vm.isEmptyName = false;
        vm.newWebsite = undefined;

        function createWebsite(name, description) {
            vm.isEmptyName = vm.newWebsite.name.$error.required;
            if(!vm.isEmptyName) {
                var website = {
                    // _id: (new Date()).getTime()+"",
                    name: name,
                    description: description
                };
                WebsiteService
                    .createWebsite(vm.uid, website)
                    .then(function (response) {
                        var newWebsite = response.data;
                        if (newWebsite) {
                            $location.url("/user/" + vm.uid + "/website");
                        } else {
                            vm.error = "Unable to create website";
                        }
                    });
            }
        }
    }
})();