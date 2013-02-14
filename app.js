
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , Facebook = require('facebook-node-sdk')
  , less = require('less')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(Facebook.middleware({ appId: '467787149936479', secret: '7ae29a827eed4814b435c746116b7a94' }));
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', Facebook.loginRequired({scope: ['user_photos', 'friends_photos', 'publish_stream', 'publish_actions']}), routes.index, routes.getPic);
app.post('/config/background', routes.background);
app.post('/config/music', routes.music);
app.get('/albums', routes.albums);
app.get('/albums/:albumid', routes.albumid);
app.get('/comments/:photoid', routes.photoComment);
app.post('/newcomment', routes.newcomment);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
