(function ()
{
    'use strict';

    angular
        .module('app.monitorados')
        .controller('TaskDialogController', TaskDialogController);

    /** @ngInject */
    function TaskDialogController($mdDialog, Task, Tasks, event, api)
    {
        var vm = this;

        // Data
        vm.title = 'Editar Ocorrência';
        vm.task = angular.copy(Task);
        vm.tasks = Tasks;
        vm.newTask = false;
        var dataOntem = new Date();
        dataOntem.setDate(dataOntem.getDate() - 1);

        if ( !vm.task )
        {
            vm.task = {
                'id'                : '',
                'title'             : '',
                'veiculo'           : '',
                'estado'            : '',
                'notes'             : '',

                'startDate'         : new Date(),
                'startDateTimeStamp': new Date().getTime(),
                'dueDate'           : dataOntem,
                'dueDateTimeStamp'  : dataOntem.getTime(),
                'completed'         : false,
                'starred'           : false,
                'important'         : false,
                'deleted'           : false,
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
        vm.veiculos = api.veiculo.list(function() {});


        //////////

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
