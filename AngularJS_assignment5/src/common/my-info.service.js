(function () {
    "use strict";
    
    angular.module('common')
    .service('MyinfoService', MyinfoService);

    function MyinfoService() {
        var service = this;
        var userInfo;
        service.setUserInfo = function(user) {
            userInfo = user;
        }

        service.getUserInfo = function() {
            return userInfo;
        }
    }
})();