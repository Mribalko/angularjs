(function () {
    "use strict";
    
    angular.module('public')
    .controller('SignupController', SignupController);
    
    SignupController.$inject = ['MyinfoService'];
    function SignupController(MyinfoService) {
      var $ctrl = this;

      $ctrl.submitResult = false;
      $ctrl.showNoMenuItemError = "";
      
      $ctrl.submit = function() {
        MyinfoService.setUserInfo($ctrl.info);
        $ctrl.submitResult = true;
      };
      
    }
    
})();