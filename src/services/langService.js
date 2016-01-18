(function () {

    angular
        .module('mobile-core')
        .factory('$langService', langService);

    /////////////////////////////////////

    langService.$inject = ['$server', '$mobileConfig', '$translate', 'amMoment', 'localStorageService', '$toastService'];

    function langService($server, $mobileConfig, $translate, amMoment, localStorageService, $toastService) {

        var scope = this;

        scope.methods = {
            init: init,
            setLanguage: setLanguage,
            getCurrentLanguage: getCurrentLanguage,
            setGlobal: setGlobal,
            getMessage: getMessage
        };

        /////////////////////////////////////

        function init(params){
            if (!params)
                params = {lang: appLang};

            if(localStorageService.get('userData')){
                document.addEventListener("deviceready", function() {
                    scope.methods.setLanguage({
                        lang: localStorageService.get('userData').lang,
                        success: function () {

                            //callback
                            if (typeof params.success === 'function') {
                                params.success();
                            }
                        }
                    });
                }, false);
            }else{
                // define current locale and set them to config.headers and config.device.lang
                navigator.globalization.getPreferredLanguage(
                    function (language) {

                        document.addEventListener("deviceready", function() {
                            scope.methods.setLanguage({
                                lang: language.value.substr(0, 2),
                                success: function () {

                                    //callback
                                    if (typeof params.success === 'function') {
                                        params.success();
                                    }
                                }
                            });
                        }, false);

                    },
                    function () {
                        $toastService.error(scope.methods.getMessage('cant_get_language'), 'init');
                    }
                );
            }
        }

        function setLanguage(params){
            if (!params)
                params = {lang: appLang};

            if (params.lang != appLang) {

                // if installed locale is included in the app possible locales
                if (!(_.indexOf(app_locales, params.lang) < 0)) {
                    // set installed locale
                    scope.methods.setGlobal({
                        locale: params.lang,
                        success: function () {
                            //callback
                            if (typeof params.success === 'function') {
                                params.success();
                            }
                        }
                    });
                } else {
                    // installed locale is not  included in the app possible locales but included into Commonwealth Of Independent States locales
                    if (!(_.indexOf(sng_locales, params.lang) < 0)) {
                        // set russian locale
                        scope.methods.setGlobal({
                            locale: 'ru',
                            success: function () {
                                //callback
                                if (typeof params.success === 'function') {
                                    params.success();
                                }
                            }
                        });
                    } else {
                        console.log('else set english licale' + params.lang + ' and array ' + JSON.stringify(app_locales));
                        // else set english locale
                        scope.methods.setGlobal({
                            locale: 'en',
                            success: function () {
                                //callback
                                if (typeof params.success === 'function') {
                                    params.success();
                                }
                            }
                        });
                    }
                }

            } else {

                scope.methods.setGlobal({
                    locale: params.lang,
                    success: function () {
                        //callback
                        if (typeof params.success === 'function') {
                            params.success();
                        }
                    }
                });
            }
        }

        function getCurrentLanguage(){
            return appLang;
        }

        function setGlobal(params){
            if (!params)
                params = {locale: appLang};

            $server.get({
                url: 'i18n/' + params.locale,
                local: true
            }).then(
                function success(data) {

                    scope.dictionary = data;
                    amMoment.changeLocale(params.locale);
                    $mobileConfig.setConfig({
                        headers: {
                            lang: params.locale
                        }
                    });
                    $translate.use(params.locale);
                    appLang = params.locale;

                    //callback
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

        var
            appLang = 'en',
            app_locales = ['ru', 'kz', 'en'],
            sng_locales = ['uk', 'uz', 'tk', 'tu', 'tg', 'ru', 'mo', 'ky', 'kk', 'be', 'am', 'hy', 'az'];

        scope.dictionary = {};

        function getMessage(word){
            if (!word)
                word = 'missing_word';
            if (scope.dictionary[word])
                return scope.dictionary[word];
            else
                return word
        }

        return scope.methods;

    }

})();