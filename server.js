const path = require('path');
const express = require('express');
const app = express();

// if an incoming request uses a protocol other than HTTPS, redirect that request to the same url but with HTTPS
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  }
}

const isProduction = process.env.NODE_ENV === 'production';

// instruct the app to use the forceSSL middleware
if(isProduction) {
  app.use(forceSSL());
}

// run the app by serving the static files in the dist directory
app.use(express.static(__dirname + '/dist/resume'));

// for all GET requests, send back index.html so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/resume/index.html'));
});

// start the app by listening on the default Heroku port
const defaultPort = isProduction ? 8080 : 4200;
app.listen(process.env.PORT || defaultPort);
