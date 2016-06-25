var express = require('express');
var router = express.Router();
var rp = require('request-promise')
var apikey = process.env.APIKEY
var geokey = process.env.GEOKEY

router.get('/weather/:lat/:lon', function (req, res, next) {
  var options = {
    uri: 'http://api.openweathermap.org/data/2.5/forecast',
    qs: {
      lat: req.params.lat,
      lon: req.params.lon,
      appid: apikey,
    },
    json: true
  };
  getGeoWeather(options, req, res, next);
});

router.get('/weather-by-city/:city', function (req, res, next) {
  var options = {
    uri: 'http://api.openweathermap.org/data/2.5/find',
    qs: {
      q: req.params.city,
      appid: apikey,
    },
    json: true
  };

  getCityCoords(options, req, res, next)
  .then(function (result) {
    getGeoWeather(result, req, res, next)
  })  
  .catch(function (err) {
    return err;
  });
});

function getGeoWeather (options, req, res, next) {
  rp(options)
  .then(function (result) {
    res.status(200).json({
      status: 'success',
      weather: result
    });
  })
  .catch(function (err) {
    return next(err);
  });
}


function getCityCoords (options, req, res, next) {
  return rp(options)
    .then(function (result) {
      var options = {
        uri: 'http://api.openweathermap.org/data/2.5/forecast',
        qs: {
          lat: result.list[0].coord.lat,
          lon: result.list[0].coord.lon,
          appid: apikey,
        },
        json: true
      };
      return options;
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = router;
