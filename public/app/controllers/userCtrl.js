angular.module('userCtrl', ['userService'])//userService를 주입한 후
  .controller('userController', function(User){//userService의 User factory를 사용한다.

    var vm = this;

    vm.processing = true;

    User.all()
      .success(function(data){
        vm.processing = false;
        vm.users = data;
      });

    vm.deleteUser = function(id){

      vm.processing = true;

      User.delete(id)
        .success(function(data){
          User.all()
            .success(function(data){
              vm.processing = false;
              vm.users = data;
            });
        });
    };
  })
  .controller('userCreateController', function(User){
    var vm = this;

    vm.type = 'create';

    vm.saveUser = function(){
      vm.processing = true;
      vm.message = '';

      User.create(vm.userData)
        .success(function(data){
          vm.processing = false;
          vm.userData = {};
          vm.message = data.message;
        });
    };
  });
