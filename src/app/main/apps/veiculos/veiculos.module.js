(function ()
{
    'use strict';

    angular
        .module('app.veiculos',
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
        $stateProvider.state('app.veiculos', {
            url      : '/veiculos',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/veiculos/veiculos.html',
                    controller : 'VeiculosController as vm'
                }
            },
            resolve  : {
                Veiculos: function (msApi)
                {
                    return msApi.resolve('veiculos@get');
                }
            },
            bodyClass: 'veiculos'
        })
        .state('app.veiculos.garagem', {
          url      : '/:idGaragem',
          views    : {
              'content@app': {
                templateUrl: 'app/main/apps/veiculos/veiculos.html',
                controller : 'VeiculosController as vm'
              }
          },
          resolve  : {
              Veiculos: function (msApi)
              {
                  return msApi.resolve('veiculos@get');
              }
          },
          bodyClass: 'veiculos'
        });

        msNavigationServiceProvider.saveItem('cadastros.veiculos', {
            title : 'Veículos',
            icon  : 'icon-bus',
            state : 'app.veiculos',
            /*badge : {
                content: 3,
                color  : '#FF6F00'
            },
            */
            weight: 9
        });

        msNavigationServiceProvider.saveItem('cadastros.veiculos', {
            title: 'Veículos',
            state: 'app.veiculos'
        });

        // Api
        msApiProvider.register('veiculos', ['app/data/veiculos/veiculos.json']);
        //msApiProvider.register('veiculos', ['http://127.0.0.1:5000/api/veiculos', {garagemId:2}]);

    }

})();
