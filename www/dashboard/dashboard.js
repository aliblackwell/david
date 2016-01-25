// David Dashboard App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('dashboard', ['ionic', 'ionic.service.core', 'firebase', 'dashboard.controllers', 'dashboard.services', 'ui.router', 'david.global.services'])

.config(function($ionicConfigProvider) {
  // Disable caching globally
  $ionicConfigProvider.views.maxCache(0);
  $ionicConfigProvider.views.transition('none');
})

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
  $urlRouterProvider.otherwise('/dashboard');
  $stateProvider

    .state('dashboard', {
      url: '/dashboard',
      cache: false,
      views: {
        'dashboard-view': {
          templateUrl: 'dashboard/template.html',
          controller: 'dashboardCtrl'
        }
      }
    })



  })

  .constant('FIREBASE_URL', 'https://david-ionic.firebaseio.com/');