'use strict';

angular.module('david.welcome').config(function($stateProvider) {
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
});
