(function () {

  angular
    .module('weatherApp')
    .filter('degrees', degrees);

    function degrees () {
      return function (temp, deg) {
        if (deg === 'C') {
          return temp = temp - 273.15;
        } 
        else if (deg === 'F') {
          return temp = temp * 9/5 - 459.67;
        }
      }
    }
})();