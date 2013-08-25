
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , https = require('https')
  , fs = require('fs')
  , path = require('path')
  , async = require('async')
  , $ = require('jquery');

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.use("/stylesheets", express.static(__dirname + '/stylesheets'));
app.use("/scripts", express.static(__dirname + '/scripts'));
app.use("/content", express.static(__dirname + '/content'));
app.use("/partials", express.static(__dirname + '/partials'));
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
  ,'<html lang="en" ng-app="locations">'
  ,'  <head>'
  ,'    <meta charset="utf-8">'
  ,'    <title>Locations - etoxin</title>'
  ,'    <meta name="description" content="Image with Audio.">'
  ,'    <meta name="author" content="etoxin">'
  ,'    <link href="http://fonts.googleapis.com/css?family=Oswald:400,700,300" rel="stylesheet" type="text/css">'
  ,'    <link href="stylesheets/locations.css?v=1.1" rel="stylesheet">'
  ,'    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>'
  ,'    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>'
  ,'    <script src="scripts/locations.js"></script>'
  ,'  </head>'
  ,'  <body>'].join("\n");

var footer = [
   '  </body>'
  ,'</html>'].join("\n");

app.get('/', function (req, res) {
  var body = [
    '<div class="wrapper">'
    ,'  <header>'
    ,'    <h1>LOCATIONS</h1>'
    ,'  </header>'
    ,'  <div ng-view></div>'
    ,'  <footer>'
    ,'    <p>a website by <a href="http://etoxin.net">etoxin</a></p>'
    ,'  </footer>'
    ,'</div>'
  ].join("\n");
  res.send(header + body + footer);
})

// returns the folders with content
app.get('/api/locations', function (req, res) {
  res.contentType('application/json');
  var feed = [];
  // an example using an object instead of an array
  async.series([
      function(callback){
        // get the contents of the folder
        fs.readdir('./content', function (fs_err, fs_res) {
          // if there is an error send and error.
          if(fs_err) {
            console.log(fs_err);
          }
          var arr_length = fs_res.length;
          fs_res.forEach(function(item, index){
            fs.readdir('./content/' + item, function (fss_err, fss_res) {
              feed.push({
                'name': item,
                'imagePath': '/content/'+item+'/'+fss_res[0],
                'audioPath': '/content/'+item+'/'+fss_res[1]
              });
              if(feed.length == arr_length - 1){
                callback();
              }
            });
          });
        });
      },
      function(callback){
        res.json(feed);
        callback();
      }
  ]);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
