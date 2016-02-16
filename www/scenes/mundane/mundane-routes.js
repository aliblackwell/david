'use strict';

angular.module('david.mundane').config(function($stateProvider) {
  $stateProvider.state('mundane', {
    url: '/',
    cache: false,
    views: {
      'main-view': {
        templateUrl: 'scenes/mundane/mundane.html',
        controller: 'mundaneCtrl'
      }
    }
  })
});
