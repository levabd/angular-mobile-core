(function () {

    angular
        .module('mobile-core')
        .factory('$scanner', $scanner);

    /////////////////////////////////////

    $scanner.$inject=['$langService','$timeout'];

    function $scanner($langService, $timeout) {

        var methods = {
            scan: scan,
            getLastScanParams: getLastScanParams
        };

        var lastScannerParams = null;


        /**
         * @desc Возвращает параметры сканеры с последнего запуска
         * @return obj
         */
        function getLastScanParams(){
            return lastScannerParams
        }

        /**
         * @desc Запускает сканер
         * @param params obj - параметры запуска
         * @return null
         */
        function scan(params) {
            if (!params) {
                params = {};
            }

            if (params.repeat){
                params = lastScannerParams;
            }

            var defaultParams = {
                lang:'en',
                types: [],
                text: '\n',
                hasManual: false
            };
            params = _.extend(defaultParams, params );

            lastScannerParams = params;

            loadModal.show();
            $timeout(function(){
                loadModal.hide();
            }, 1000);
            $timeout(function () {
                params = _.extend(params, {
                    lang: $langService.getCurrentLanguage()
                });
                scanner.startScanning(
                    MWBSInitSpace.init(params),
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