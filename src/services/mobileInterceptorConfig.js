(function () {

    angular
        .module('mobile-core')
        .config(mobileInterceptorConfig);

    /////////////////////////////////////

    mobileInterceptorConfig.$inject=['$httpProvider'];
    function mobileInterceptorConfig($httpProvider) {

        $httpProvider.interceptors.push('mobileInterceptorCore');
    }

})();