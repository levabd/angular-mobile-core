(function () {

    angular
        .module('mobile-core')
        .factory('mobileInterceptorCore', mobileInterceptorCore);

    /////////////////////////////////////

    mobileInterceptorCore.$inject=['$q', '$mobileConfig', 'localStorageService', '$toastService', '$injector', '$console'];
    function mobileInterceptorCore($q, $mobileConfig, localStorageService, $toastService, $injector, $console) {

        function bothTypeResponse(response){

            if (response){

                if(response.data){

                    var errorCode = '';
                    var $userService = $injector.get('$userService');
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

                        $toastService.info(response.data.message.text);

                    }


                    if (response.data.code) {
                        errorCode = response.data.code;

                        if (errorCode == 54) {
                            $userService.forgetUser({target: 'self'});
                        }
                    }

                    if (response.data.status){
                        if (response.data.status == "duplicated") {
                            $userService.forgetUser({target: 'self'});
                        }
                    }

                    if (response.data.token){
                        localStorageService.set('token', response.data.token);
                        $mobileConfig.setConfig({
                            headers:{
                                token: response.data.token
                            }
                        })
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
                requestConfig.headers.time = Math.floor(Date.now() / 1000);
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