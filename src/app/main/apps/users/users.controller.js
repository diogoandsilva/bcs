(function ()
{
    'use strict';

    angular
        .module('app.users')
        .controller('UsersController', UsersController);

    /** @ngInject */
    function UsersController($http, $scope, $interval, $mdSidenav, UsersData,api)
    {
        var vm = this;
        var tabela = {
            "columns": [
                {
                    "title": ""
                },
                {
                    "title": "Nome"
                },
                {
                    "title": "Id"
                },
                {
                    "title": "Cargo"
                },
                {
                    "title": "Email"
                },
                {
                    "title": "Celular"
                }
            ],
            "rows": []
      };

        var usuarios = api.usuarios.list(function() {
          tabela.rows = Array.from(usuarios);
          console.log('length:'+ tabela.rows.length);
           tabela.rows.forEach(function(element, index, array) {
             console.log(index + ':' + element);
           });
          tabela.rows = Array.from(tabela.rows);
          console.log(tabela);
        });




        // Data
        vm.usersData = UsersData;
        vm.projects = vm.usersData.projects;

        console.log(vm.usersData.widget11.table);

        // Widget 11
        vm.widget11 = {
            title    : vm.usersData.widget11.title,
            table    : vm.usersData.widget11.table,
            dtOptions: {
                dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                pagingType: 'simple',
                autoWidth : false,
                responsive: true,
                order     : [1, 'asc'],
                columnDefs: [
                    {
                        width    : '40',
                        orderable: false,
                        targets  : [0]
                    },
                    {
                        width  : '20%',
                        targets: [1, 2, 3, 4, 5]
                    }
                ]
            }
        };

        // Now widget
        vm.nowWidget = {
            now   : {
                second: '',
                minute: '',
                hour  : '',
                day   : '',
                month : '',
                year  : ''
            },
            ticker: function ()
            {
                var now = moment();
                vm.nowWidget.now = {
                    second : now.format('ss'),
                    minute : now.format('mm'),
                    hour   : now.format('HH'),
                    day    : now.format('D'),
                    weekDay: now.format('dddd'),
                    month  : now.format('MMMM'),
                    year   : now.format('YYYY')
                };
            }
        };

        // Weather widget
        vm.weatherWidget = vm.usersData.weatherWidget;

        // Methods
        vm.toggleSidenav = toggleSidenav;
        vm.selectProject = selectProject;

        //////////
        vm.selectedProject = vm.projects[0];

        // Initialize Widget 5
        //vm.widget5.init();

        // Initialize Widget 6
        //vm.widget6.init();

        // Initialize Widget 9
        //vm.widget9.init();

        // Now widget ticker
        vm.nowWidget.ticker();

        var nowWidgetTicker = $interval(vm.nowWidget.ticker, 1000);

        $scope.$on('$destroy', function ()
        {
            $interval.cancel(nowWidgetTicker);
        });

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
         * Select project
         */
        function selectProject(project)
        {
            vm.selectedProject = project;
        }
    }

})();
