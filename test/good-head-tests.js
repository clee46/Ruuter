const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const fs = require('fs');//eslint-disable-line
const request = chai.request;

describe('goodHead functionality', () => {

  it('should get a response', (done) => {
    request('/localhost:3000')
      .get('/test1')
      .end((err, res) => {
        expect(err).to.eql(null)
        expect(res).to.have.status(200)
        expect(res.text).to.eql('test first')
      });
  });

  it('should get a response', (done) => {
    request('/localhost:3000')
      .get('/test2')
      .end((err, res) => {
        expect(err).to.eql(null)
        expect(res).to.have.status(200)
        expect(res.text).to.eql('test second')
      });
  });

});
