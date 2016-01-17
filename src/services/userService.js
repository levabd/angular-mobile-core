(function () {

    angular
        .module('mobile-core')
        .factory('$userService', userService);

    /////////////////////////////////////

    userService.$inject = ['$server', '$mobileConfig', 'localStorageService', '$rootScope', '$langService'];

    function userService($server, $mobileConfig, localStorageService, $rootScope, $langService) {

        var scope = this;

        initUser();

        scope.methods = {

            createUser: createUser,
            forgetUser: forgetUser,
            getUser: getUser,
            saveUser: saveUser,
            getUserCode: getUserCode,
            transferUser: transferUser,
            resendEmail: resendEmail,
            getUserDevicesNumber: getUserDevicesNumber,
            verifyProfile: verifyProfile,
            competitionRegister: competitionRegister,
            getCompetition: getCompetition,
            updateProfile: updateProfile

        };

        /////////////////////////////////////////////

        function initUser() {
            $rootScope.userData = {
                first_name: '',
                second_name: '',
                phone_number: '',
                avatar: '',
                email: '',
                lang: '',
                city: {
                    name: '',
                    id: null
                },
                country: {
                    name: '',
                    id: null
                }
            };
            if (localStorageService.get('userData')) {
                $rootScope.userData = localStorageService.get('userData');
            }
        }

        function createUser(params) {
            if (!params)
                params = {};

            var newUser = _.extend($rootScope.userData, {
                lang: $langService.getCurrentLanguage(),
                push_token: $rootScope.pushToken
            });

            $server.post({
                url: 'user/create',
                offlineData: params.offline_data,
                data: {
                    secret: $mobileConfig.getConfig().security.secret,
                    user: newUser
                }
            }).then(
                function success(data) {
                    localStorageService.set('token', data.token);
                    scope.methods.updateProfile(newUser);
                    //callback
                    if (typeof params.success === 'function') {
                        params.success(data);
                    }
                },
                function error(error) {
                    if (typeof params.error === 'function') {
                        params.error(data);
                    }
                    if (error) {
                        if (error.code == 54 || error.code == 30) {   // authorization error
                            scope.methods.forgetUser({target: 'self'});
                        }
                    }
                }
            );
        }

        function forgetUser(params) {
            if (!params)
                params = {};

            if (!window.waitingForUnlink) {
                window.waitingForUnlink = true;

                $server.post({
                    url: 'user/unlink',
                    offlineData: params.offline_data,
                    data: {
                        target: params.target,
                        secret: $mobileConfig.getConfig().security.secret
                    }
                }).then(
                    function success() {

                        if (params.target != 'xor'){

                            localStorageService.clearAll();
                            $rootScope.notifications = [];
                            $rootScope.userData = {
                                first_name: '',
                                second_name: '',
                                phone_number: '',
                                avatar: '',
                                email: '',
                                lang: '',
                                city: {
                                    name: '',
                                    id: null
                                },
                                country: {
                                    name: '',
                                    id: null
                                }
                            };
                            scope.methods.createUser({
                                success: function (data) {

                                    window.waitingForUnlink = false;
                                    if (typeof params.success === 'function') {
                                        params.success(data);
                                    }
                                },
                                error: function (error) {

                                    window.waitingForUnlink = false;
                                    if (typeof params.error === 'function') {
                                        params.error(error);
                                    }
                                }
                            });

                        }
                    },
                    function error(error) {
                        window.waitingForUnlink = false;
                        if (typeof params.error === 'function') {
                            params.error(error);
                        }
                    }
                );
            } else {
                window.waitingForUnlink = false;
                console.log('В Ожидании на unlink');
            }


        }

        function getUser(params) {
            if (!params)
                params = {};

            $server.get({
                url: 'user/data',
                preloader: params.preloader,
                offline_data: {user: $rootScope.userData}
            }).then(
                function success(data) {
                    scope.methods.updateProfile(data.user);

                    $langService.setLanguage({lang: data.user.lang});

                    if (typeof params.success === 'function') {
                        params.success(data);
                    }
                },
                function error(error) {
                    //callback
                    if (typeof params.error === 'function') {
                        params.error(error);
                    }
                }
            );
        }

        function saveUser(params) {
            if (!params)
                params = {};

            if (params.winner)
                params.userData.winner_status = params.winner;


            var oldLang = $mobileConfig.getConfig().headers.lang,
                newLang = params.userData.lang;

            if (newLang != oldLang){
                $mobileConfig.setConfig({
                    headers: {
                        lang: newLang
                    }
                });
            }



            $server.post({
                url: 'user/data',
                offlineData: params.offline_data,
                no_warnings: params.no_warnings,
                preloader: params.preloader,
                data: angular.merge(
                    angular.copy(params.userData),
                    angular.copy({
                        city_id: params.userData.city ? params.userData.city.id : null,
                        country_id: params.userData.country ? params.userData.country.id : null
                    }))
            }).then(
                function success(data) {
                    scope.methods.updateProfile(data.user);

                    //callback
                    if (typeof params.success === 'function') {
                        params.success(data);
                    }
                },
                function error(error) {

                    if (newLang != oldLang){
                        $mobileConfig.setConfig({
                            headers: {
                                lang: oldLang
                            }
                        });
                    }

                    if (typeof params.error === 'function') {
                        params.error(error);
                    }
                }
            );
        }

        function getUserCode(params) {
            if (!params)
                params = {};


            $server.get({
                url: 'user/link',
                offline_data: params.offline_data
            }).then(
                function success(data) {

                    if (typeof params.success === 'function') {
                        params.success(data);
                    }
                },
                function error(error) {

                    if (typeof params.error === 'function') {
                        params.error(error);
                    }
                }
            );
        }

        function transferUser(params) {
            if (!params)
                params = {};

            $server.post({
                url: 'user/link',
                data: {
                    authCode: params.code,
                    pushToken: $rootScope.pushToken
                }
            }).then(
                function success(data) {
                    console.log('data', data);
                    scope.methods.updateProfile(data.user);
                    $langService.setLanguage({lang: data.user.lang});
                    $rootScope.helpers.killAllPagesIn(navigate);
                    if (typeof params.success === 'function') {
                        params.success(data);
                    }
                },
                function error(error) {

                    if (typeof params.error === 'function') {
                        params.error(error);
                    }
                }
            );
        }

        function resendEmail(params) {
            if (!params)
                params = {};

            $server.post({
                url: 'user/resendmail'
            }).then(
                function success(data) {
                    if (typeof params.success === 'function') {
                        params.success(data);
                    }
                },
                function error(error) {

                    if (typeof params.error === 'function') {
                        params.error(error);
                    }
                }
            );
        }

        function getUserDevicesNumber(params) {
            if (!params)
                params = {};

            $server.get({
                url: 'user/devices'
            }).then(
                function success(data) {
                    if (typeof params.success === 'function') {
                        params.success(data.user_devices);
                    }
                },
                function error(error) {

                    if (typeof params.error === 'function') {
                        params.error(error);
                    }
                    if (error) {
                        if (error.code == 54) {
                            // authorization error
                            scope.methods.forgetUser({target: 'self'});
                        }
                    }
                }
            );
        }

        function verifyProfile(params) {

            $server.post({
                url: 'user/winner',
                data: {
                    scenario: params.scenario
                }
            }).then(
                function success(data) {

                    if (typeof params.success === 'function') {
                        params.success(data);
                    }

                },
                function error(error) {

                    if (typeof params.error === 'function') {
                        params.error(error);
                    }

                }
            );


        }
        function getCompetition(params){
            if (!params)
                params = {};

            var localStorageCompetitions = localStorageService.get('competitions') ? localStorageService.get('competitions') : [];

            $server.get({
                url: 'competitions/index',
                offline_data: {competitions: localStorageCompetitions}
            }).then(
                function success(data){
                    if (data.competitions){
                        localStorageService.set('competitions', data.competitions);
                    }
                    if (typeof params.success === 'function') {
                        params.success(data);
                    }
                },
                function error(error){
                    if (typeof params.error === 'function') {
                        params.error(error);
                    }
                });
        }
        function competitionRegister(params){
            if (!params)
                params = {};

            $server.post({
                url: 'competitions/register',
                data: {
                    item_id: params.item_id,
                    competition_id: params.competition_id
                }
            }).then(
                function success(data){

                    navigate.popPage({animation: 'none'});
                    navigate.pushPage('view/user/competition/competition.html');


                }
            );
        }

        function updateProfile(userData) {

            $rootScope.userData = angular.copy(userData);

            localStorageService.set('userData', $rootScope.userData);
        }

        return scope.methods;
    }
})();