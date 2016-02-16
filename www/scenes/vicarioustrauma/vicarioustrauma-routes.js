'use strict';

angular.module('david.vicarioustrauma').config(function($stateProvider) {
  $stateProvider
    .state('vicarioustrauma', {
      url: '/',
      cache: false,
      views: {
        'main-view': {
          templateUrl: 'scenes/vicarioustrauma/vicarioustrauma.html',
          controller: 'vicarioustraumaCtrl'
        }
      }
    })
    .state('vicarioustrauma2', {
        url: '/',
        cache: false,
        views: {
          'main-view': {
            templateUrl: 'scenes/vicarioustrauma/vicarioustrauma.html',
            controller: 'vicarioustraumaCtrl'
          }
        }
      })
    .state('vicarioustrauma3', {
        url: '/',
        cache: false,
        views: {
          'main-view': {
            templateUrl: 'scenes/vicarioustrauma/vicarioustrauma.html',
            controller: 'vicarioustraumaCtrl'
          }
        }
      })
});
