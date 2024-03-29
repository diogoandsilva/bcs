(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Common 3rd Party Dependencies
            'uiGmapgoogle-maps',
            'textAngular',
            'xeditable',

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick Panel
            'app.quick-panel',

            // Apps
            'app.dashboards',
            //'app.calendar',
            //'app.e-commerce',
            //'app.chat',
            'app.file-manager',
            'app.gantt-chart',
            //'app.scrumboard',
            'app.ocorrencias',
            'app.monitorados',
            'app.mail',
            'app.todo',
            //'app.contacts',
            'app.notes',
            'app.users',
            'app.veiculos',
            // Pages
            'app.pages',

            // User Interface
            //'app.ui',

            // Components
            //'app.components'
        ]);
})();
