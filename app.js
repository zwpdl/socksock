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
    email: String,
	name: String,
    age: String,
    gender: String,
    payload: String,
    product: String
  });


var PUser = mongoose.model('member_info', userSchema);

var johndoe = new PUser ({
	email : "1",
	age : "2",
	name : "3",
	gender : "4",
	payload : "0",
	product: "2"
  });

/*johndoe.save(function (err) {
	if (err) console.log ('Error on save!');
});*/


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



//네이버 로그인 시 회원 정보 저장
app.post('/member_insert', function(req, res) {
		var jsonData = "";
		var id_exist = false;
		var email = "";
	 
		req.on('data', function (chunk) {
			jsonData += chunk;
		});
	 
		req.on('end', function () {
		var reqObj = JSON.parse(jsonData);
		email = reqObj.response.email;
		
		PUser.findOne({email:reqObj.response.email},function(err,result){
		if(err){
			console.err(err);
			throw err;}
		email = "성공";
	
		});
		
		
	//	if(id_exist === true){
			var jo = new PUser({
			email : ""+reqObj.response.email,
			age : ""+reqObj.response.age,
			name : ""+reqObj.response.name,
			gender : ""+reqObj.response.gender,
			payload : "0",
			product : "free"
				});
		
			
				jo.save(function (err) {
					if (err) console.log ('Error on save!');
					});
				//}else{
				//Z}
				res.writeHead(200);
				res.end(email);
		});
		
		
});




// payload 발급
function randomString() {
var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
var string_length = 15;
var randomstring = '';
for (var i=0; i<string_length; i++) {
var rnum = Math.floor(Math.random() * chars.length);
randomstring += chars.substring(rnum,rnum+1);
}
return randomstring;
}


// payload를 발급하여 member_info에 저장
app.post('/making_payload', function(req, res) {
	
	var payload = randomString();
	
	req.on('data', function (chunk) {
		jsonData += chunk;
	});
 
	req.on('end', function () {
	var reqObj = JSON.parse(jsonData);
	var email = reqObj.email;

//	PUser.where('email', email).update({$set: {payload: payload}}, function (err, count) {});

	
	});
	res.writeHead(200);
	res.end(payload);
	
});


// google에서 결제 후 받은 purchase data의 payload와 DB의 payload 비교 후 일치하면  DB에 상품 타입 업데이트
app.post('/comparing_payload', function(req, res) {
	var jsonData = "";
	var comparing_payload = false;
 
	req.on('data', function (chunk) {
		jsonData += chunk;
	});
 
	req.on('end', function () {
	var reqObj = JSON.parse(jsonData);

	PUser.findOne({'payload':reqObj.developerPayload},function(err,result){
	if(err){
		console.err(err);
		throw err;}
	
	if(!result.isempty){
		comparing_payload = true;
		PUser.where('payload', reqObj.developerPayload).update({$set: {product: 'product_no.1'}}, function (err, count) {});
	}else{
		comparing_payload = false;
	}
	});
	// ------------- db payload 가져와서 비교하기 -----------------
	

	
	});
	res.writeHead(200);
	res.end(comparing_payload);
	
});






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
