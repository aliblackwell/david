// David Audience App

angular.module('david', [
  'ionic',
  'ionic.service.core',
  'firebase',
  'david.global.services',
  'david.show.services',
  'david.welcome',
  'david.davidtolife',
  'david.vicarioustrauma',
  'david.end',
  'david.waltz',
  'david.kittens',
  'david.hips',
  'david.decisions',
  'david.religioninatie',
  'david.skipping',
  'david.swipinghello',
  'david.mundane',
  'david.intimacy',
  'david.puppies',
  'ionic.contrib.ui.tinderCards',
  'ui.router',
  'david.countdown',
  'ngTouchmove',
  'ngTouchend'
])

.config(['$ionicConfigProvider', function($ionicConfigProvider) {
  // Disable caching globally
  $ionicConfigProvider.views.maxCache(0);
  $ionicConfigProvider.views.transition('none');
}])

.run(['$ionicPlatform', 'Settings', '$location', '$rootScope', '$state', '$ionicViewSwitcher', '$window', 'TriggerReload', 'NetworkCheck', function($ionicPlatform, Settings, $location, $rootScope, $state, $ionicViewSwitcher, $window, TriggerReload, NetworkCheck) {

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
      if ($state.current.name != 'refresh') {
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
    }

    var reloadHolder = false;

    $rootScope.watchForRefresh = function() {

      // stop watching if already watching
      if ($rootScope.unwatchReload) {
        $rootScope.unwatchReload();
      }
      var reload = new TriggerReload();
      $rootScope.unwatchReload = reload.$watch(function() {
        if(reload.$value != reloadHolder) {
          $window.location.reload();
        }
      });
    }


    // If show ID is already
    if (localStorage.getItem('showId')) {
      if (localStorage.getItem('showId') != 'undefined') {
        $rootScope.watchSettings();
      }
    }

    // Watch for the server refresh command
    $rootScope.watchForRefresh();

  });





}])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('welcome', {
    url: '/',
    cache: false,
    views: {
      'main-view': {
        templateUrl: 'scenes/welcome/welcome.html',
        controller: 'welcomeCtrl'
      }
    }
  })

  $stateProvider.state('refresh', {
    url: '/refresh',
    cache: false,
    views: {
      'main-view': {
        templateUrl: 'scenes/welcome/refresh.html',
        controller: 'refreshCtrl'
      }
    }
  })



  }])


.constant('FIREBASE_URL', 'https://david-ionic.firebaseio.com/');
