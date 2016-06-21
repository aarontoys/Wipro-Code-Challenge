var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app');
var should = chai.should();

chai.use(chaiHttp);

describe('weather route', function () {
  it('should get the weather for a city', function (done) {
    chai.request(server)
    .get('/weather')
    .end(function (err, res) {
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('weather');
      res.body.status.should.equal('success');
      res.body.weather.should.be.a('object');
      res.body.weather.city.name.should.equal('Denver');
      res.body.weather.list.should.be.a('array');
      res.body.weather.list.length.should.equal(40);
      done()
    })
  })
})