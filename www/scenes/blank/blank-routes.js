'use strict';

angular.module('david.blank').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('blank', {
    cache: false,
    views: {
      'main-view': {
        templateUrl: 'scenes/blank/blank.html',
        controller: 'blankCtrl'
      }
    }
  })
}]);
