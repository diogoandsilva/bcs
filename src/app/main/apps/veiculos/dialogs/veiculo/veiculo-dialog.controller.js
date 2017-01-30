(function ()
{
    'use strict';

    angular
        .module('app.veiculos')
        .controller('VeiculoDialogController', VeiculoDialogController);

    /** @ngInject */
    function VeiculoDialogController($mdDialog, Veiculo, Veiculos, event, api)
    {
        var vm = this;

        console.log(Veiculo);

        // Data
        vm.title = 'Editar Veículo';
        vm.veiculo = angular.copy(Veiculo);
        vm.veiculos = Veiculos;

        vm.newVeiculo = false;
        var dataOntem = new Date();
        dataOntem.setDate(dataOntem.getDate() - 1);

        if ( !vm.veiculo )
        {
            vm.veiculo = {
                'id'                : '',
                'identificador'     : '',
                'placa'             : '',
                'GaragemId'         : '',
                'createdAt'         : new Date(),
                'updatedAt'         : new Date(),
                'ativo'             : false
            };
            vm.title = 'Adicionar Veículo';
            vm.newVeiculo = true;
            vm.veiculo.tags = [];
        }

        // Methods
        vm.addNewVeiculo = addNewVeiculo;
        vm.saveVeiculo = saveVeiculo;
        vm.deleteVeiculo = deleteVeiculo;
        vm.closeDialog = closeDialog;

        vm.tipos = api.ocorrenciaTipo.list(function() {});
        vm.veiculos = api.veiculo.list(function() {});


        //////////

        /**
         * Add new veiculo
         */
        function addNewVeiculo()
        {
            vm.veiculos.unshift(vm.veiculo);

            closeDialog();
        }

        /**
         * Save veiculo
         */
        function saveVeiculo()
        {
            // Dummy save action
            for ( var i = 0; i < vm.veiculos.length; i++ )
            {
                if ( vm.veiculos[i].id === vm.veiculo.id )
                {
                    vm.veiculos[i] = angular.copy(vm.veiculo);
                    break;
                }
            }

            closeDialog();
        }

        /**
         * Delete veiculo
         */
        function deleteVeiculo()
        {
            var confirm = $mdDialog.confirm()
                .title('Tem certeza?')
                .content('Esse veículo será excluído.')
                .ariaLabel('Excluir Veículo')
                .ok('Deletar')
                .cancel('Cancelar')
                .targetEvent(event);

            $mdDialog.show(confirm).then(function ()
            {
                // Dummy delete action
                for ( var i = 0; i < vm.veiculos.length; i++ )
                {
                    if ( vm.veiculos[i].id === vm.veiculo.id )
                    {
                        vm.veiculos[i].deleted = true;
                        break;
                    }
                }
            }, function ()
            {
                // Cancel Action
            });
        }

        /**
         * Close dialog
         */
        function closeDialog()
        {
            $mdDialog.hide();
        }
    }
})();
