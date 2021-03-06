angular.module('authService', [])

  .factory('Auth', function($http, $q, AuthToken){

    var authFactory = {};

    // 1) 로그인
    authFactory.login = function(username, password){
      return $http.post('/api/authenticate', {
        username: username,
        password: password
      })
        .success(function(data){
          AuthToken.setToken(data.token);
          return data;
        });
    };

    // 2) 로그아웃
    authFactory.logout = function(){
      AuthToken.setToken();
    };

    // 3) 로그인 상태인지 체크
    authFactory.isLoggedIn = function(){
      if (AuthToken.getToken()){
        return true;
      } else {
        return false;
      }
    };

    // 4) 유저 정보 가져오기
    authFactory.getUser = function(){
      if (AuthToken.getToken()){
        return $http.get('/api/me'); //만약 캐시하고 싶다면 return $http.get('/api/me', { cache: true });
      } else {
        return $q.reject({ message: 'User has no token.' });
      }
    };

    return authFactory;
  })

  .factory('AuthToken', function($window){

    var authTokenFactory = {};

    // 1) 토큰 가져오기
    authTokenFactory.getToken = function(){
      return $window.localStorage.getItem('token');
    };

    // 2) 토큰 설정
    // 3) 토큰 폐기
    authTokenFactory.setToken = function(token){
      if (token){
        $window.localStorage.setItem('token', token);
      } else {
        $window.localStorage.removeItem('token');
      }
    };

    return authTokenFactory;
  })

  .factory('AuthInterceptor', function($q, $location, AuthToken){

    var interceptorFactory = {};

    // 1) 모든 리퀘스트에 토큰 갖다붙이기
    interceptorFactory.request = function(config){
      var token = AuthToken.getToken();

      if (token){
        config.headers['x-access-token'] = token;
      }
      return config;
    };

    // 2) 토큰 인증 실패시 리디렉트
    interceptorFactory.responseError = function(response){
      if (response.status == 403){
        AuthToken.setToken();
        $location.path('/login');
      }
      return $q.reject(response);
    };

    return interceptorFactory;
  });
