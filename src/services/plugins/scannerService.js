(function () {

    angular
        .module('mobile-core')
        .factory('$scanner', $scanner);

    /////////////////////////////////////

    $scanner.$inject=['$langService','$timeout'];

    function $scanner($langService, $timeout) {

        var methods = {
            scan: scan
        };

        /**
         * @desc Запускает сканер
         * @param params obj - параметры запуска
         * @return null
         */
        function scan(params) {
            if (!params) {
                params = {
                    type: 'alcohol'
                };
            }
            else if (!params.type) {
                params.type = 'alcohol';
            }

            loadModal.show();

            window.plugins.insomnia.keepAwake();

            $timeout(function () {

                scanner.startScanning(
                    MWBSInitSpace.init({
                        lang: $langService.getCurrentLanguage(),
                        type: params.type
                    }),
                    MWBSInitSpace.callback({
                        manual: function () {
                            if (typeof params.manual === 'function') {
                                navigator.camera.cleanup( function(){}, function(){} );
                                params.manual();
                            }
                        },
                        result: function (result) {
                            if (typeof params.result === 'function') {
                                navigator.camera.cleanup( function(){}, function(){} );
                                params.result(result);
                            }
                        },
                        timeout: function (result) {
                            if (typeof params.timeout === 'function') {
                                navigator.camera.cleanup( function(){}, function(){} );
                                params.timeout(result);
                            }
                        }
                    }));

            }, 300);

        }

        return methods;
    }
})();