(function ()
{
    'use strict';

    angular
        .module('app.veiculos')
        .controller('VeiculoDialogController', VeiculoDialogController);

    /** @ngInject */
    function VeiculoDialogController($mdDialog, $state, Veiculo, event, api)
    {
        var vm = this;

        // Data
        vm.title = 'Editar Veículo';
        vm.veiculo = angular.copy(Veiculo);

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
                'monitorado'        : true,
                'ativo'             : true
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

        api.ocorrenciaTipo.query(function(ocorrenciaTipos) {
            vm.tipos = ocorrenciaTipos;
        });

        api.garagens.list.query(function(garagens) {
          vm.garagens = garagens;
        });


        //////////

        /**
         * Add new veiculo
         */
        function addNewVeiculo()
        {

            closeDialog();
        }

        /**
         * Save veiculo
         */
        function saveVeiculo()
        {
            api.veiculo.save(vm.veiculo);
            //TODO ARRUMAR PARA COLOCAR O ID DA GARAGEM PADRAO DO USUARIO
            var id = 1;
            if($state.params.idGaragem){
              id = $state.params.idGaragem;
            }
            $state.reload();
            closeDialog();
        }

        /**
         * Delete veiculo
         */
        function deleteVeiculo()
        {
            var confirm = $mdDialog.confirm()
                .title('Tem certeza?')
                .content('Esse veículo será desativado.')
                .ariaLabel('Desativar Veículo')
                .ok('Desativar')
                .cancel('Cancelar')
                .targetEvent(event);

            $mdDialog.show(confirm).then(function ()
            {
                vm.veiculo.ativo = false;
                saveVeiculo();
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
