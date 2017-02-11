(function ()
{
    'use strict';

    angular
        .module('app.monitorados',
            [
                // 3rd Party Dependencies
                'ng-sortable',
                'textAngular'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.monitorados', {
            url      : '/monitorados',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/monitorados/monitorados.html',
                    controller : 'MonitoradosController as vm'
                }
            },
            resolve  : {
                Tasks: function (msApi)
                {
                    return msApi.resolve('monitorados.tasks@get');
                },
                Tags : function (msApi)
                {
                    return msApi.resolve('monitorados.tags@get');
                }
            },
            bodyClass: 'monitorados'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/monitorados');

        // Api
        msApiProvider.register('monitorados.tasks', ['app/data/monitorados/tasks.json']);
        msApiProvider.register('monitorados.tags', ['app/data/monitorados/tags.json']);


        // Navigation
        msNavigationServiceProvider.saveItem('monitoramento.monitorados', {
            title : 'Monitorados',
            icon  : 'icon-clipboard',
            state : 'app.monitorados',
            /*badge : {
                content: 3,
                color  : '#FF6F00'
            },
            */
            weight: 2
        });

    }

})();
