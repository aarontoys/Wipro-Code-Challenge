(function () {

  angular
    .module('weatherApp')
    .service('getWeatherService', getWeatherService);

  getWeatherService.$inject = ['$http', '$window'];

  function getWeatherService ($http, $window) {
    return {
      getWeather: function (lat, lon) {
        return $http.get('/weather/'+lat+'/'+lon)
        .then(function (res) {
          groupByDay(res);
          return res;
        })
        .catch(function (err) {
          return err;
        }); 
      },
      getWeatherByCity: function (city) {
        return $http.get('weather-by-city/'+city)
        .then(function (res) {
          groupByDay(res);
          return res;
        })
      },
    };
  };

  function groupByDay (obj) {
    obj.data.weather.list.forEach(function (el) {
      el.day = new Date(el.dt*1000).getDate();
    });
  };

})();