angular.module('fileServ', [])
.factory('Article', function($http){
    var articleFacroty = {};

    articleFacroty.getFiles = function() {
        return $http.get('/api/article')
    }

    articleFacroty.updateFiles = function(updateArticle) {
        return $http.post('/api/updateArticle', updateArticle)
    }

    articleFacroty.getArticleByTitle = function(title) {
        return $http.post('/api/getArticleByTitle', title)
    }

    articleFacroty.deleteFile = function(deleteArticle) {
        return $http.post('/api/deleteArticle', deleteArticle)
    }

    return articleFacroty;
})