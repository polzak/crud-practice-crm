angular.module('userCtrl', ['userService'])//userService를 주입한 후
  .controller('userController', function(User){//userService의 User factory를 사용한다.

    var vm = this;

  });
