
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
app.use("/stylesheets", express.static(__dirname + '/stylesheets'));
app.use("/scripts", express.static(__dirname + '/scripts'));
app.use("/content", express.static(__dirname + '/content'));
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
  ,'  <head>'
  ,'    <meta charset="utf-8">'
  ,'    <title>Locations - etoxin</title>'
  ,'    <meta name="description" content="Image with Audio.">'
  ,'    <meta name="author" content="etoxin">'
  ,'    <link href="http://fonts.googleapis.com/css?family=Oswald:400,700,300" rel="stylesheet" type="text/css">'
  ,'    <link href="stylesheets/locations.css?v=1.1" rel="stylesheet">'
  ,'    <script src="scripts/locations.js"></script>'
  ,'  </head>'
  ,'  <body>'].join("\n");
var footer = [
   '  </body>'
  ,'</html>'
].join("\n");

app.get('/', function (req, res) {
  var body = [
    '<div class="wrapper">'
    ,'  <header>'
    ,'    <h1>LOCATIONS</h1>'
    ,'  </header>'
    ,'  <div class="main"></div>'
    ,'  <footer>'
    ,'    <p>a website by <a href="http://etoxin.net">etoxin</a></p>'
    ,'  </footer>'
    ,'</div>'
  ].join("\n");
  res.send(header + body + footer);
})

// returns the folders with content
app.get('/api/locations', function (req, res) {
  var feed = [];

  // get the contents of the folder
  fs.readdir('./content', function (fs_err, fs_res) {

    // if there is an error send and error.
    if(fs_err) {
      console.log(fs_err);
    }

    // read the sub directory
    var length = fs_res.length;
    for (var i = 0; i < length; i++) {
      var element = fs_res[i];      
      fs.readdir('./content/' + fs_res[i], function (fss_err, fss_res) {
        // if there is an error send an error.
        console.log(element);
        feed.push({
          'name': element,
          'imagePath': '/content/'+fss_res[0],
          'audioPath': '/content/'+fss_res[1]
        });
        // console.log(feed);
      });
    }
    res.send('{'+feed+'}');

  });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
