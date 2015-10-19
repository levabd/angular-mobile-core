(function () {

    angular
        .module('mobile-core')
        .factory('$pushService', pushService);

    /////////////////////////////////////

    pushService.$inject = ['$rootScope','$toastService','$notificationService', '$console'];

    function pushService( $rootScope, $toastService, $notificationService, $console) {

        var scope = this;

        scope.config = {
            android: {
                "senderID": "762963015605"
            },
            wp8:{
                "channelName": device.uuid
            },
            ios: {
                "badge": true,
                "alert": true,
                "sound": true
            }
        };

        scope.methods = {

            init: init,
            messageProvider: messageProvider


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

            var push = PushNotification.init({ "android": {"senderID": "762963015605"},
                "ios": {}, "windows": {} } );

            push.on('registration', function(data) {
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


        /**
         * @desc Решает что делать с уведомлениями
         * @param notification obj - объект push уведомления
         * @return null
         */
        function messageProvider(notification) {

            $notificationService.getNotifications();

            if (notification.payload) {
                if (notification.payload.winner_status == "success") {

                    navigate.pushPage('view/other/help/winner/winner.html');

                    $toastService
                        .notification(notification.message);
                }else{
                    $notificationService
                        .notificationDialog(notification.message);
                }
            }
            $console.info(notification, 'pushService');
        }

        return scope.methods;

    }

})();