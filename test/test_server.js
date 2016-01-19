var Router = require(__dirname + '/../lib/good-router');
var http = require('http');
var fs = require('fs');
var goodHead = require(__dirname + '/../lib/good-head');


var router = new Router();
var requestCount = 0;

router.get('/test1', function(req, res) {
  goodHead(res, 200, 'text/plain', 'test stuff 1 ');
  return res.end();
});

router.get('/test2', function(req, res) {
  goodHead(res, 200, 'application/json', 'test stuff 2');
  return res.end();
});

router.post('/data/', function(req, res) {
  var requestFile = '/../data/' + ++requestCount + '.json';
  var filestream = fs.createWriteStream(__dirname + requestFile);
  var resBody = '';
  req.pipe(filestream);
  req.on('data', function(chunk) {
    resBody += chunk;
  });
  req.on('end', function() {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello, user ' + (JSON.parse(resBody).name));
    return res.end();
  });
});

var server = http.createServer(router.route());
module.exports = exports = server.listen(3000, function() {console.log('server up')});//eslint-disable-line
