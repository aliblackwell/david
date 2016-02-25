'use strict';

angular.module('projections.end').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('end', {
    url: 'end',
    cache: false,
    views: {
      'projections-view': {
        templateUrl: 'end/end.html',
        controller: 'endCtrl'
      }

    }
  })
}]);
