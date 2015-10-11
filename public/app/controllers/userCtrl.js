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
  })

  .controller('userEditController', function($routeParams, User){
    var vm = this;

    vm.type = 'edit';

    User.get($routeParams.user_id) //userCreateController와 똑같지만
      .success(function(data){ //이렇게 user 정보를 미리 가져오는 것만 다름.
        vm.userData = data; //서버에서 정보를 가져와서 이렇게 뷰에 넣었기에 form 빈칸에 정보가 보임.
      });

    vm.saveUser = function(){
      vm.processing = true;
      vm.message = '';

      User.update($routeParams.user_id, vm.userData) //그리고 User.update를 보내는 것만 다름.
        .success(function(data){
          vm.processing = false;
          vm.userData = {};
          vm.message = data.message;
        });
    };
  });
