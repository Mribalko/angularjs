(function () {
    'use strict';
    angular.module('ShoppingListApp', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


    
    function ShoppingListCheckOffService(){
        var service = this;

        // List of shopping items
        var buyItems = [
            { name: "cookies", quantity: 1 },
            { name: "soft drinks bottles", quantity: 2 },
            { name: "apples", quantity: 4 },
            { name: "tomatos", quantity: 3 },
            { name: "packs of juice", quantity: 6 },
            { name: "bottles of milk", quantity: 8 }
        ];

        var boughtItems = [];
               
        service.getBuyItems = function() {
            return buyItems;
        };

        service.getBoughtItems = function() {
            return boughtItems;
        };

        service.checkOff = function(itemIndex) {        
            boughtItems.push(buyItems[itemIndex]);
            buyItems.splice(itemIndex, 1);      
        }
    }


    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var buyList = this;

        buyList.items = ShoppingListCheckOffService.getBuyItems();
       

        buyList.checkOff = function(itemIndex) 
            { 
                ShoppingListCheckOffService.checkOff(itemIndex);
            };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var checkOffList = this;

        checkOffList.items = ShoppingListCheckOffService.getBoughtItems();

    }


})();