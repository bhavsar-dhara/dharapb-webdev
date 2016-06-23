/**
 * Created by Dhara on 6/23/2016.
 */
(function() {
    angular
        .module('core')
        .filter('cmdate', [
            '$filter', function ($filter) {
                return function (input, format) {
                    return $filter('date')(new Date(input), format);
                };
            }
        ]);
})();