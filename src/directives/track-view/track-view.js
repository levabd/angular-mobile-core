(function () {

    angular
        .module('mobile-core')
        .directive('gAnalytics', gAnalytics)
        .directive('trackView', trackView);

    /////////////////////////////////////////////

    // Элемент: <g-analytics view="Имя view"></g-analytics>
    function gAnalytics() {
        return {
            restrict: 'E',
            scope: {
                view: "@"
            },
            controller: function ($scope) {
                //if ($scope && device.platform != "Win32NT") {
                //    if ($scope.view) {
                //        $cordovaGoogleAnalytics.trackView($scope.view);
                //    }
                //}
            }
        };

    }

    // Атрибут <* track-view></*>
    function trackView() {
        return {
            restrict: 'A',
            controller: function ($scope, $element, $cordovaGoogleAnalytics) {
                if (device.platform != "Win32NT") {
                    var controllerName = $element[0].getAttribute('ng-controller').split(' as ')[0];
                    $cordovaGoogleAnalytics.trackView(controllerName);
                }
            }
        };

    }

})();