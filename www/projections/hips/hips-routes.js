'use strict';

angular.module('projections.hips').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('hips', {
    url: 'hips',
    cache: false,
    views: {
      'projections-view': {
        templateUrl: 'hips/hips.html',
        controller: 'hipsCtrl'
      }

    }
  })
}]);
