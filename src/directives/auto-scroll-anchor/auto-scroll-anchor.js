(function(){

    angular
        .module('mobile-core')
        .directive('autoScrollAnchor', autoScrollAnchor );

    ///////////////////////////

    function autoScrollAnchor() {
        var autoScrollAnchor = {
            restrict: 'A',
            controller: function ($scope, $element, $location, $anchorScroll, $timeout) {

                $element.on('click', function(e){

                    $timeout(function(){
                        anchor();
                    }, 100);
                    $timeout(function(){
                        anchor();
                    }, 200);

                });

                function hasClass(element, cls) {
                    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
                }

                function anchor(){
                    var parent = $element[0].parentNode;
                    if (!hasClass(parent, 'edit-text')){
                        parent = parent.parentNode;
                    }
                    parent.id = 'scrollToElement';
                    $location.hash('scrollToElement');
                    $anchorScroll();
                    parent.id = '';
                    $location.hash('');

                    $timeout(function(){


                        if (!cordova.plugins.Keyboard.isVisible){
                            $element[0].focus();
                            cordova.plugins.Keyboard.show();
                        }

                    }, 500);
                }
            }
        };
        return autoScrollAnchor
    }


})();