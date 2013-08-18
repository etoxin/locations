
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , https = require('https')
  , fs = require('fs')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var header = [
  '<!doctype html>'
  ,'<html lang="en">'
    ,'<head>'
      ,'<meta charset="utf-8">'
      ,'<title>Locations - etoxin</title>'
      ,'<meta name="description" content="Image with Audio.">'
      ,'<meta name="author" content="etoxin">'
      ,'<link rel="stylesheet" href="css/styles.css?v=1.0">'
      ,'<script src="scripts/locations.js"></script>'
    ,'</head>'
    ,'<body>'].join("\n");
var footer = [
   '</body>'
  ,'</html>'
].join("\n");

app.get('/', function (req, res) {
  res.send(header+footer);
})

app.get('/api/locations', function (req, res) {
  var feed;
  // get the contents of the folder
  fs.readdir('./content', function (fs_err, fs_res) {
    // if there is an error send and error.
    if(fs_err) {
      console.log(fs_err);
    }
    console.log(fs_res);
    feed = fs_res;
    res.send(feed);
  });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
