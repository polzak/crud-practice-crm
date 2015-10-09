var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');//morgan은 모든 request를 보여준다.
var mongoose = require('mongoose');
var config = require('./config');

//body parser를 이용해 포스트로 요청(request)되는 정보를 파싱한다.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS requests를 처리하도록 설정. 즉, 다른 도메인에서 요청이 와도 CORS에 의해 거부되지 않고 우리 API를 쓸 수 있게 허용한다.
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');//모든 도메인의 요청을 수락한다는 얘기인가 보다.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');//아마 GET이랑 POST만 쓰도록 허용하는가 보다.
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, \Authorization');
  next();
});

app.use(morgan('dev'));

//데이터베이스 연결은 여기서부터 시작되어도 되나 보다. 라우팅을 하기 전이기만 하면 되나 보다.
mongoose.connect(config.database, function(){
	console.log("mongodb connected!");
});

//모든 static 파일들을 위한 로케이션 지정.
app.use(express.static(__dirname + '/public'));

var apiRoutes = require('./app/routes/api')(app, express); //'api.js'에서 리턴해 온다.
app.use('/api', apiRoutes);

//catchall Route: node가 핸들링 하지 않는 모든 리퀘스트를 angular에 넘긴다.
//이걸 apiRoutes보다 앞에 설정해버리면, apiRoutes가 해야 할 일까지도 전부 얘가 다 가져가버리게 된다.
//그래서 apiRoutes보다 뒤에 설정해 준다. 이것이 catchall Route이다.
app.get('*', function(req, res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(config.port);//port를 config.js에서 설정한 다음 여기로 직접 불러옴.
console.log('Magic happens on port ' + config.port);
