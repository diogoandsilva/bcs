(function ()
{
    'use strict';

    angular
        .module('fuse')
        .constant('API', 'http://127.0.0.1:5000/api')
        .constant('API_LOGIN', 'http://127.0.0.1:5000/login');
})();
