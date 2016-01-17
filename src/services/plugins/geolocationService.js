(function () {

    angular
        .module('mobile-core')
        .run(geolocationService);

/////////////////////////////////////


    geolocationService.$inject=['$mobileConfig', '$console'];

    function geolocationService($mobileConfig, $console){

        document.addEventListener("deviceready", function(){

            var config = {
                maximumAge: 10000,
                timeout: 5000,
                enableHighAccuracy: true
            };

            var platform = device.platform.toLowerCase();

            if (platform == 'ios'){
                config = {
                    
                }
            }


            var 
                watcherErrorCallback = function(error){

                    $console.info({
                        geolocation: 'error',
                        code: error.code,
                        message: error.message
                    }, 'geolocationService');

                    navigator.geolocation.clearWatch(watcher);
                    if (error.code != 1){
                        watcher = navigator.geolocation
                            .watchPosition( watcherSuccessCallback,
                            watcherErrorCallback,
                            config );
                    }

                },

                watcherSuccessCallback = function(position){

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

                watcher = navigator.geolocation
                            .watchPosition( watcherSuccessCallback,
                                            watcherErrorCallback,
                                            config );

        }, false);

    }
        

})();