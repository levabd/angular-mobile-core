(function () {

    angular
        .module('mobile-core')
        .factory('$pushService', pushService);

    /////////////////////////////////////

    pushService.$inject = ['$rootScope', '$console', '$mobileConfig'];

    function pushService( $rootScope, $console, $mobileConfig) {

        var scope = this;

        var pushService = $mobileConfig.getConfig().push;

        scope.methods = {

            init: init,
            messageProvider: pushService.messageProvider

        };


        /**
         * @desc Регистрирует устройство и получает push-token
         * @param params obj - объект параметров
         * @param params.success function - callback если успешно
         * @param params.error function - callback если ошибка
         * @return null
         */
        function init(params) {

            if (!params)
                params = {};

            if (!pushService.enabled)
                return null;

            var push = PushNotification.init(pushService.config);

            push.on('registration', function(data) {
                $mobileConfig.setConfig({
                    push:{
                        token: data.registrationId
                    }
                });
                $rootScope.pushToken = data.registrationId;
                $console.info({'pushToken': $rootScope.pushToken}, 'pushService:init');
                if (typeof params.success === 'function') {
                    params.success();
                }
            });

            push.on('notification', function(data) {
                scope.methods.messageProvider(data);

            });

            push.on('error', function(e) {
                // e.message
                if (typeof params.error === 'function') {
                    params.error();
                }
            });

        }

        return scope.methods;

    }

})();