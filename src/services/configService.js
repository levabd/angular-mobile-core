(function () {

    angular
        .module('mobile-core')
        .provider('$coreConfig', $coreConfig)
        .run($configRun);

    /////////////////////////////////////

    function $coreConfig(){

        return {

            config: null,

            $get: $coreConfigService
        }

    }

    var $coreConfigService = ['$console', function($console){

        var params = this.config;

        var defaultOptions = {

            environment: 'local',

            environments: {

                development:{
                    address: '127.0.0.1',
                    port: '5513'
                },

                production: {
                    address: '192.168.1.2',
                    port: '5513'
                }
            }

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
                    $console.error(missedFields.join(', '), '$configProvider:: You have missed required options');
                    throw new Error();
                }

                // SECRET
                var keyMD5 = CryptoJS.MD5(params.security.uniqueKey).toString(CryptoJS.enc.Hex);
                params.security.secret = CryptoJS.MD5(params.security.secret + '_secret_' + keyMD5).toString(CryptoJS.enc.Hex);


                params = angular.merge(angular.copy(defaultOptions), angular.copy(params)  );

                $console.log(params, '$configProvider');

            },
            getConfig: function(){
                return params;
            }

        };

        return methods;

    }];


    $configRun.$inject = ['$coreConfig', '$console'];

    function $configRun($coreConfig, $console){
        $console.info({config: $coreConfig.getConfig()}, 'configRuN');
        $coreConfig.init();

    }

})();