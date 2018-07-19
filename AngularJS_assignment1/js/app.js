(function(){
    'use strict';
  
    angular.module('lunchChecker', [])

    .controller('tooMuchController', tooMuchController);

    tooMuchController.$inject = ['$scope']; // dependency injection. Minification protection

    function tooMuchController($scope){

        $scope.message = "";
        $scope.dishesList = "";

        $scope.checkLunch = () => {
            
            let dishesCount =   $scope.dishesList.split(',')
                                .filter((item) => {return item.trim().length > 0}) // only not empty dishes names
                                .length;
    
            if(dishesCount > 3){
                $scope.message = "Too much!";
                $scope.color = "green";
                return;
            }

            if(dishesCount == 0){
                $scope.message = "Please enter data first";
                $scope.color = "red";
                return;
            }

            $scope.message = "Enjoy!";
            $scope.color = "green";

        };
    };

})();    