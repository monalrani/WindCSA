/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
define(['angular', 'angular-ui-router'], function(angular) {
    'use strict';
    return angular.module('app.routes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        //Turn on or off HTML5 mode which uses the # hash
        $locationProvider.html5Mode(true).hashPrefix('!');

        /**
         * Router paths
         * This is where the name of the route is matched to the controller and view template.
         */
        $stateProvider
            .state('secure', {
                template: '<ui-view/>',
                abstract: true,
                resolve: {
                    authenticated: ['$q', 'PredixUserService', function ($q, predixUserService) {
                        var deferred = $q.defer();
                        predixUserService.isAuthenticated().then(function(userInfo){
                            deferred.resolve(userInfo);
                        }, function(){
                            deferred.reject({code: 'UNAUTHORIZED'});
                        });
                        return deferred.promise;
                    }]
                }
            })
            .state('home', {
               // parent: 'secure',
                url: '/home',
                templateUrl: 'views/dashboards.html',
                controller: 'DashboardsCtrl'
            })
            .state('backLog', {
                url: '/backLog',
                templateUrl: 'views/blank-page.html',
                //controller: 'DashboardsCtrl'
            })
             .state('contract', {
                url: '/contract',
                templateUrl: 'views/grid.html'
            })
            /*
             .state('help', {
                url: '/help',
                templateUrl: 'views/blank-page.html'
            })
             .state('preferences', {
                url: '/preferences',
                templateUrl: 'views/blank-page.html'
            })
             .state('scorecard', {
                url: '/scorecard',
                templateUrl: 'views/blank-page.html'
            })
             .state('logOut', {
                url: '/logOut',
                templateUrl: 'views/blank-page.html'
            })
            .state('blanksubpage', {
                url: '/blanksubpage',
                templateUrl: 'views/blank-sub-page.html'
            })
             .state('jobpages', {
                url: '/jobpages',
                templateUrl: 'views/wip-cip-job-pages.html'
            })
            .state('addJob', {
                url: '/addJob',
                templateUrl: 'views/blank-page.html'
            })*/
            ;


        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            /*-- home navigation default selected marked. RM329956--*/
            document.querySelector('px-app-nav').markSelected('/home');
            $state.go('home');
        });

    }]);
});
