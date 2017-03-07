(function ()
{
    'use strict';

    angular
        .module('app.veiculos')
        .controller('VeiculosController', VeiculosController);

    /** @ngInject */
    function VeiculosController($http, $document, $mdDialog, $mdSidenav, $state, $scope, $interval,  Veiculos, api)
    {
        var vm = this;

        // Data
        vm.veiculo = Veiculos;

        api.garagens.list.query({},function(garagens){
          vm.garagens = garagens;
        });


        //TODO TROCAR PARA A GARAGEM PADRAO DO USUARIO
        var id = 1;
        if($state.params.idGaragem){
          id = $state.params.idGaragem;
        }
        //TODO: Selecionar a garagem do usuario
        api.garagem.get({id:id},function(garagem){
          vm.selectedGaragem = garagem;
          api.veiculos.query({garagemId:garagem.id}, function(veiculos){
            vm.veiculos = veiculos;
          });
        });

        // Methods
        vm.toggleSidenav = toggleSidenav;

        // Widget 11
        vm.widget11 = {
            title    : vm.veiculo.widget11.title,
            table    : {
                columns   : vm.veiculo.widget11.table.columns
            },
            dtOptions: {
                dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                pagingType: 'simple',
                autoWidth : false,
                responsive: true,
                order     : [0, 'asc'],
                columnDefs: [
                    {
                        width  : '16%',
                        targets: [0, 1, 2, 3, 4, 5]
                    }
                ],
                rowCallback: rowCallback
            },
            dtInstance: {}
        };

        vm.selectGaragem = selectGaragem;

        /**
         * Open new veiculo dialog
         *
         * @param ev
         * @param veiculo
         */
        function openVeiculoDialog(veiculo,ev)
        {
            $mdDialog.show({
                controller         : 'VeiculoDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/apps/veiculos/dialogs/veiculo/veiculo-dialog.html',
                parent             : angular.element($document.body),
                targetEvent        : ev,
                clickOutsideToClose: true,
                locals             : {
                    Veiculo : veiculo,
                    event: ev
                }
            });
        }

        function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
          $('td', nRow).unbind('click');
          $('td', nRow).bind('click', function() {
              $scope.$apply(function() {
                api.veiculo.get({id: aData[0]},function(veiculo) {
                  openVeiculoDialog(veiculo);
                });
              });
          });
          return nRow;
        }

        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId)
        {
            $mdSidenav(sidenavId).toggle();
        }

        /**
         * Select garagem
         *
         * @param garagem
         */
        function selectGaragem(garagem){
            $state.go('app.veiculos.garagem', {idGaragem: garagem.id});
        }
    }

})();
