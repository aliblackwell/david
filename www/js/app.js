// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('david', ['ionic', 'ionic.service.core', 'firebase', 'david.global.services', 'david.show.services', 'david.scanningControllers', 'david.miscControllers', 'david.davidtolifeControllers', 'david.decisionsControllers', 'david.welcomeControllers', 'ionic.contrib.ui.tinderCards'])

.config(function($ionicConfigProvider) {
  // Disable caching globally
  $ionicConfigProvider.views.maxCache(0);
})

.run(function($ionicPlatform, Settings, $location, $rootScope) {
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


  $rootScope.watchSettings = function() {

    // stop watching if already watching
    if ($rootScope.unwatchSettings) {
      console.log('unwatching');
      $rootScope.unwatchSettings();
    }
    var settings = new Settings();
    $rootScope.unwatchSettings = settings.$watch(function() {
      console.log('changed!')
      $location.path('/' + settings.section);
    });
  }

  // Change the route when the settings change
  if (localStorage.getItem('showId')) {
    $rootScope.watchSettings();
  }



})


.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/welcome');
  $stateProvider

    .state('welcome-tabs', {
      url: '/welcome',
      cache: false,
      views: {
        'main-view': {
          templateUrl: 'js/welcome/welcome-tabs.html',
          controller: 'welcomeTabsCtrl'
        }
      }
    })

    .state('welcome-tabs.epoq', {
      url: '/epoq',
      views: {
        'epoq-view': {
          templateUrl: 'js/welcome/epoq.html',
          controller: 'welcomeEpoqCtrl'
        }
      }
    })

    .state('welcome-tabs.details', {
      url: '/details',
      views: {
        'details-view': {
          templateUrl: 'js/welcome/details.html',
          controller: 'welcomeCtrl'
        }
      }
    })

    .state('davidtolife', {
      url: '/davidtolife',
      cache: false,
      views: {
        'main-view': {
          templateUrl: 'js/davidtolife/davidtolife.html',
          controller: 'davidtolifeCtrl'
        }
      }
    })

    .state('decisions', {
      url: '/decisions',
      cache: false,
      views: {
        'main-view': {
          templateUrl: 'js/decisions/decisions.html',
          controller: 'decisionsCtrl'
        }
      }
    })

    .state('scanningwords-tabs', {
      url: '/scanningwords',
      views: {
        'main-view': {
          templateUrl: 'templates/scanningwords-tabs.html',
          controller: 'scanningwordsTabsCtrl'
        }
      }
    })

    .state('scanningwords-tabs.epoq', {
      url: '/epoq',
      views: {
        'epoq-view': {
          templateUrl: 'templates/epoq.html',
          controller: 'epoqCtrl'
        }
      }
    })

    .state('scanningwords-tabs.scanningwords', {
      url: '/content',
      views: {
        'scanning-view': {
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