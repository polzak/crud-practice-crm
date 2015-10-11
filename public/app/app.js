angular.module('userApp', [
  'app.routes',
  'mainCtrl',
  'authService',
  'userCtrl',
  'userService'

])
  .config(function($httpProvider){
      $httpProvider.interceptors.push('AuthInterceptor');
});
