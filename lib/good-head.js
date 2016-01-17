var fs = require('fs');
var http = require('http');

var headMessage = module.exports = exports = function(res, status, ctype, bodyMsg) {
  if (status.toString() !== '404' && ctype === 'text/plain' && Number.isInteger(status)) {
    res.writeHead(status, {'Content-Type': ctype});
    res.write(bodyMsg);
  }
  else if (status.toString() !== '404' && ctype === 'application/json' && Number.isInteger(status)) {
    res.writeHead(status, {'Content-Type': ctype});
    res.write(JSON.stringify({msg: bodyMsg}));
  }
  else if (status.toString() === '404' && ctype === 'application/json' && Number.isInteger(status)) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('Page not found ');
  }
  else {
    res.writeHead(404, {ctype: 'text/plain'});
    var errMessage = 'Error during headMessage()\r\n' +
    'Need valid status response\r\n' +
    '\r\n';
    res.write(errMessage);
  }
  return res;
};
