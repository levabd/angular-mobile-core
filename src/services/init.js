(function () {

    angular
        .module('mobile-core')
        .run($init);

    /////////////////////////////////////

    $init.$inject = ['localStorageService', '$mobileConfig'];
    function $init(localStorageService, $mobileConfig) {

        if (localStorageService.get('token')){
            $mobileConfig.setConfig({
                headers:{
                    token: localStorageService.get('token')
                }
            });
        }

        console.log('getConfig:', $mobileConfig.getConfig());
        console.log('LocalStorageToken:', localStorageService.get('token'));
    }


})();