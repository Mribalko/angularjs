(function () {
    'use strict';

    angular.module('MenuApp')
    .component('items', {
        templateUrl: 'src/menu/items.template.html',
        bindings: {
            items: '<',
            categoryShortName: '<'
        }
    })
})();