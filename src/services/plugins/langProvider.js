(function () {

    angular
        .module('mobile-core')
        .config(langProvider);

    /////////////////////////////////////

    langProvider.$inject=['$translateProvider'];

    function langProvider($translateProvider) {

        $translateProvider.useStaticFilesLoader({
            prefix: 'db/i18n/',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('en');

        $translateProvider.useLocalStorage();
    }


})();