(function () {

    angular
        .module('mobile-core')
        .factory('$server', serverService);

    /////////////////////////////////////
    serverService.$inject = ['$rootScope', '$http', '$mobileConfig', '$q'];

    function serverService($rootScope, $http, $mobileConfig, $q ) {

        var serverService = {

            get: function (params) {
                return request('GET', params);
            },

            post: function (params) {
                return request('POST', params);
            }
        };

        var loadModalWrapper = {
            show: function(){
                if (window.loadModal){
                    if (window.loadModal.show){
                        if (typeof window.loadModal.show === 'function') {
                            window.loadModal.show();
                        }
                    }
                }

            },
            hide: function(){
                if (window.loadModal){
                    if (window.loadModal.show){
                        if (typeof window.loadModal.hide === 'function') {
                            window.loadModal.hide();
                        }
                    }
                }

            }
        };

        var requestQueue = [];

        function request(typeOfRequest, params){
            var q = $q.defer();

            var defaultParams = {
                url: '',
                saveFrom: null,
                saveTo: null,
                local: null,
                data: null,
                offline_data: null,
                returning: true,
                sync: false,
                no_warnings: {
                    success: false,
                    error: false
                },
                preloader: true,
                log: null
            };

            if (params) {

                params = _.extend(defaultParams, params);

                if (params.sync == false || requestQueue.length == 0){

                    if (params.sync){
                        requestQueue.push({
                            type: typeOfRequest,
                            params: params
                        });
                    }

                    http(typeOfRequest, params, q);

                }else{

                    requestQueue.push({
                        type: typeOfRequest,
                        params: params,
                        q: q
                    });

                }



            } else {
                q.reject('$server: ERROR. \n Bad parameters, params is not object model data.');
                console.error('$server: ERROR. \n Bad parameters, params is not object model data.')
            }
            return q.promise;
        }

        function http(typeOfRequest, params, q){

            if (params.preloader && !params.local)
                loadModalWrapper.show();

            $http({
                method: typeOfRequest,
                url: getFullURL(params),
                dataType: 'json',
                data: params.data,
                params: typeOfRequest == 'GET' ? params.data : null,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                options: {
                    offline_data: params.offline_data,
                    no_warnings: params.no_warnings,
                    log: params.log
                }
            })
                .success(function (data, status, headers, config) {

                    if (params.preloader && !params.local)
                        loadModalWrapper.hide();

                    if (params.local){
                        if (params.data){
                            console.log('params.data ', params.data);

                            var elem = _.findWhere(data, params.data);

                            if (elem){
                                data = elem;
                            }else{
                                data = null;
                            }
                        }
                    }
                    q.resolve(data, status, headers, config);

                    if (params.sync){
                        requestQueue.shift();

                        if (requestQueue.length > 0){
                            http(requestQueue[0].type, requestQueue[0].params, requestQueue[0].q );
                        }
                    }
                })
                .error(function (data, status, headers, config) {


                    if (params.preloader  && !params.local)
                        loadModalWrapper.hide();

                    if (status == 0) {
                        if (config.options.offline_data){
                            q.resolve(config.options.offline_data, status, headers, config);
                        }
                        else {
                            if (params.returning) {
                                $rootScope.helpers.popPage(navigate);
                            }
                            q.reject(data, status, headers, config);
                        }

                    } else {
                        q.reject(data, status, headers, config);
                    }

                    if (params.sync){
                        requestQueue.shift();

                        if (requestQueue.length > 0){
                            http(requestQueue[0].type, requestQueue[0].params, requestQueue[0].q );
                        }
                    }
                });

        }

        function getFullURL(params){
            var

                environment = $mobileConfig.getConfig().environment,

                currentConnection = $mobileConfig.getConfig().environments[environment],

                prefix = currentConnection.address + ':' + currentConnection.port + '/' + currentConnection.apiVersion + '/',

                postfix = '',

                fullURL;

            if (environment == 'local' || params.local ){

                fullURL = 'db/' + params.url + '.json';

            }else{

                fullURL = prefix + params.url + postfix;

            }

            return fullURL;
        }

        return serverService
    }

})();