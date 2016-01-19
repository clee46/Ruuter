
// var options = {
//   namingConvention: 'date',
//   overwrite: true
// }

var FileNamer = function() {
  this.fs = require('fs');
  this.mkdirp = require('mkdirp');
}

FileNamer.prototype.writeFile = function(path, ext, data, options) {
  var name = 'untitled';
  if (ext[0] !== '.') ext = '.' + ext;
  if (options.namingConvention === 'date') name = ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate() + '-' + (new Date()).getFullYear();
  if (options.namingConvention === 'time') name = (new Date()).getHours() + '-' + (new Date()).getMinutes() + '-' + (new Date()).getSeconds();
  if (options.namingConvention === 'dateTime') name = ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate() + '-' + (new Date()).getFullYear() + '_' + (new Date()).getHours() + '-' + (new Date()).getMinutes() + '-' + (new Date()).getSeconds();

  var fileName = path + name + ext;

  this.fs.readdir(path, function(err) {
    if(err) this.mkdirp.sync(path);
    this.fs.access(fileName, function(errF) { // check file exists
      if(errF) this.fs.writeFileSync(fileName, data);  // if file no exist, write file
      if(options.overwrite) { // if user wants to overwrite
        this.fs.access(fileName, fs.W_OK, function(errW) {  // check file is writeable
          if(errW) throw errW;
          this.fs.writeFileSync(fileName, data);
        });
      }
    });
  });
};
