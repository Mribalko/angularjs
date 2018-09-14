(function () {
    "use strict";
    
    angular.module('public')
    .directive('existMenuItem', existMenuItem);

    existMenuItem.$inject = ['MenuService', '$q'];
    function existMenuItem(MenuService, $q) {
        
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$asyncValidators.existMenuItem = function(modelValue, viewValue) {
                    
                    if (ctrl.$isEmpty(modelValue)) {
                        return $q.when();
                    }
    
                    return MenuService.checkMenuItem(modelValue);
    
                }
            }
        }
    }

})();