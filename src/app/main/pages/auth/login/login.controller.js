(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($scope,$state,$http,api){
        var vm = this;
        vm.count = 0;

        /*
        var usuarios = api.usuarios.list.query(function() {
          console.log(usuarios);
        }); //query() returns all the entries
        */

        /*var id = 1;
        var usuario = api.usuarios.getById.get({'id': id},function(){
          console.log(usuario);
        });
        */

        vm.login = function(){
          vm.count = vm.count + 1;
          var email = vm.form.email;
          var senha = vm.form.password;
          
          var login = api.login.login({'email': email, 'senha': senha},function(){
            if(!login.sucess){
              vm.form.password = "";
            }else{
              $state.go('app.dashboards_project');
            }
          });

        }
    }
    /*
    $http.post('http://192.168.0.113:5000/login',{'email': email, 'senha': senha})
   .then(function successCallback(response) {
     $state.go('app.dashboards_project');
   }, function errorCallback(response) {
     console.log(response);
   });
   */


})();
