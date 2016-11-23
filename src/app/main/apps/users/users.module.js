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
            url      : '/users',
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

        msNavigationServiceProvider.saveItem('apps.users', {
            title : 'Usuarios',
            icon  : 'icon-checkbox-marked',
            state : 'app.users',
            /*badge : {
                content: 3,
                color  : '#FF6F00'
            },
            */
            weight: 9
        });

        msNavigationServiceProvider.saveItem('apps.users', {
            title: 'Usuarios',
            state: 'app.users'
        });

        // Api
        msApiProvider.register('users', ['app/data/users/users.json']);

    }

})();
