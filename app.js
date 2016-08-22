var express = require('express');
var mongoose = require('mongoose');
var http = require ('http');  


var app = express.createServer(express.logger());


var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://<dbuser>:<dbpassword>@ds161475.mlab.com:61475/heroku_9xdrbk8n';

var theport = process.env.PORT || 5000;

mongoose.connect(uristring, function (err, res) {
    if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
    console.log ('Succeeded connected to: ' + uristring);
    }
  });

var userSchema = new mongoose.Schema({
    name: String,
    author: String
  });

var PUser = mongoose.model('member_info', userSchema);

var johndoe = new PUser ({
    name: '최동규',
    author: 'choidongkyu'
  });



johndoe.save(function (err) {
	if (err) console.log ('Error on save!');
	});




app.get('/member_info', function(req, res) {
	mongoose.model('member_info').find(function(err, member_info) {
		res.write("성공이닷!");
		res.end();
	});
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

	console.log("name : "+chunk.name + " , phone : "+chunk.phone);
		
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

	//console.log("name : "+chunk.name + " , phone : "+chunk.phone);

	//	res.send("name : "+chunk.name + " , phone : "+chunk.phone);
		
		
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
