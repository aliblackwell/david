'use strict';

angular.module('david.hips').config(function($stateProvider) {
  $stateProvider.state('hips', {
    url: '/',
    cache: false,
    views: {
      'main-view': {
        templateUrl: 'scenes/hips/hips.html',
        controller: 'hipsCtrl'
      }
    }
  })
});
