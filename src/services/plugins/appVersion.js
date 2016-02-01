(function () {

    angular
        .module('mobile-core')
        .run(appVersion);

/////////////////////////////////////


    appVersion.$inject=['$mobileConfig', '$cordovaAppVersion', '$rootScope'];

    function appVersion($mobileConfig, $cordovaAppVersion, $rootScope){


        $cordovaAppVersion.getAppVersion().then(function (version) {
            if (!version)
                return null;

            $mobileConfig.setConfig({
                headers: {
                    appVersion: version
                }
            });

            $rootScope.appVersion = version;

        });

    }

})();
