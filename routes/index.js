
/*
 * GET home page.
 */

var express = require('express');
var app = express();


/*exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};*/



/*app.post('/pushData', function(req, res){

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
*/