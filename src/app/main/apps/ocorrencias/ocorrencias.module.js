(function ()
{
    'use strict';

    angular
        .module('app.ocorrencias',
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
        $stateProvider
          .state('app.ocorrencias', {
            url      : '/ocorrencias',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/ocorrencias/ocorrencias.html',
                    controller : 'OcorrenciasController as vm'
                }
            },
            resolve  : {
                Tasks: function (msApi)
                {
                    return msApi.resolve('ocorrencias.tasks@get');
                },
                Tags : function (msApi)
                {
                    return msApi.resolve('ocorrencias.tags@get');
                }
            },
            bodyClass: 'ocorrencias'
          })
          .state('app.ocorrencias.monitoramento', {
            url      : '/:idMoni',
            views    : {
                'content@app': {
                  templateUrl: 'app/main/apps/ocorrencias/ocorrencias.html',
                  controller : 'OcorrenciasController as vm'
                }
            },
            resolve  : {
                Tasks: function (msApi)
                {
                    return msApi.resolve('ocorrencias.tasks@get');
                },
                Tags : function (msApi)
                {
                    return msApi.resolve('ocorrencias.tags@get');
                }
            },
            bodyClass: 'ocorrencias'
          })
          .state('app.ocorrencias.monitoramento.ocorrencia', {
            url      : '/ocorrencia/:id',
            views    : {
                'content@app': {
                  templateUrl: 'app/main/apps/ocorrencias/views/ocorrencia/ocorrencia.html',
                  controller : 'OcorrenciaController as vm'
                }
            },
            resolve  : {
                Ocorrencia: function (msApi)
                {
                    return msApi.resolve('ocorrencias.ocorrencia@get');
                },
                Statuses : function (msApi)
                {
                    return msApi.resolve('ocorrencias.statuses@get');
                }
            },
            bodyClass: 'ocorrencias'
          });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/ocorrencias');

        // Api
        msApiProvider.register('ocorrencias.tasks', ['app/data/ocorrencias/tasks.json']);
        msApiProvider.register('ocorrencias.tags', ['app/data/ocorrencias/tags.json']);
        msApiProvider.register('ocorrencias.ocorrencia', ['app/data/ocorrencias/ocorrencia.json']);
        msApiProvider.register('ocorrencias.statuses', ['app/data/ocorrencias/statuses.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('monitoramento', {
            title : 'Monitoramento',
            group : true,
            weight: 1
        });

        // Navigation
        msNavigationServiceProvider.saveItem('monitoramento.ocorrencias', {
            title : 'Ocorrências',
            icon  : 'icon-checkbox-marked',
            state : 'app.ocorrencias',
            /*badge : {
                content: 3,
                color  : '#FF6F00'
            },
            */
            weight: 1
        });

    }

})();
