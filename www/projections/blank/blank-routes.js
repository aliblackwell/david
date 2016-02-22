'use strict';

angular.module('projections.blank').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('blank', {
    cache: false,
    views: {
      'projections-view': {
        templateUrl: 'blank/blank.html',
        controller: 'blankCtrl'
      }
    }
  })
}]);
