(function ()
{
    'use strict';

    angular
        .module('app.file-manager',
            [
                // 3rd Party Dependencies
                'flow'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.file-manager', {
            url      : '/file-manager',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/file-manager/file-manager.html',
                    controller : 'FileManagerController as vm'
                }
            },
            resolve  : {
                Documents: function (msApi)
                {
                    return msApi.resolve('fileManager.documents@get');
                }
            },
            bodyClass: 'file-manager'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/file-manager');

        // Api
        msApiProvider.register('fileManager.documents', ['app/data/file-manager/documents.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('monitoramento.file-manager', {
            title : 'Arquivos',
            icon  : 'icon-folder',
            state : 'app.file-manager',
            weight: 6
        });
    }

})();
