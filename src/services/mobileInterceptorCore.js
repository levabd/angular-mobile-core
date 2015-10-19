(function () {

    angular
        .module('mobile-core')
        .factory('mobileInterceptorCore', mobileInterceptorCore);

    /////////////////////////////////////

    mobileInterceptorCore.$inject=['$q', '$mobileConfig', 'localStorageService', '$toastService'];
    function mobileInterceptorCore($q, $mobileConfig, localStorageService, $toastService) {

        function bothTypeResponse(response){

            if (response){

                if(response.data){

                    if (response.data.message) {

                        $toastService.info(response.data.message.text);

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