(function () {

    angular
        .module('mobile-core')
        .factory('$console', logger);

    /////////////////////////////////////

    function logger() {
        var controllers = [];

        var service = {
            instance: instance,
            clearInstance: clearInstance,
            backInstance: backInstance,
            info: info,
            log: info,
            error: error
        };

        function instance(controllerName){
            // SETTER
            if (controllerName){

                controllers.push(controllerName);

            }else
            // GETTER
            if(controllers.length > 0){
                return controllers[controllers.length - 1];
            }else{
                return null;
            }
        }

        function clearInstance(){
            controllers = ['AppController'];
        }

        function backInstance(){
            if (controllers.length > 1){
                controllers.pop();
            }
        }

        function info(message, method){
            if (!method)
                method = '';

            _logMessage(message, method, 'info');

        }

        function error(message, method){
            if (!method)
                method = '';

            _logMessage(message, method, 'error');

            if (method== '')
                method = 'Unknown method';

        }

        // PRIVATE
        function _logMessage(message, method, type){
            var date = new Date();
            var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds();

            if (window.preConfiguration.chromium)
                log((type=='error' ? '[c="color: red"]' : '[c="color: black"]') + type.toUpperCase() + '[c]: [c="color: #5B5FF1"]'+ time +'[c] - [c="color: #379E1C"]' + service.instance() + '[c]::[c="color: #DA730F"]' + method  +'[c]( \n\t', message, '\n );');
            else{
                switch(type){
                    case 'error':
                        console.error(type.toUpperCase() + ': ' + time + ' - ' + service.instance() + '::' + method + '( ' + JSON.stringify(message, null, '\t').replace(/\n/g,"\n\t") +  '\n );');
                    break;
                    case 'info':
                        console.log(type.toUpperCase() + ': ' + time + ' - ' + service.instance() + '::' + method + '( ' + JSON.stringify(message, null, '\t').replace(/\n/g,"\n\t") +  '\n );');
                    break;
                    default:
                        console.log(type.toUpperCase() + ': ' + time + ' - ' + service.instance() + '::' + method + '( ' + JSON.stringify(message, null, '\t').replace(/\n/g,"\n\t") +  '\n );');
                    break;
                }

            }
        }

        return service;



    }


})();