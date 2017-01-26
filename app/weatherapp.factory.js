(function() {
    'use strict';

    angular
        .module('weatherApp')
        .factory('weatherAppFactory', weatherAppFactory);

    weatherAppFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function weatherAppFactory($http, $q) {
        var service = {
            getapi: getapi
        };
        return service;

        //////////////// q is the city property from the API, imperial is how to get farenhieght 

        function getapi(searchCity) {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: 'http://api.openweathermap.org/data/2.5/weather',
                params: {

                    APPID: "9e4580812e939d734f92842974889f78",
                    q: searchCity,
                    units: 'imperial'

                }


            })

            .then(function(response) {

                    if (typeof response.data === "object") {
                        defer.resolve(response);
                    } else {
                        defer.reject('no data found.')
                    }
                },

                function(error) {
                    console.log(error);
                    defer.reject(error);

                });
            return defer.promise;
        }
    }


})();
