var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var fs = require('fs');//eslint-disable-line
var request = chai.request;

describe('goodHead functionality', () => {

  before(function(done) {
    this.server = require(__dirname + '/test_server');
    done();
  });

  after(function(done) {
    this.server.close(done);
  });

  it('should get a response in plain text', (done) => {
    request('localhost:3000')
      .get('/test1')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('test stuff 1 ');
        done();
      });
  });

  it('should get a response in JSON', (done) => {
    request('localhost:3000')
      .get('/test2')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('{"msg":"test stuff 2"}');
        done();
      });
  });

  it('should receive a 404 response in JSON', (done) => {
    request('localhost:3000')
      .get('/doesnotexist')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.text).to.eql('tester');
        done();
      });
  });

});
