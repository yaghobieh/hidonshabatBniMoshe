angular.module('infoSectionServiceServ', [])
    .factory('InfoSection', function($http){
        var InfoFactory = {};

        InfoFactory.createInfoSection = function(infoSectionPack) {
            return $http.post('/api/infoSection', infoSectionPack);
        }

        InfoFactory.getInfoSection = function(){
            return $http.get('/api/infoSection');
        }

        InfoFactory.updateInfoSection = function(infoSectionEditPack) {
            return $http.post('/api/updateInfoSection', infoSectionEditPack);
        }

        return InfoFactory;
    })