'use strict';

angular.module('david.swipinghello').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('swipinghello', {
    cache: false,
    views: {
      'main-view': {
        templateUrl: 'scenes/swipinghello/swipinghello.html',
        controller: 'swipinghelloCtrl'
      }
    }
  })
}]);
