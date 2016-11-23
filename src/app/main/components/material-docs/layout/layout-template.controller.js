(function () {
    'use strict';

    angular
        .module('app.components.material-docs')
        .controller('LayoutTemplateController', LayoutTemplateController);

    /** @ngInject */
    function LayoutTemplateController($state, ANGULAR_MATERIAL_VERSION) {
        var vm = this;
        vm.materialVersion = ANGULAR_MATERIAL_VERSION;

        vm.component = $state.current.data;
    }

})();