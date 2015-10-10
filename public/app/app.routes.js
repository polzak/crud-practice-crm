angular.module('app.routes', ['ngRoute'])

  .config(function($routeProvider, $locationProvider){

    $routeProvider

      .when('/', {
        templateUrl: '/app/views/pages/home.html'
      })

      .when('/login', {
        templateUrl: '/app/views/pages/login.html',
        controller: 'mainController',
        controllerAs: 'login'//로그인에 관한 한 다르게 부를 수 있도록.
      });

       $locationProvider.html5Mode(true);
  });
