(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menu/home.template.html'
  })

  // Categories list
  .state('categories', {
    url: '/categories',
    component: 'categories',
    resolve: {
      items: function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }  
    }  
  })
  // Items list
  .state('items', {
    url: '/items/{categoryId}',
    component: 'items',
    resolve: {
      categoryShortName: function($transition$) {
        return $transition$.params().categoryId;
      },
      items: function(MenuDataService, $transition$) {
        return MenuDataService.getItemsForCategory($transition$.params().categoryId);
      }
    }

  });
}

})();
