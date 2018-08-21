(function () {
    'use strict';
    angular.module('Data')
    .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http', '$q', 'ApiUrl'];
    function MenuDataService($http, $q, ApiUrl) {

        var service = this;

        var compare = (a,b) => {
            const A = a.name.toUpperCase();
            const B = b.name.toUpperCase();

            var comparison = 0;
            if (A > B) {
              comparison = 1;
            }                                 
            if (A < B) {
              comparison = -1;
            }
            return comparison;
        }


        service.getAllCategories = function() {

            var deferred = $q.defer();  

            $http({
                method: 'GET',
                url: (ApiUrl + '/categories.json')
            })
            .then(response => {
                deferred.resolve(response.data.sort(compare));
            })
            .catch(error => {
                deferred.reject(error);
            })

            return deferred.promise; 
            
        };

        service.getItemsForCategory = function(categoryShortName) {
            
            var deferred = $q.defer();    

            $http({
                method: 'GET',
                url: (ApiUrl + '/menu_items.json'),
                params: {
                    category: categoryShortName.toUpperCase() 
                }
            })
            .then(response => {
                var found = response.data.menu_items.sort(compare);
                
                if(found.length > 0)
                    deferred.resolve(found);
                else
                    deferred.reject("Nothing found");  
            });

            return deferred.promise;
        };
    }
})();