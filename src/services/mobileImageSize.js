(function () {

    angular
        .module('mobile-core')
        .run($mobileImageSize);

    /////////////////////////////////////

    $mobileImageSize.$inject = ['$window', '$mobileConfig'];
    function $mobileImageSize($window, $mobileConfig) {

        var pixelRatio = window.devicePixelRatio;

        if (!pixelRatio)
            pixelRatio = 1;


        $mobileConfig.setConfig({
            headers:{
                imageSize: ($window.innerWidth * pixelRatio) >= 600 ? 'high' : ($window.innerWidth * pixelRatio) >= 340 ? 'medium' : 'low'
            }
        });

    }


})();