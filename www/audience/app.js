// David Audience App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('david', ['ionic', 'ionic.service.core', 'firebase', 'david.global.services', 'david.show.services', 'david.scanningControllers', 'david.davidtolifeControllers', 'david.decisionsControllers', 'david.welcomeControllers', 'ionic.contrib.ui.tinderCards','ui.router', 'david.intimacyController', 'david.hipsController','david.countdown','david.ritControllers', 'ngTouchmove','david.skippingControllers'])

.config(function($ionicConfigProvider) {
  // Disable caching globally
  $ionicConfigProvider.views.maxCache(0);
  $ionicConfigProvider.views.transition('none');
})

.run(function($ionicPlatform, Settings, $location, $rootScope, $state, $ionicViewSwitcher) {
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






    $rootScope.watchSettings = function() {

      // stop watching if already watching
      if ($rootScope.unwatchSettings) {
        $rootScope.unwatchSettings();
      }
      var settings = new Settings();
      $rootScope.unwatchSettings = settings.$watch(function() {
        $ionicViewSwitcher.nextDirection('back');
        $state.go(settings.section);
        if (window.navigator.vibrate) {
          window.navigator.vibrate(200);
        }
      });
    }


    // Change the route when the settings change
    if (localStorage.getItem('showId')) {
      if (localStorage.getItem('showId') != 'undefined') {
        $rootScope.watchSettings();
      }
    }

  });





})


.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider

    .state('welcome', {
      url: '/',
      cache: false,
      views: {
        'main-view': {
          templateUrl: 'audience/welcome/welcome.html',
          controller: 'welcomeCtrl'
        }
      }
    })

    .state('davidtolife', {
      cache: false,
      views: {
        'main-view': {
          templateUrl: 'audience/davidtolife/davidtolife.html',
          controller: 'davidtolifeCtrl'
        }
      }
    })

    .state('skiporhips', {
      cache: false,
      views: {
        'main-view': {
          templateUrl: 'audience/decisions/decisions.html',
          controller: 'decisionsCtrl'
        }
      }
    })

    .state('skipormundane', {
      cache: false,
      views: {
        'main-view': {
          templateUrl: 'audience/decisions/decisions.html',
          controller: 'decisionsCtrl'
        }
      }
    })

    .state('intimacy', {
      cache: false,
      views: {
        'main-view': {
          templateUrl: 'audience/intimacy/intimacy.html',
          controller: 'intimacyCtrl'
        }
      }
    })

    .state('intimacy-blank', {
      cache: false,
      views: {
        'main-view': {
          templateUrl: 'audience/intimacy/intimacy.html',
          controller: 'intimacyCtrl'
        }
      }
    })

    .state('skipping', {
      cache: true,
      views: {
        'main-view': {
          templateUrl: 'audience/skipping/skipping.html',
          controller: 'skippingCtrl'
        }
      }
    })



    .state('hips', {
      cache: true,
      views: {
        'main-view': {
          templateUrl: 'audience/hips/hips.html',
          controller: 'hipsCtrl'
        }
      }
    })

    .state('religioninatie', {
      cache: false,
      views: {
        'main-view': {
          templateUrl: 'audience/religioninatie/religioninatie.html',
          controller: 'religioninatieCtrl'
        }
      }
    })




  })

  .constant('FIREBASE_URL', 'https://david-ionic.firebaseio.com/');