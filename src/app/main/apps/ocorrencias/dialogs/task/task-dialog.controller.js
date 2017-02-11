(function ()
{
    'use strict';

    angular
        .module('app.ocorrencias')
        .controller('OcorrenciaDialogController', OcorrenciaDialogController);

    /** @ngInject */
    function OcorrenciaDialogController($mdDialog, Task, Tasks, event, api)
    {
        var vm = this;

        //test like a fuck

        api.ocorrencia.getById({id:1},function(oc){
          console.log(oc);
        });

        // Data
        vm.title = 'Editar Ocorrência';
        vm.task = angular.copy(Task);
        console.log(Task);
        vm.tasks = Tasks;
        vm.newTask = false;
        var dataOntem = new Date();
        dataOntem.setDate(dataOntem.getDate() - 1);
        var veiculos;
        api.veiculo.list({garagemId: 1},function(vs) {
          veiculos = veiculos;
        });
        var garagens;
        //api.garagem.list(function(gs) {
          //garagens = gs;
        //});

        if ( !vm.task )
        {
            vm.task = {
                'id'                : '',
                'title'             : '',
                'veiculo'           : veiculos,
                'garagem'           : garagens,
                'descricao'             : '',
                'startDate'         : new Date(),
                'startDateTimeStamp': new Date().getTime(),
                'dueDate'           : dataOntem,
                'dueDateTimeStamp'  : dataOntem.getTime(),
                'completed'         : false,
                'starred'           : false,
                'important'         : false,
                'ativo'             : true,
                'tags'              : []
            };
            vm.title = 'Adicionar Ocorrência';
            vm.newTask = true;
            vm.task.tags = [];
        }

        // Methods
        vm.addNewTask = addNewTask;
        vm.saveTask = saveTask;
        vm.deleteTask = deleteTask;
        vm.newTag = newTag;
        vm.closeDialog = closeDialog;

        vm.tipos = api.ocorrenciaTipo.list(function() {});
        vm.veiculos = api.veiculo.list({garagemId: 1},function() {});
        //vm.garagens = api.garagem.list(function() {});

        /**
         * Add new task
         */
        function addNewTask()
        {
            vm.tasks.unshift(vm.task);

            closeDialog();
        }

        /**
         * Save task
         */
        function saveTask()
        {
            // Dummy save action
            for ( var i = 0; i < vm.tasks.length; i++ )
            {
                if ( vm.tasks[i].id === vm.task.id )
                {
                    vm.tasks[i] = angular.copy(vm.task);
                    break;
                }
            }

            closeDialog();
        }

        /**
         * Delete task
         */
        function deleteTask()
        {
            var confirm = $mdDialog.confirm()
                .title('Tem certeza?')
                .content('Essa ocorrência será excluída.')
                .ariaLabel('Excluir Ocorrência')
                .ok('Deletar')
                .cancel('Cancelar')
                .targetEvent(event);

            $mdDialog.show(confirm).then(function ()
            {
                // Dummy delete action
                for ( var i = 0; i < vm.tasks.length; i++ )
                {
                    if ( vm.tasks[i].id === vm.task.id )
                    {
                        vm.tasks[i].deleted = true;
                        break;
                    }
                }
            }, function ()
            {
                // Cancel Action
            });
        }


        /**
         * New tag
         *
         * @param chip
         * @returns {{label: *, color: string}}
         */
        function newTag(chip)
        {
            var tagColors = ['#388E3C', '#F44336', '#FF9800', '#0091EA', '#9C27B0'];

            return {
                name : chip,
                label: chip,
                color: tagColors[Math.floor(Math.random() * (tagColors.length))]
            };
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
