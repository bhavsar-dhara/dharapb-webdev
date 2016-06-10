/**
 * Created by Dhara on 6/9/2016.
 */
(function () {
    angular
        .module("TodoApp", ["MyDirectives"])
        .controller("TodosController", TodosController);
    
    function TodosController($http) {
        var vm =this;
        vm.reorderTodos = reorderTodos;

        function init() {
            $http
                .get("/api/todos")
                .then(
                    function (response) {
                        vm.data = response.data;
                    }
                );
        }
        init();
        
        function reorderTodos(start, end) {
            console.log("TodosController");
            console.log(start);
            console.log(end);
            $http
                .put("/api/todos?start="+start+"&end="+end)
                .then(
                    init()
                    // function (response) {
                    //     console.log("Success");
                    // }
                );
        }
        /*vm.data = [
            {"priority": 1, "title": "CS5610", "todo": "Teach Directives"},
            {"priority": 2, "title": "CS5200", "todo": "Teach Database"},
            {"priority": 3, "title": "CS5100", "todo": "Teach Algorithms"}
        ];*/
    }
})();