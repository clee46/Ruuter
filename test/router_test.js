var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var fs = require('fs'); //eslint-disable-line
var request = chai.request;
var Router = require(__dirname + '/../lib/router.js');
var headMessage = require(__dirname + '/../lib/headMessage.js');
var http = require('http');

describe('router.js', function() {
  before(function(done) {
    this.router = new Router();
    done();
  });
  it('should create a router object with routes when the constructor method is called', function(done) {
    expect(this.router.routes.hasOwnProperty('GET')).to.eql(true);
    expect(typeof this.router.routes['GET']).to.eql('object');
    expect(this.router.routes.hasOwnProperty('POST')).to.eql(true);
    expect(typeof this.router.routes['POST']).to.eql('object');
    expect(this.router.routes.hasOwnProperty('PUT')).to.eql(true);
    expect(typeof this.router.routes['PUT']).to.eql('object');
    expect(this.router.routes.hasOwnProperty('PATCH')).to.eql(true);
    expect(typeof this.router.routes['PATCH']).to.eql('object');
    expect(this.router.routes.hasOwnProperty('DELETE')).to.eql(true);
    expect(typeof this.router.routes['DELETE']).to.eql('object');
    expect(this.router.routes.hasOwnProperty('FourOhFour')).to.eql(true);
    expect(typeof this.router.routes['FourOhFour']).to.eql('function');
    done();
  });
  it('should define a callback function for an http GET request and url that returns an expected value', function(done) {
    var date = Date.now().toString();
    this.router.get('/testget', function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(date);
      return res.end();
    });
    expect(typeof this.router.routes['GET']['/testget']).to.eql('function');

    var server = http.createServer(this.router.route());
    server.listen(3000);
    request('localhost:3000')
      .get('/testget')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(date);
        server.close();
        done();
      });
  });
});
