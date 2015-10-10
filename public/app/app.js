angular.module('userApp', ['app.routes'])

  .controller('mainController', function(){
    var vm = this;
    vm.greet = "Hello Angular";
  })

  .controller('homeController', function(){
    var vm = this;
    
  });
