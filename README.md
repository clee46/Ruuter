# About Ruuter
A framework to make routing in Node easier

# Installation

```
npm install ruuter
```
# Getting Started
Ruuter consists of an HTTP router and helpful methods that streamline writing response headers and expand options for writing data to a new file. Here is the simplest way to implement Ruuter:

```javascript
const ruuter = require('ruuter');
var router = new ruuter.Router();
```

### Creating a new router: `.Router()`
The Router constructor function initializes a basic router object, and defines basic http methods (GET, POST, PUSH, DELETE, etc.)  to be contained within the main object.
The following example demonstrates typical implementation of this function.

```javascript
var ruuter = require('ruuter');
var Router = ruuter.Router();
```

### Writing a new file: `.headMessage(status, Content-Type, Status-Message)`
```
ruuter.headMessage(res, status, Content-Type, Status-Message);
```

Use the ruuter headMessage function to easily take in the status, content type, and status message of your REST requests as arguments. Once created, the function inserts itself into

The following example demonstrates the syntax for this function.

```javascript
var ruuter = require('ruuter');
var headMessage = ruuter.headMessage(res, 200, 'plain/text', 'Body message')
```

### Writing a new file: `.writeFile(path, ext, data,options[,callback])`
The ruuter writeFile function offers users a variety of options for naming and saving new files.

The following example demonstrates proper use of this function:

```javascript
var ruuter = require('ruuter');
var fileNamer = ruuter.writeFile(path, ext, data,options[,callback]);
```
`options` is an object or string with the following defaults:

```
{
  namingConvention: null,
  overwrite: null
}
```

When `options.namingConvention` equals ``‘date’``, the new file will be named using the current date, with the format: year-month-day (e.g. 2016-1-3).  

When `options.namingConvention` equals ``‘time’``, the new file will be named using the current time, with the format: hours-minutes-seconds-milliseconds (e.g. 15-8-3-5)).    
When `options.namingConvention` equals ``‘dateTime’``, the new file will be named using the current date and time (e.g. 2016-1-3_15-8-3-5).  

When `options.overwrite` equals `true`, the new file will overwrite any existing file with the same name.

When `options.overwrite` equals `false`, the new file will not overwrite any existing file with the same name.
