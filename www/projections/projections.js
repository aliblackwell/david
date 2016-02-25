// David Projections

angular.module('projections', [
  'ionic',
  'ionic.service.core',
  'firebase',
  'ui.router',
  'david.global.services',
  'projections.services',
  'projections.selectshow',
  'projections.puppies',
  'projections.hips',
  'projections.blank',
  'projections.davidtolife',
  'projections.end'
  ])

.run(['$ionicPlatform',
  '$rootScope', 'Settings', '$state', 'InteractiveSections', function($ionicPlatform, $rootScope, Settings, $state, InteractiveSections) {
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

      var interactiveSections = new InteractiveSections()
      var settings = new Settings();
      $rootScope.unwatchSettings = settings.$watch(function() {

        if (interactiveSections[settings.section]) {
          console.log($state, settings.section)
          $state.go(settings.section);
        } else if ($state.current.name != 'blank') {
          $state.go('blank');
          console.log('going blank');
        }
      });
    }

  });

}])


.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/choose');
  $stateProvider

    .state('selectshow', {
      url: '/choose',
      cache: false,
      views: {
        'projections-view': {
          templateUrl: 'selectshow/selectshow.html',
          controller: 'selectshowCtrl'
        }
      }
    })



  }])

  .constant('FIREBASE_URL', 'https://david-ionic.firebaseio.com/');
