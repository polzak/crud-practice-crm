angular.module('userApp', [
  'app.routes',
  'mainCtrl',
  'authService',
  'userCtrl',
  'userService',
  'ngAnimate'
])
  .config(function($httpProvider){
      $httpProvider.interceptors.push('AuthInterceptor');
});
