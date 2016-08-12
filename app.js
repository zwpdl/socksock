
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
app.set('views', __dirname + 'views');
app.set('view engine', 'jade');


app.all('*',function(req, res){
	res.render(
	'index',
	{msg: 'welcome to the party'}
	);
	
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express.js server listening on port ' + app.get('port'));
});
