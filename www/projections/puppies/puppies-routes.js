'use strict';

angular.module('projections.puppies').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('puppies', {
    url: 'puppies',
    cache: false,
    views: {
      'projections-view': {
        templateUrl: 'puppies/puppies.html',
        controller: 'puppiesCtrl'
      }

    }
  })
}]);
