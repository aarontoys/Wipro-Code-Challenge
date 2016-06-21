(function () {
  'use strict';

  angular
    .module('weatherApp')
    .directive('weather', weather);

  function weather () {
    return {
      restrict: 'EA',
      templateUrl: 'app/weather.view.html',
      controller: 'weatherCtrl',
      controllerAs: 'vm'
    };
  };
})();