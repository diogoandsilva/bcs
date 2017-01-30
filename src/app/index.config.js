(function ()
{
    'use strict';

    angular
        .module('fuse')
        .config(config)
        .config(dateConfig)
        .factory('authInterceptor', authInterceptor)
        .service('user', userService)
        .service('auth', authService)
        .config(function($httpProvider) {
          $httpProvider.interceptors.push('authInterceptor');
        });

        /** @ngInject */
        function dateConfig($mdDateLocaleProvider) {

          $mdDateLocaleProvider.parseDate = function(dateString) {
              var m = moment(dateString, 'L', true);
              return m.isValid() ? m.toDate() : new Date(NaN);
          };

          $mdDateLocaleProvider.formatDate = function(date) {
              return moment(date).format('DD/MM/YYYY');
          };

          $mdDateLocaleProvider.parseDate = function(dateString) {
              var m = moment(dateString, 'DD/MM/YYYY', true);
              return m.isValid() ? m.toDate() : new Date(NaN);
          };

        }

        /** @ngInject */
        function authInterceptor($location,API,API_LOGIN, auth) {
          return {
            request: function(config) {
              var token = auth.getToken();
              if(config.url.indexOf(API) === 0) {
                if(token){
                  config.headers['Authorization'] = token;
                }else{
                  $location.path("/LOGIN");
                }
              }

              return config;
            },

            response: function(res) {
              if(res.config.url.indexOf(API_LOGIN) === 0 && res.data.token) { //fazendo login
                auth.saveToken(res.data.token);
              }
              return res;
            }

          }
        }


        /** @ngInject */
        function authService($window) {
          var self = this;
          self.saveToken = function(token) {
            $window.localStorage['jwtToken'] = token;
          }

          self.getToken = function() {
            return $window.localStorage['jwtToken'];
          }
        }

        /** @ngInject */
        function userService($http, API, auth) {
          //console.log("userService dentro de config");

        }

    /** @ngInject */
    function config($translateProvider, $provide)
    {
        // angular-translate configuration
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('sanitize');

        // Text Angular options
        $provide.decorator('taOptions', [
            '$delegate', function (taOptions)
            {
                taOptions.toolbar = [
                    ['bold', 'italics', 'underline', 'ul', 'ol', 'quote']
                ];

                taOptions.classes = {
                    focussed           : 'focussed',
                    toolbar            : 'ta-toolbar',
                    toolbarGroup       : 'ta-group',
                    toolbarButton      : 'md-button',
                    toolbarButtonActive: 'active',
                    disabled           : '',
                    textEditor         : 'form-control',
                    htmlEditor         : 'form-control'
                };

                return taOptions;
            }
        ]);

        // Text Angular tools
        $provide.decorator('taTools', [
            '$delegate', function (taTools)
            {
                taTools.quote.iconclass = 'icon-format-quote';
                taTools.bold.iconclass = 'icon-format-bold';
                taTools.italics.iconclass = 'icon-format-italic';
                taTools.underline.iconclass = 'icon-format-underline';
                taTools.strikeThrough.iconclass = 'icon-format-strikethrough';
                taTools.ul.iconclass = 'icon-format-list-bulleted';
                taTools.ol.iconclass = 'icon-format-list-numbers';
                taTools.redo.iconclass = 'icon-redo';
                taTools.undo.iconclass = 'icon-undo';
                taTools.clear.iconclass = 'icon-close-circle-outline';
                taTools.justifyLeft.iconclass = 'icon-format-align-left';
                taTools.justifyCenter.iconclass = 'icon-format-align-center';
                taTools.justifyRight.iconclass = 'icon-format-align-right';
                taTools.justifyFull.iconclass = 'icon-format-align-justify';
                taTools.indent.iconclass = 'icon-format-indent-increase';
                taTools.outdent.iconclass = 'icon-format-indent-decrease';
                taTools.html.iconclass = 'icon-code-tags';
                taTools.insertImage.iconclass = 'icon-file-image-box';
                taTools.insertLink.iconclass = 'icon-link';
                taTools.insertVideo.iconclass = 'icon-filmstrip';

                return taTools;
            }
        ]);
    }

})();
