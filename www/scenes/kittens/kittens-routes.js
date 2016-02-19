'use strict';

angular.module('david.kittens').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('kittens', {
    cache: false,
    views: {
      'main-view': {
        templateUrl: 'scenes/kittens/kittens.html',
        controller: 'kittensCtrl'
      }
    }
  })
}]);
