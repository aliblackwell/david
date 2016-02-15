// David Audience App

angular.module('david', [
  'ionic',
  'ionic.service.core',
  'firebase',
  'david.global.services',
  'david.show.services',
  'david.welcome',
  'david.davidtolife',
  'david.blank',
  'david.decisions',
  'david.religioninatie',
  'david.skipping',
  'david.intimacy',
  'david.scanning',
  'ionic.contrib.ui.tinderCards',
  'ui.router',
  'david.countdown',
  'ngTouchmove'
])

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
        console.log(settings.section)
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
.constant('FIREBASE_URL', 'https://david-ionic.firebaseio.com/');