(function () {

    angular
        .module('mobile-core')
        .factory('mobileInterceptorCore', mobileInterceptorCore);

    /////////////////////////////////////

    mobileInterceptorCore.$inject=['$q', '$mobileConfig', 'localStorageService', '$toastService', '$injector', '$console'];
    function mobileInterceptorCore($q, $mobileConfig, localStorageService, $toastService, $injector, $console) {

        function bothTypeResponse(response){
            var $langService = $injector.get('$langService');
            if (response){

                if(response.data){

                    var errorCode = '';

                    var no_warnings = false;

                    if (response.config){
                        if (response.config.options){
                            if (response.config.options.log){
                                if (response.config.url.indexOf("http") != -1 || response.config.url.indexOf("json") != -1){
                                    $console.info(response, response.config.url);
                                }
                            }
                            if (response.config.options.no_warnings) {
                                if (response.config.options.no_warnings.success) {
                                    no_warnings = true;
                                }
                            }
                        }

                    }


                    if (response.data.message && no_warnings == false) {

                        if(response.data.message.hold){
                            if (!ons)
                                return;

                            if (!ons.notification)
                                return;

                            if (!ons.notification.confirm)
                                return;

                            ons.notification.confirm({
                                message: response.data.message.text,
                                title: response.data.message.title,
                                buttonLabels: ['OK'],
                                animation: 'default', // or 'none'
                                primaryButtonIndex: 1,
                                cancelable: true
                            });

                        }else{

                            $toastService.info(response.data.message.text);

                        }


                    }

                    if (response.data.token){
                        localStorageService.set('token', response.data.token);
                        $mobileConfig.setConfig({
                            headers:{
                                token: response.data.token
                            }
                        });
                    }

                    if (response.data.appVersion) {
                        if (response.config.headers.appVersion){
                            var serverVersion = parseFloat(response.data.appVersion.replace(/\./g, ''));
                            var appVersion = parseFloat(response.config.headers.appVersion.replace(/\./g, ''));
                            console.log('versions: server - ', serverVersion, '; app - ' + appVersion);
                            if (serverVersion > appVersion) {
                                ons.notification.confirm({
                                    title: $langService.getMessage('update_app'),
                                    message: $langService.getMessage('update_text'),
                                    buttonLabels: [$langService.getMessage('later'), $langService.getMessage('update')],
                                    callback: function (idx) {
                                        switch (idx) {
                                            case 0:

                                                break;
                                            case 1:
                                                cordova.plugins.market.open('com.wipon.wipon');
                                                break;
                                        }
                                    }
                                });
                            }
                        }
                    }

                }

                if (response.status.toString().charAt(0) == '4') {
                    // 422 status code - validation error
                    if (response.status != 422) {
                        //if (navigate.getPages().length > 1)
                        //  navigate.popPage({ animation: 'none'});
                    }


                }
                else if (response.status.toString().charAt(0) == '5') {
                    $toastService.error($langService.getMessage('please_try_later'), response.config.url);
                }
                else if (response.status <= 0) {

                    if (response.config.options){

                        if ((!response.config.options.offline_data) && (response.config.url.indexOf("http") != -1)) {
                            $console.info("You must have message - " + $langService.getMessage('no_connection'), 'interceptor');

                            $toastService.error($langService.getMessage('no_connection'), response.config.url);

                        }
                    }


                }

            }

        }

        return {
            // On request success
            request: function (requestConfig) {

                requestConfig.timeout = $mobileConfig.getConfig().connection_timeout;
                requestConfig.headers = $mobileConfig.getConfig().headers;
                requestConfig.headers["Content-Type"] = 'application/json;charset=UTF-8';
                var time = calcTime();
                requestConfig.headers.time = time;
                return requestConfig || $q.when(requestConfig);
            },

            // On request failure
            requestError: function (rejection) {

                return $q.reject(rejection);
            },

            // On response success
            response: function (response) {
                bothTypeResponse(response);

                // Return the response or promise.
                return response || $q.when(response);
            },

            responseError: function (rejection) {
                bothTypeResponse(rejection);

                // Return the promise rejection.
                return $q.reject(rejection);
            }
        };
    }




})();