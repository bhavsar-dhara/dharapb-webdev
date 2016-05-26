/**
 * Created by Dhara on 5/24/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams) {
        var vm = this;
        // vm.updateUser = updateUser;
        //
        // var uid = $routeParams.uid;
        // var index = -1;
        //
        // for (var i in users) {
        //     if(users[i]._id === uid) {
        //         vm.user = users[i];
        //         index = i;
        //     }
        // }
        //
        // function updateUser(newUser) {
        //     console.log(newUser);
        //     users[index].firstName = newUser.firstName;
        //     users[index].lastName = newUser.lastName;
        // }
    }
})();