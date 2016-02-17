'use strict';

angular.module('david.hips').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('hips', {
    cache: false,
    views: {
      'main-view': {
        templateUrl: 'scenes/hips/hips.html',
        controller: 'hipsCtrl'
      }
    }
  })
}]);
