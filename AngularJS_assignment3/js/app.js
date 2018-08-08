(function () {
    'use strict';
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiUrl', "https://davids-restaurant.herokuapp.com")
    ;

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'templates/foundItems.html',
            restrict: 'E',
            scope: {
                items: '<',
                onRemove: '&',
                error: '<'
            }
        };

        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {

        var searchBar = this;
        searchBar.searchTerm = "";
        searchBar.found = "";
        searchBar.errorMessage = "";
       
        searchBar.search = function(searchTerm) {            
            MenuSearchService.getMatchedMenuItems(searchTerm.toLowerCase())
            .then(result => {
                searchBar.found = result;
                searchBar.errorMessage = "";
            })
            .catch(error => {
                searchBar.errorMessage = error;
                searchBar.found = "";
            }); 
        }

        searchBar.removeItem = function(itemIndex) {
            searchBar.found.splice(itemIndex, 1);
        }
    }


    MenuSearchService.$inject = ['$http', '$q', 'ApiUrl'];
    function MenuSearchService($http, $q, ApiUrl) {
        
        var service = this;
        

        service.getMatchedMenuItems = function(searchTerm) {

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: (ApiUrl + "/menu_items.json")
            })
            .then(response => {                
                var found = response.data.menu_items
                            .filter(item => item.description.toLowerCase().indexOf(searchTerm) > 0)
                            .sort((a,b) => {
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
                            
                            });

                if(found.length > 0)
                    deferred.resolve(found);
                else
                    deferred.reject("Nothing found");                
            });

            return deferred.promise;
        }        
    
    };
})();