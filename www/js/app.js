// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('david', ['ionic', 'ionic.service.core', 'firebase', 'david.controllers', 'david.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider

    .state('home', {
      url: '/home',
      views: {
        home: {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }

    })

    .state('interactive', {
      url: '/interactive',
      cache: false,
      views: {
        interactive: {
          templateUrl: 'templates/interactive.html',
          controller: 'interactiveCtrl'
        }
      }
    })

    .state('scanningwords', {
      url: '/scanningwords',
      views: {
        scanningwords: {
          templateUrl: 'templates/scanningwords.html',
          controller: 'scanningwordsCtrl'
        }
      }
    })

    .state('list', {
      url: '/list',
      views: {
        interactive: {
          templateUrl: 'templates/list.html',
          controller: 'listCtrl'
        }
      }
    })

    .state('stats', {
      url: '/stats',
      views: {
        stats: {
          templateUrl: 'templates/stats.html',
          controller: 'statsCtrl'
        }
      }
    })
  })

  .constant('FIREBASE_URL', 'https://daviddavid.firebaseio.com/');