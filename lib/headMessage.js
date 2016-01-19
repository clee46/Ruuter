var fs = require('fs');
var http = require('http');

/*headMessage will take in four arguments: response, status, content-type, and msg
All params are necessary to use the function, otherwise a 404 message will execute,
which will prompt for valid arguments.
User has the oprtion to use 404 messages by default.
*/
var headMessage = module.exports = exports = function(res, status, ctype, bodyMsg) {
  if (status.toString() !== '404' && ctype === 'text/plain' && Number.isInteger(status)) {

    res.writeHead(status, {'Content-Type': ctype});
    res.write(bodyMsg);
  }
  else if (status.toString() !== '404' && ctype === 'application/json' && Number.isInteger(status)) {
    res.writeHead(status, {'Content-Type': ctype});
    res.write(JSON.stringify({msg: bodyMsg}));
  }
  else if (status.toString() === '404' && ctype === 'text/plain' && Number.isInteger(status)) {
    res.writeHead(404, {
      'Content-Type': 'text/plain'});
    res.write(bodyMsg);
    return res.end();
  }
  else if (status.toString() === '404' && ctype === 'application/json' && Number.isInteger(status)) {
    res.writeHead(status, {'Content-Type': ctype});
    res.write(JSON.stringify({msg: bodyMsg}));
    return res.end();
  }
  else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    var errMessage = 'Error during headMessage()';
    res.write(errMessage);
    return res.end();
  }
  return res;
};
