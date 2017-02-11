(function ()
{
    'use strict';

    angular
        .module('app.ocorrencias')
        .filter('unsafe', ['$sce', function ($sce) {
            return function (val) {
                return $sce.trustAsHtml(val);
            };
        }])
        .controller('OcorrenciaController', OcorrenciaController);

    /** @ngInject */
    function OcorrenciaController($state, Statuses, uiGmapGoogleMapApi, Ocorrencia, api)
    {
        var vm = this;

        vm.acao = 'Salvar';
        // Data
        vm.taToolbar = [
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote', 'bold', 'italics', 'underline', 'strikeThrough', 'redo', 'undo', 'clear'],
            ['ul', 'ol', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent','wordcount', 'charcount']
        ];
        vm.categoriesSelectFilter = '';
        vm.ngFlowOptions = {
            // You can configure the ngFlow from here
            /*target                   : 'api/media/image',
             chunkSize                : 15 * 1024 * 1024,
             maxChunkRetries          : 1,
             simultaneousUploads      : 1,
             testChunks               : false,
             progressCallbacksInterval: 1000*/
        };
        vm.ngFlow = {
            // ng-flow will be injected into here through its directive
            flow: {}
        };

        vm.newStatus = '';
        vm.dropping = false;

        var ocorrenciaTipos;
        var funcionarios;
        var garagens;
        var veiculos;

        api.ocorrenciaTipo.list(function(ot) {
          ocorrenciaTipos = ot;
          vm.ocorrenciaTipos = ocorrenciaTipos;
        });

        api.veiculo.list({garagemId: 2},function(vs) {
          veiculos = vs;
          vm.veiculos = veiculos;
        });

        console.log("Fala mano");
        api.garagens.list({monitoramentoId: 1},function(vs) {
          garagens = gs;
          vm.garagens = gs;

          api.funcionario.list({garagemId: gs.id},function(fs) {
            funcionarios = fs;
            vm.funcionarios = funcionarios;
          });
        });

        // Methods
        vm.gotoOcorrencias = gotoOcorrencias;
        vm.fileAdded = fileAdded;
        vm.upload = upload;
        vm.fileSuccess = fileSuccess;
        //////////

        init();

        // Normally, you would need Google Maps Geocoding API
        // to convert addresses into latitude and longitude
        // but because Google's policies, we are faking it for
        // the demo

        uiGmapGoogleMapApi.then(function (maps)
        {
            vm.ocorrencia.endereco = {
                center: {
                    latitude : -23.204933,
                    longitude: -46.799993
                },
                marker: {
                    id: 'ocorrencia'
                },
                zoom  : 14
            };
        });


        /**
         * Initialize
         */
        function init()
        {
            var id = $state.params.id;

            if ( !id ){
              var dataOntem = new Date();
              dataOntem.setDate(dataOntem.getDate() - 1);

              vm.ocorrencia = {
                  'id'                : '',
                  'descricao'         : '',
                  'qtde'              : 1,
                  'createdAt'         : new Date(),
                  'dataOcorrencia'    : dataOntem,
                  'secreto'           : false,
                  'ativo'             : true
              };
              vm.acao = 'Adicionar';
            }

            api.ocorrencia.getById.get({id:id},function(oc){
              if ( oc.createdAt )
                  oc.createdAt = new Date(oc.createdAt);

              if ( oc.dataOcorrencia )
                  oc.dataOcorrencia = new Date(oc.dataOcorrencia);
              oc.foto = "assets/images/ocorrencia/teste.jpg";
              vm.ocorrencia = oc;

              vm.ocorrencia.images = [{
                  "default": true,
                  "id": 1,
                  "url": "assets/images/ecommerce/product-image-placeholder.png",
                  "type": "image"
              }];

            });
        }

        /**
         * Go to ocorrencias page
         */
        function gotoOcorrencias()
        {
            var idMoni = $state.params.idMoni;
            $state.go('app.ocorrencias.monitoramento', {idMoni: idMoni});
        }


        /**
         * File added callback
         * Triggers when files added to the uploader
         *
         * @param file
         */
        function fileAdded(file)
        {
            // Prepare the temp file data for media list
            var uploadingFile = {
                id  : file.uniqueIdentifier,
                file: file,
                type: 'uploading'
            };

            // Append it to the media list
            vm.ocorrencia.images.unshift(uploadingFile);
        }

        /**
         * Upload
         * Automatically triggers when files added to the uploader
         */
        function upload()
        {
            // Set headers
            vm.ngFlow.flow.opts.headers = {
                'X-Requested-With': 'XMLHttpRequest',
                //'X-XSRF-TOKEN'    : $cookies.get('XSRF-TOKEN')
            };

            vm.ngFlow.flow.upload();
        }

        /**
         * File upload success callback
         * Triggers when single upload completed
         *
         * @param file
         * @param message
         */
        function fileSuccess(file, message)
        {
            // Iterate through the media list, find the one we
            // are added as a temp and replace its data
            // Normally you would parse the message and extract
            // the uploaded file data from it
            angular.forEach(vm.ocorrencia.images, function (media, index)
            {
                if ( media.id === file.uniqueIdentifier )
                {
                    // Normally you would update the media item
                    // from database but we are cheating here!
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(media.file.file);
                    fileReader.onload = function (event)
                    {
                        media.url = event.target.result;
                    };

                    // Update the image type so the overlay can go away
                    media.type = 'image';
                }
            });
        }
    }
})();
