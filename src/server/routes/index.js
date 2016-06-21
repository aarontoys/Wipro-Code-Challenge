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
      units: 'imperial'
    },
    json: true
  };

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
});

router.get('/weather-by-city/:city', function (req, res, next) {
  var options = {
    uri: 'http://api.openweathermap.org/data/2.5/forecast',
    qs: {
      q: req.params.city,
      appid: apikey,
      units: 'imperial'
    },
    json: true
  };

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
})

router.get('/geo', function (req, res, next) {
  var options = {
    method: 'POST',
    uri: 'https://www.googleapis.com/geolocation/v1/geolocate',
    qs: {
      key: geokey
    },
    json: true
  };

  rp(options)
  .then(function (result) {
    res.status(200).json({
      status: 'success',
      geo: result
    })
  })
  .catch(function (err) {
    return next(err);
  });
})

module.exports = router;
