angular.module('routeApp', ['ngRoute'])
    .config(function($routeProvider, $locationProvider){

        $routeProvider

        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'adminController',
            controllerAs: 'main'
        })

        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'adminController',
            controllerAs: 'login',
            authenticated: false
        })

        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'adminController',
            controllerAs: 'admin',
            authenticated: true
        })

        .when('/logout', {
            templateUrl: 'views/status/success.html'
        })

        .when('/success', {
            templateUrl: 'views/status/success.html'
        })

        .when('/error', {
            templateUrl: 'views/status/error.html'
        })

        .otherwise({ redirectTo: '/' });
        
        $locationProvider.html5Mode({ //No base
            enabled: true,
            requireBase: false
        });
    })

    .run(['$rootScope', 'Auth', '$location', '$timeout', function ($rootScope, Auth, $location, $timeout) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
          if(next.$$route.authenticated == true){
            //If the user isn't lodded don't let him go into This route
            if ( !Auth.isloggedIn() ){
              event.preventDefault();
              $location.path('/error');
              $timeout(function () {
                $location.path('/');
              }, 2000);
            }
          } else if (next.$$route.authenticated == false){
            if (Auth.isloggedIn()) {
              event.preventDefault();
              $location.path('/admin');
            }
          }
        })
      }]);