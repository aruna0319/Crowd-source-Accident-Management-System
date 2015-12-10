
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/index', routes.index);
app.get('/open', routes.open);
app.get('/client', routes.client);
app.get('/weather', routes.weather);
app.get('/analysis', routes.analysis);
app.get('/calender', routes.calender);
app.get('/chartjs', routes.chartjs);
app.get('/levels', routes.levels);
app.get('/morris', routes.morris);
app.get('/todo', routes.todo);
//app.get('/lock_screen', routes.lock_screen);
app.get('/logout', routes.logout);
//app.get('/help', routes.help);
app.get('/reports', routes.reports);
app.get('/heatmap', routes.heatmap);

app.post('/send', routes.send);
app.post('/signin', routes.signin);
app.post('/readData', routes.readData);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
