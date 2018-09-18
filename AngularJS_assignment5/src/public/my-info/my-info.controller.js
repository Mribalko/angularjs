(function () {
    "use strict";
    
    angular.module('public')
    .controller('MyinfoController', MyinfoController);

    MyinfoController.$inject = ['userInfo', 'favoriteDishData'];
    function MyinfoController(userInfo, favoriteDishData) {
        var $ctrl = this;
        $ctrl.menuItem = favoriteDishData;
        $ctrl.info = userInfo;

    }

})();