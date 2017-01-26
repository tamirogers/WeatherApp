(function() {
    'use strict';

    angular
        .module('weatherApp')
        .controller('weatherAppController', weatherAppController);

    weatherAppController.$inject = ['weatherAppFactory', 'toastr'];

    /* @ngInject */
    function weatherAppController(weatherAppFactory, toastr) {
        var vm = this;
        vm.title = 'weatherAppController';
        vm.searchHistory = [];
        var status;

        vm.getapi = function(city) {
            weatherAppFactory.getapi(city).then(
                function(response) {
                    vm.weatherResponse = response.data;
                    console.log(vm.weatherResponse);
                    vm.history();
                    vm.buttonH();
                    toastr.success('we have weather.');
                },
                function(error) {
                    if (error.data) {
                        toastr.error("there was a problem: " + error.data);
                    } else {
                        toastr.info('no data found.');
                    }
                }

            )
        };
//This function loops through the array in vm.searchHistory = [] setting the status to true of each city that 
//matches the city in the API.
        function cityCheck(city) {
            status = false;
            for (var i = 0; i < vm.searchHistory.length; i++) {

                if (vm.searchHistory[i].id == vm.weatherResponse.id) {
                    status = true;

                };

            }
            return status;


        }
        //This function makes sure no repeat cities can go into the search box.  After the cityCheck() function runs
        //and returns a status, the city will not go into the history if its status is false.

        vm.history = function() {

            cityCheck();
            vm.searchCity = '';
            if (status == false) {
                vm.searchHistory.push({ city: vm.weatherResponse.name, date: vm.date = new Date(), id: vm.weatherResponse.id });

            }

        };

        vm.buttonH = function() {

        }

    }

})();
