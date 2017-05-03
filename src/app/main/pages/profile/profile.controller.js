(function ()
{
    'use strict';

    angular
        .module('app.pages.profile')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController(About, api)
    {
        var vm = this;

        // Data
        //vm.posts = Timeline.posts;
        //vm.activities = Timeline.activities;

        api.usuario.get({id:1},function(usuario){
          vm.usuario = usuario;
          console.log(usuario);
        });
        //vm.photosVideos = PhotosVideos.data;

        // Methods

        //////////
    }

})();
