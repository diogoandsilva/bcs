(function ()
{
    'use strict';

    angular
        .module('app.ocorrencia',
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
        $stateProvider.state('app.ocorrencia', {
            url      : '/ocorrencia',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/ocorrencia/ocorrencia.html',
                    controller : 'OcorrenciaController as vm'
                }
            },
            resolve  : {
                Tasks: function (msApi)
                {
                    return msApi.resolve('ocorrencia.tasks@get');
                },
                Tags : function (msApi)
                {
                    return msApi.resolve('ocorrencia.tags@get');
                }
            },
            bodyClass: 'ocorrencia'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/ocorrencia');

        // Api
        msApiProvider.register('ocorrencia.tasks', ['app/data/ocorrencia/tasks.json']);
        msApiProvider.register('ocorrencia.tags', ['app/data/ocorrencia/tags.json']);


        // Navigation
        msNavigationServiceProvider.saveItem('apps.ocorrencia', {
            title : 'Ocorrência',
            icon  : 'icon-checkbox-marked',
            state : 'app.ocorrencia',
            /*badge : {
                content: 3,
                color  : '#FF6F00'
            },
            */
            weight: 9
        });

    }

})();
