angular.module('userApp', [
  'app.routes',
  'mainCtrl',
  'authService'

])
  .config(function($httpProvider){
      $httpProvider.interceptors.push('AuthInterceptor');
});
