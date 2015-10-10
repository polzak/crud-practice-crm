angular.module('authService', [])

  .factory('Auth', function($http, $q, AuthToken){

    var authFactory = {};

    // 1) 로그인
    // 2) 로그아웃
    // 3) 로그인 상태인지 체크
    // 4) 유저 정보 가져오기

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

  .factory('AuthInterceptor', function($q, AuthToken){

    var interceptorFactory = {};

    // 1) 모든 리퀘스트에 토큰 갖다붙이기
    // 2) 토큰 인증 실패시 리디렉트

    return interceptorFactory;
  });
