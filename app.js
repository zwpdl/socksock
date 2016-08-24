var express = require('express');
var mongoose = require('mongoose');
var http = require ('http');  


var app = express();


var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://dongkyu:88268826@ds161475.mlab.com:61475/heroku_9xdrbk8n';

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


app.post('/member_insert', function(req, res) {
		var jsonData = "";
		var id_exist = false;
	 
		req.on('data', function (chunk) {
			jsonData += chunk;
		});
	 
		req.on('end', function () {
		var reqObj = JSON.parse(jsonData);
	
		PUser.findOne({'name':reqObj.response.email},function(err,result){
		if(err){
			console.err(err);
			throw err;}
		if(!result.isempty){
			id_exist = true;}
		});
		
		if(id_exist === true){
			var jo = new PUser({
			name : ""+reqObj.response.email,
			author : ""+reqObj.response.age
				});
		
				jo.save(function (err) {
					if (err) console.log ('Error on save!');
					});
				}
		res.writeHead(200);
		res.end();
		});
		
		
		
	
});


/*
johndoe.save(function (err) {
	if (err) console.log ('Error on save!');
	});*/


	PUser.find(function(err, docs) {
	
	console.log(docs);
	
	for(var i=0, size=docs.length; i<size; i++) {

		var name = docs[i].name;

		console.log(name);

	}
	
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
