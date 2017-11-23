angular.module('imageServ', [])
    .factory('Img', function($http){
        var imgFactory = {};

        imgFactory.getImgSectionAll = function() {
            return $http.get('/api/imageSection')
        }

        imgFactory.getImgByTitle = function(title) {
            return $http.post('/api/getImgByTitle', title);
        }

        imgFactory.updateImgSection = function(updateSection) {
            return $http.post('/api/updateImgSection', updateSection)
        }
        
        imgFactory.deleteImgFactory = function(deleteImgSection) {
            return $http.post('/api/deleteImgSection', deleteImgSection)
        }

        return imgFactory;
    })