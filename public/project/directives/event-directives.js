/**
 * Created by Dhara on 6/24/2016.
 */
(function () {
    angular
        .module("eventDirectives", [])
        .directive("showTab", showTab);

    function showTab() {
        return {
            link: function (scope, element, attributes) {
                $(element).click(
                    function (e) {
                        e.preventDefault();
                        $(element).tab('show');
                    }
                );
            }
        };
    }

})();