(function ()
{
    'use strict';

    angular
        .module('app.veiculos')
        .controller('VeiculosController', VeiculosController);

    /** @ngInject */
    function VeiculosController($http, $document, $mdDialog, $mdSidenav, $scope, $interval,  Veiculos, api)
    {
        var vm = this;

        // Data
        vm.veiculo = Veiculos;

        vm.garagens = api.garagens.list({},function(){});
        //TODO: Selecionar a garagem do usuario
        api.garagem.getById.get({id:1},function(garagem){
           vm.selectedGaragem = garagem;
           api.veiculo.list({garagemId: garagem.id},function(veiculos) {
             console.log(veiculos);
             vm.widget11.table.rows = veiculos;
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
                        width  : '25%',
                        targets: [0, 1, 2, 3]
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
                    Veiculos: vm.veiculos,
                    event: ev
                }
            });
        }

        function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
          // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
          $('td', nRow).unbind('click');
          $('td', nRow).bind('click', function() {
              $scope.$apply(function() {
                  openVeiculoDialog(aData);
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
            vm.selectedGaragem = garagem;

            api.veiculo.list({garagemId: garagem.id},function(veiculos) {
              vm.widget11.table.rows = veiculos;
            });
        }
    }

})();
