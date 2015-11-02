(function(){

    var debug    = true;
    var original = window.console;

    window.console = {
        history: [],
        pushHistory: function(method, arguments){
            var date = new Date();
            var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds();

            window.console.history.push({
                time: time,
                method: method,
                arguments: arguments
            });
        }
    };

    ['log', 'error', 'info', 'dir'].forEach(function (method) {
        console[method] = function () {
            if (debug && original){

                window.console.pushHistory(method, arguments);

                return original[method].apply(original, arguments);
            }

        }
    });

    console['forceLog'] = function(){
        return original['log'].apply(original, arguments);
    };

    console['onlyLog'] = function(){
        window.console.pushHistory('$console', arguments);
    };

    window.onerror = function(msg, url, line, col, error){

        window.console.pushHistory('Exception Error', {
            msg: msg,
            url: url,
            line: line,
            col: col,
            error: error
        } );


    }

})();