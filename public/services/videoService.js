angular.module('videoServ', [])
    .factory('Vde', function($http){
        var videoFacroty = {};

        videoFacroty.getVideos = function() {
            return $http.get('/api/video')
        }

        videoFacroty.newVideo = function(videoPack) {
            return $http.post('/api/video', videoPack)
        }
        
        videoFacroty.getVideoByTitle = function(title) {
            return $http.post('/api/getVideoByTitle', title)
        }

        videoFacroty.updateVideo = function(updateVideo) {
            console.log(updateVideo)
            return $http.post('/api/updateVideo', updateVideo)
        }

        videoFacroty.deleteVideo = function(deleteVideo) {
            return $http.post('/api/deleteVideo', deleteVideo)
        }

        return videoFacroty;
    })