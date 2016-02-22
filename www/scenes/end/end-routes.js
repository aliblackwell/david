'use strict';

angular.module('david.end').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('end', {
    cache: false,
    views: {
      'main-view': {
        templateUrl: 'scenes/end/end.html',
        controller: 'endCtrl'
      }
    }
  })
}]);
