(function () {

    angular
        .module('mobile-core')
        .factory('mobileInterceptorCore', mobileInterceptorCore);

    /////////////////////////////////////

    mobileInterceptorCore.$inject=['$q', '$mobileConfig', 'localStorageService'];
    function mobileInterceptorCore($q, $mobileConfig, localStorageService) {
        return {
            // On request success
            request: function (requestConfig) {

                requestConfig.timeout = $mobileConfig.getConfig().connection_timeout;
                requestConfig.headers = $mobileConfig.getConfig().headers;
                requestConfig.headers.time = Math.floor(Date.now() / 1000);
                return requestConfig || $q.when(requestConfig);
            },

            // On request failure
            requestError: function (rejection) {


                return $q.reject(rejection);
            },

            // On response success
            response: function (response) {


                if (response){

                    if(response.data)
                        if (response.data.token){
                            localStorageService.set('token', response.data.token);
                            $mobileConfig.setConfig({
                                headers:{
                                    token: response.data.token
                                }
                            })
                        }


                }

                // Return the response or promise.
                return response || $q.when(response);
            },

            responseError: function (rejection) {

                // Return the promise rejection.
                return $q.reject(rejection);
            }
        };
    }


})();