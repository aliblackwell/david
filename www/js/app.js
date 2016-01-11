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
  $urlRouterProvider.otherwise('/tab/interactive');
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    .state('tab.interactive', {
      url: '/interactive',
      cache: false,
      views: {
        'interactive': {
          templateUrl: 'templates/interactive.html',
          controller: 'interactiveCtrl'
        },
        'loading@tab.interactive': {
          templateUrl: 'templates/loading.html'
        },
        'scanningwords@tab.interactive': {
          templateUrl: 'templates/scanningwords.html'
        }
      }
    })

    .state('tab.home', {
      url: '/home',
      cache: false,
      views: {
        home: {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })





    .state('tab.list', {
      url: '/list',
      cache: false,
      views: {
        list: {
          templateUrl: 'templates/list.html',
          controller: 'listCtrl'
        }
      }
    })

    .state('tab.stats', {
      url: '/stats',
      cache: false,
      views: {
        stats: {
          templateUrl: 'templates/stats.html',
          controller: 'statsCtrl'
        }
      }
    })
  })

  .constant('FIREBASE_URL', 'https://daviddavid.firebaseio.com/');