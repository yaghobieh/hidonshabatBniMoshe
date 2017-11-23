angular.module('userServ', [])
    .factory('User', function($http){
        var userFactory = {};

        userFactory.newUser = function(userPack) {
            return $http.post('/api/user', userPack)
        }

        userFactory.getAllUsers = function() {
            return $http.get('/api/user');
        }

        userFactory.changeUserStatus = function(changeThisUserStatus) {
            return $http.post('/api/changeUserStatus', changeThisUserStatus);
        }

        return userFactory;
    })