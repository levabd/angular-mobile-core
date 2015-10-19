(function () {

    angular
        .module('mobile-core')
        .factory('$notificationService', notificationService);

    /////////////////////////////////////

    notificationService.$inject=['$server','$rootScope','$toastService', '$console', 'localStorageService', '$injector'];

    function notificationService($server,  $rootScope, $toastService, $console, localStorageService, $injector) {
        var scope = this;

        initNotifications();

        scope.methods = {
            getNotifications: getNotifications,
            removeNotification: removeNotification,
            readNotification:  readNotification,
            notificationDialog: notificationDialog
        };

        ////////////////////////////////////


        /**
         * @desc Подготовить уведомления, подгрузить их локально если есть.
         * @return null
         */
        function initNotifications(){
            $rootScope.notifications = [];
            if (localStorageService.get('notifications')) {
                $rootScope.notifications = localStorageService.get('notifications');
                $rootScope.newNotifications = _.where($rootScope.notifications, {read: false}).length;
            }
        }

        /**
         * @desc Показать диалог, выбор (ок, читать подробнее)
         * @param message string - текст сообщения
         * @return null
         */
        function notificationDialog(message){
            var $langService = $injector.get('$langService');

            ons.notification.confirm({
                title: $langService.getMessage('notification'),
                message: message,
                buttonLabels: ["OK", $langService.getMessage('read_more')],
                callback: function(idx) {
                    switch(idx) {
                        case 0:

                            break;
                        case 1:
                            if($console.instance() != 'notificationController'){
                                navigate.pushPage('view/user/notification/notification.html');
                            }
                            break;
                    }
                }
            });
        }


        /**
         * @desc Получить список уведомлений
         * @param params obj - параметры
         * @param params.success function - callback если успешно
         * @param params.error function - callback если ошибка
         * @return null
         */
        function getNotifications(params){
            if (!params)
                params = {};

            $server.get({
                url: 'user/notifications',
                preloader: params.preloader,
                offline_data: {notifications: $rootScope.notifications}
            }).then(
                function success(data) {

                    $rootScope.notifications = data.notifications;

                    localStorageService.set('notifications', $rootScope.notifications);

                    $rootScope.newNotifications = _.where($rootScope.notifications, {read: false}).length;

                    if (typeof params.success === 'function') {
                        params.success(data.notifications);
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


        /**
         * @desc Удалить сообщение
         * @param params obj - параметры
         * @param params.success function - callback если успешно
         * @param params.error function - callback если ошибка
         * @param params.id int - номер уведомления
         * @return null
         */
        function removeNotification(params){
            if (!params)
                params = {};

            if (params.id) {

                $server.post({
                    url: 'user/notifications',
                    data: {
                        id: params.id,
                        followed_at: Math.floor(Date.now() / 1000)
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
            else {
                $toastService.error("Id is empty", 'removeNotification');
            }
        }


        /**
         * @desc Пометить сообщение как прочитанное
         * @param params obj - параметры
         * @param params.success function - callback если успешно
         * @param params.error function - callback если ошибка
         * @param params.id int - номер уведомления
         * @return null
         */
        function readNotification(params){
            if (!params)
                params = {};

            if (params.id){
                $server.post({
                    url: 'user/read',
                    data: {
                        id: params.id
                    }
                }).then(
                    function success(data) {

                        scope.methods.getNotifications();

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
            else {
                $toastService.error("Id is empty", 'readNotification');
            }
        }


        return scope.methods;
    }

})();