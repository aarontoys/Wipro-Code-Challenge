(function () {
  'use strict';

  angular
    .module('weatherApp')
    .controller('weatherCtrl', weatherCtrl);

  weatherCtrl.$inject = ['getWeatherService'];

  function weatherCtrl (getWeatherService) {
    var vm = this;

    // getGeoLocation();
    geoLocation();

    vm.getWeatherByCity = function () {
      getWeatherService.getWeatherByCity(vm.city)
      .then(function (result) {
        vm.city = result.data.weather.city.name;
        vm.weather = result.data.weather.list;
      })
      .catch(function (err) {
        return err;
      });
    }

    vm.findMid = function(val) {
      if(val % 2) {
        return (val + 1)/2;
      } else {
        return val/2;
      };
    };
    
    function getWeather (lat, lon) {
      getWeatherService.getWeather(lat, lon)
      .then(function (result) {
        vm.city = result.data.weather.city.name;
        vm.weather = result.data.weather.list;
      })
      .catch(function (err) {
        return err;
      });
    }

    function getGeoLocation () {
      console.log('line30');
      getWeatherService.getGeoLocation()
      .then(function (result) {
        var lat = result.data.geo.location.lat;
        var lon = result.data.geo.location.lng;
        getWeather(lat, lon)
      })
      .catch(function (err) {
        return err;
      });
    };

    function geoLocation () {
      if (navigator.geolocation) {
        console.log(navigator.geolocation.getCurrentPosition());
      }
    }

  };

})();