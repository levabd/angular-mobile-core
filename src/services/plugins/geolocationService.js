(function () {

    angular
        .module('mobile-core')
        .run(geolocationService);

/////////////////////////////////////


    geolocationService.$inject=['$mobileConfig', '$console'];

    function geolocationService($mobileConfig, $console){


        // Следим за изменениями геолокации
        var watchGeolocation = navigator.geolocation.watchPosition(

            // Геолокация была успешно получена
            function success(position) {
                if (position.coords.latitude) {
                    $mobileConfig.setConfig({
                        headers: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy
                        }
                    });
                }

            },

            // Ошибка получения геолокации
            function error(error){
                $mobileConfig.setConfig({
                    headers: {
                        latitude: null,
                        longitude: null,
                        accuracy: null
                    }
                });

                $console.info({
                    geolocation: 'error',
                    code: error.code,
                    message: error.message
                }, 'geolocationService');
            },

            // Настроки
            {
                maximumAge: 10000,
                timeout: 5000,
                enableHighAccuracy: true
            }
        );

    }

})();