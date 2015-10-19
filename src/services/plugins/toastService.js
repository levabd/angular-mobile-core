(function () {

    angular
        .module('mobile-core')
        .factory('$toastService', toastService);

    /////////////////////////////////////

    toastService.$inject=['$cordovaToast', '$console'];

    function toastService($cordovaToast, $console) {

        var service = {
            info: info,
            notification: notification,
            error: error
        };

        /**
         * @desc Показывает сообщение снизу
         * @param message string - текст сообщения
         * @return null
         */
        function info(message){
            $cordovaToast
                .show(message, 'long', 'bottom');
        }

        /**
         * @desc Показывает сообщение сверху
         * @param message string - текст сообщения
         * @return null
         */
        function notification(message){
            $cordovaToast
                .show(message, 'long', 'top');
        }


        /**
         * @desc Показывает сообщение снизу
         * @param message string - текст сообщения
         * @param method string - имя метода, из которого вы вызываете error
         * @return null
         */
        function error(message, method){
            if (!method)
                method = '';

            $cordovaToast
                .show(message, 'long', 'bottom');

            $console.error(message, method);
        }

        return service;



    }


})();