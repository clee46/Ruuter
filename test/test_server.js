const Router = require(__dirname + '/../ruuter');
const http = require('http');
const fs = require('fs');
const goodHead = require(__dirname + '/../lib/good-head');
const fileNamer = require(__dirname + '/../lib/fileNamer');

var router = new Router();
var requestCount = 0;

router.get('/', function(req, res) {
  goodHead(res, 200, 'text/plain', 'test stuff yee');
  // res.writeHead(200, {'Content-Type': 'text/plain'});
  // res.write('Hello world ');
  return res.end();
});

// router.get('/greet', function(req, res) {
//   goodHead(res, 200, 'text/plain', 'Hello user ');
//   // res.writeHead(200, {'Content-Type': 'text/plain'});
//   // res.write('Hello user ');
//   return res.end();
// });

router.post('/', function(req, res) {
  // var requestFile = '/../data/' + ++requestCount + '.json';
  // var filestream = fs.createWriteStream(__dirname + requestFile);
  var resBody = '';
  // req.pipe(filestream);
  req.on('data', (chunk) => {
    resBody += chunk;
  });
  req.on('end', () => {
    goodHead(res, 200, 'text/plain', 'Hello user');
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    // res.write('Hello, user ' + (JSON.parse(resBody).name));
    return res.end();
  });
});

var server = http.createServer(router.route());
server.listen(3000, () => console.log('server up'));//eslint-disable-line
