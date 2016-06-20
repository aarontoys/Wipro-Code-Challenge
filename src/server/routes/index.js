var express = require('express');
var router = express.Router();
var rp = require('request-promise')
var apikey = process.env.APIKEY

router.get('/weather', function(req, res, next) {
  var options = {
    uri: 'http://api.openweathermap.org/data/2.5/forecast',
    qs: {
      lat: '39.695605',
      lon: '-104.844136',
      appid: apikey,
      units: 'imperial'
    } 
  }

  rp(options)
  .then(function(result){
    res.status(200).json({
      status: 'success',
      weather: JSON.parse(result)
    })
  })
  .catch(function(err) {
    return err;
  })
});

module.exports = router;
