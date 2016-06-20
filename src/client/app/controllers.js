(function () {
  'use strict';

  angular
    .module('weatherApp')
    .controller('weatherCtrl', weatherCtrl);

  weatherCtrl.$inject = [];

  function weatherCtrl () {
    var vm = this;

    vm.test = 'hello world'
  }

})();