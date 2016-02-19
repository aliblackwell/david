'use strict';

angular.module('projections.davidtolife').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('davidtolife', {
    url: 'davidtolife',
    cache: false,
    views: {
      'projections-view': {
        templateUrl: 'davidtolife/davidtolife.html',
        controller: 'davidtolifeCtrl'
      }

    }
  })
}]);
