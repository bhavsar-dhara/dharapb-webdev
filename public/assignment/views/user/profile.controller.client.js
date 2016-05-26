/**
 * Created by Dhara on 5/24/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        
        var uid = $routeParams.uid;
        
        function init() {
            vm.user = UserService.findUserById(uid);
        }
        init();
        
        function updateUser(newUser) {
            UserService.updateUser(uid, newUser);
        }
    }
})();