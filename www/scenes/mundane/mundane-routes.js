'use strict';

angular.module('david.mundane').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('mundane', {
    cache: false,
    views: {
      'main-view': {
        templateUrl: 'scenes/mundane/mundane.html',
        controller: 'mundaneCtrl'
      }
    }
  })
}]);
