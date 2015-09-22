var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');//morgan은 모든 request를 보여준다.
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;//port 설정.

var User = require('./app/models/user');

mongoose.connect('mongodb://127.0.0.1/crm', function(){
	console.log("mongodb connected!");
});

//body parser를 이용해 포스트로 요청(request)되는 정보를 잡아온다.
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

var apiRouter = express.Router();

//test route
apiRouter.get('/', function(req, res){
  res.json({ message: "hello! Can you hear me?"});
});

app.use('/api', apiRouter);

app.listen(port);
console.log('Magic happens on port ' + port);
