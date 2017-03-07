(function ()
{
    'use strict';

    angular
        .module('app.users',
            [
                // 3rd Party Dependencies
                'nvd3',
                'datatables'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider,msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.users', {
            url      : '/usuarios',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/users/users.html',
                    controller : 'UsersController as vm'
                }
            },
            resolve  : {
                UsersData: function (msApi)
                {
                    return msApi.resolve('users@get');
                }
            },
            bodyClass: 'users'
        });

        // Navigation
        msNavigationServiceProvider.saveItem('cadastros', {
            title : 'Cadastros',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('cadastros.users', {
            title : 'Usuarios',
            icon  : 'icon-account',
            state : 'app.users',
            /*badge : {
                content: 3,
                color  : '#FF6F00'
            },
            */
            weight: 9
        });

        msNavigationServiceProvider.saveItem('cadastros.users', {
            title: 'Usuarios',
            state: 'app.users'
        });

        // Api
        msApiProvider.register('users', ['app/data/users/users.json']);

    }

})();
