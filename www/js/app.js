// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('david', ['ionic', 'ionic.service.core', 'firebase', 'david.controllers', 'david.services'])

.config(function($ionicConfigProvider) {
  // Disable caching globally
  $ionicConfigProvider.views.maxCache(0);
})

.run(function($ionicPlatform, Settings, $location) {
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

  // Change the route when the settings change
  var settings = Settings;
  settings.$watch(function() {
    $location.path('/' + settings.section);
  });


})


.config(function($stateProvider, $urlRouterProvider) {
  //$urlRouterProvider.otherwise('/tab/interactive');
  $stateProvider

    .state('scanningwords', {
      url: '/scanningwords',
      views: {
        'main-view': {
          templateUrl: 'templates/scanningwords.html',
          controller: 'scanningwordsCtrl'
        }
      }
    })

    .state('hips', {
      url: '/hips',
      views: {
        'main-view': {
          templateUrl: 'templates/hips.html',
          controller: 'hipsCtrl'
        }
      }
    })

    .state('tab', {
      url: '/tabs',
      views: {
        'main-view': {
          templateUrl: 'templates/tabs.html'
        }
      }
    })

    .state('tab.hips', {
          url: '/hips',
          views: {
            'hips-tab': {
              templateUrl: 'templates/hips.html',
              controller: 'hipsCtrl'
            }
          }
        })
    .state('tab.stats', {
      url: '/stats',
      views: {
        'stats-tab': {
          templateUrl: 'templates/stats.html',
          controller: 'statsCtrl'
        }
      }
    })


  })

  .constant('FIREBASE_URL', 'https://david-ionic.firebaseio.com/');