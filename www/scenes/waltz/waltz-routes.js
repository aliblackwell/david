'use strict';

angular.module('david.waltz').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('waltz', {
    cache: false,
    views: {
      'main-view': {
        templateUrl: 'scenes/waltz/waltz.html',
        controller: 'waltzCtrl'
      }
    }
  })
}]);
