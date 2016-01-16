const fs = require('fs');

var otherArray = ["item1", "item2"];
var otherObject = { item1: "item1val", item2: "item2val" };
var json = JSON.stringify({
  anObject: otherObject,
  anArray: otherArray,
  another: "item"
});

var headMessage = module.exports = exports = function(res, status, ct, bodyMsg) {
  if (status.toString() !== '404' && ct === 'text/plain' && Number.isInteger(status)) {
    res.writeHead(status, {'Content-Type': ct});
    res.write(bodyMsg);
    debugger;
  }
  else if (status.toString() !== '404' && ct === 'application/json' && Number.isInteger(status)) {
    var contentType = ct.toString();
    res.writeHead(status, {'Content-Type': ct});
    res.write(JSON.stringify({msg: bodyMsg}));
  }
  else if (status.toString() === '404' && ct === 'application/json' && Number.isInteger(status)) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('Page not found ');
  }
  else {
    res.writeHead(404, {ct.toString(): 'text/plain'});
    var errMessage = 'Error during headMessage()\r\n' +
    'Need valid status resonse\r\n' +
    '\r\n'
    res.write(errMessage);
  }
};

console.log(headMessage(json, 200, 'text/plain', 'Hello world'));
