var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');//morgan은 모든 request를 보여준다.
var mongoose = require('mongoose');
//var jwt = require('jsonwebtoken');//인증용 jwt 설정.
var config = require('./config');

//var secret = config.secret;
//var User = require('./app/models/user');

mongoose.connect(config.database, function(){
	console.log("mongodb connected!");
});

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

//Routes for API
app.get('/', function(req, res){
  res.send('Welcome to the home page!');
});

var apiRoutes = require('./app/routes/api')(app, express); //'api.js'에서 리턴해 온다.
app.use('/api', apiRoutes);

app.listen(config.port);//port를 config.js에서 설정한 다음 여기로 직접 불러옴.
console.log('Magic happens on port ' + config.port);
