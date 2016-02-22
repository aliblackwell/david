'use strict';

angular.module('david.vicarioustrauma').config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('vicarioustrauma', {
      cache: false,
      views: {
        'main-view': {
          templateUrl: 'scenes/vicarioustrauma/vicarioustrauma.html',
          controller: 'vicarioustraumaCtrl'
        }
      }
    })
    .state('vicarioustrauma2', {
        cache: false,
        views: {
          'main-view': {
            templateUrl: 'scenes/vicarioustrauma/vicarioustrauma.html',
            controller: 'vicarioustraumaCtrl'
          }
        }
      })
    .state('vicarioustrauma3', {
        cache: false,
        views: {
          'main-view': {
            templateUrl: 'scenes/vicarioustrauma/vicarioustrauma.html',
            controller: 'vicarioustraumaCtrl'
          }
        }
      })
}]);
