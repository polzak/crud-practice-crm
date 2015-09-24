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

//익스프레스 라우터 인스턴스 호출.
var apiRouter = express.Router();

//***매우 중요 ***
//모든 리퀘스트에 대한 미들웨어 설정.
//이러한 미들웨어를 설정하면 굉장히 강력해진다. 모든 요청이 안전한지 검증할 수 있기 때문이다.
//또한 로그 통계 분석을 하는 미들웨어를 추가할 수도 있다.
//무엇보다도 인증 기능이 가장 중요할 것이다. 유저가 적절한 토큰을 가지고 있는지 인증할 수 있다.
apiRouter.use(function(req, res, next){
	//누군가 로그한다.
	console.log('Somebody just came to our app!');

	//이후 이 부분에서 인증 설정을 할 것이다.

	next();//다시 하던 라우팅 일 계속해라. (미들웨어가 더 있으면 그거 계속하고.)
});

apiRouter.route('/users')
	//create a user
	.post(function(req, res){
		var user = new User();

		user.name = req.body.name;
		user.username = req.body.username;
		user.password = req.body.password;

		//save the user and check for errors
		user.save(function(err){
			if (err){
				if (err.code == 11000){
					return res.json({success: false, message: 'A user with that username already exists.'});
				}
				else { return res.send(err); }
			}
			res.json({message: 'User created!'});
		});
	})
	//get all the users at '/api/users'
	.get(function(req, res){
		User.find(function(err, users){
			if (err){ res.send(err); }

			res.json(users);
		});
	});

//test route
apiRouter.get('/', function(req, res){
  res.json({ message: "hello! Can you hear me?"});
});

app.use('/api', apiRouter);

app.listen(port);
console.log('Magic happens on port ' + port);
