var express = require('express');
var mongoose = require('mongoose');

var app = express.createServer(express.logger());

mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds161475.mlab.com:61475/heroku_9xdrbk8n');

mongoose.model('member_info',{name: String},{author: String});



app.get('/users',function(req, res){
	
	/*mongoose.model('member_info').find(function(err, users) {
		res.write("하하하하");
		res.end();
	});*/
	
	res.write("하하하하");
	res.end();
});




app.get('/', function(req, res) {
  
  var chunk = '';

	//데이터를 가져옵니다.

	req.on('data', function(data){

	//데이터를 JSON으로 파싱합니다.

	chunk = JSON.parse(data);

	});

	req.on('end',function(){

	//파싱된 데이터를 확인합니다.

	//console.log("name : "+chunk.name + " , phone : "+chunk.phone);

		response.send("name : "+chunk.name + " , phone : "+chunk.phone);
		
		
	});


	// 아래의 OK라는 내용이 안드로이드의 ReadBuffer를 통해

	// result String으로 바뀝니다.

	res.write("OK");

	res.end();

});



app.post('/pushData', function(req, res){

	var chunk = '';

	//데이터를 가져옵니다.

	req.on('data', function(data){

	//데이터를 JSON으로 파싱합니다.

	chunk = JSON.parse(data);

	});

	req.on('end',function(){

	//파싱된 데이터를 확인합니다.

	console.log("name : "+chunk.name + " , phone : "+chunk.phone);

		response.send("name : "+chunk.name + " , phone : "+chunk.phone);
		
		
	});


	// 아래의 OK라는 내용이 안드로이드의 ReadBuffer를 통해

	// result String으로 바뀝니다.

	res.write("동규야 축하한다");

	res.end();
	});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
