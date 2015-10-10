angular.module('mainCtrl', [])

  .controller('mainController', function($rootScope, $location, Auth){//3번째 파라미터는 Auth factory.
    var vm = this;

    vm.loggedIn = Auth.isLoggedIn();

    $rootScope.$on('$routeChangeStart', function(){
      //사용자의 route가 바뀔 때 log in 상태를 다시 체크.
      vm.loggedIn = Auth.isLoggedIn();

      Auth.getUser()//authService에서 정의했던 함수. route가 바뀔 때마다 사용자 정보를 가져온다.
        .success(function(data){
          vm.user = data;
        });
    });

    vm.doLogin = function(){
      Auth.login(vm.loginData.username, vm.loginData.password)//파라미터는 로그인 페이지에서 가져온다.
        .success(function(data){
          $location.path('/users');
        });
    };

    vm.doLogout = function(){
      Auth.logout();
      vm.user = {};//프론트엔드에도 흔적을 남기지 않는다.
      $location.path('/login');
    };

  });
