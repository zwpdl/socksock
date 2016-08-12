
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
app.listen(process.env.PORT || 8080, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
app.set('views', __dirname + 'views');
app.set('view engine', 'jade');


app.all('*',function(req, res){
	res.render(
	'index',
	{msg: 'welcome to the party'}
	);
	
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express.js server listening on port ' + app.get('port'));
});
