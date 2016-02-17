// David Projections

angular.module('projections', ['ionic', 'ionic.service.core', 'firebase', 'ui.router', 'david.global.services', 'projections.selectshow'])

.run(['$ionicPlatform', function($ionicPlatform) {
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

}])


.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider

    .state('selectshow', {
      url: '/',
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
