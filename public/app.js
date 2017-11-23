angular.module('mainApp', ['routeApp', 'adminApp', 'adminServ', 'infoSectionServiceServ', 'imageServ', 'userServ', 'fileServ'])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors');
    });