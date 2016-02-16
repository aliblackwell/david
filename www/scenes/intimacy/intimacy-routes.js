'use strict';

angular.module('david.intimacy')
  .config(function($stateProvider) {
    $stateProvider
      .state('intimacy', {
        cache: false,
        views: {
          'main-view': {
            templateUrl: 'scenes/intimacy/intimacy.html',
            controller: 'intimacyCtrl'
          }
        }
      })

      .state('intimacy-blank', {
        cache: false,
        views: {
          'main-view': {
            templateUrl: 'scenes/intimacy/intimacy.html',
            controller: 'intimacyCtrl'
          }
        }
      })
  });
