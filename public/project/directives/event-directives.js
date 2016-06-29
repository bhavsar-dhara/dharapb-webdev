/**
 * Created by Dhara on 6/24/2016.
 */
(function () {
    angular
        .module("eventDirectives", [])
        .directive("showTab", showTab)
        .directive('tooltip', tooltip);

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

    function tooltip() {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                $(element).hover(function () {
                    // on mouseenter
                    $(element).tooltip('show');
                }, function () {
                    // on mouseleave
                    $(element).tooltip('hide');
                });
            }
        };
    }

})();