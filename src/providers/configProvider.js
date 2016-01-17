(function () {

    angular
        .module('mobile-core')
        .provider('$mobileConfig', $mobileConfig)
        .run($configRun);

    /////////////////////////////////////

    function $mobileConfig(){

        return {

            config: null,

            $get: $mobileConfigService
        }

    }

    var $mobileConfigService = ['$console', 'localStorageService', function($console, localStorageService){

        var params = this.config;

        var defaultOptions = {

            environment: 'local',

            environments: {

                development:{
                    address: '127.0.0.1',
                    port: '5513',
                    apiVersion: 'v2'
                },

                production: {
                    address: '192.168.1.2',
                    port: '5513',
                    apiVersion: 'v2'
                }
            },

            cleanStart: false

        };

        var methods = {

            init: function(){

                var missedFields = isRequired(params, {
                    security: {
                        secret: true,
                        uniqueKey: true
                    }
                });

                if (missedFields.length > 0){
                    $console.error(missedFields.join(', '), '$mobileConfigProvider:: You have missed required options');
                    throw new Error();
                }

                // SECRET
                var keyMD5 = CryptoJS.MD5(params.security.uniqueKey).toString(CryptoJS.enc.Hex);
                params.security.secret = CryptoJS.MD5(params.security.secret + '_secret_' + keyMD5).toString(CryptoJS.enc.Hex);

                params = angular.merge(angular.copy(defaultOptions), angular.copy(params)  );

                if (params.cleanStart){
                    localStorageService.clearAll();
                }


            },
            getConfig: function(){
                return params;
            },
            setConfig: function(newParams){
                params = angular.merge(angular.copy(params), angular.copy(newParams)  );
            }
        };

        return methods;

    }];


    $configRun.$inject = ['$mobileConfig'];

    function $configRun($mobileConfig){
        $mobileConfig.init();

    }

})();