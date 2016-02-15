'use strict';

angular.module('david.davidtolife').config(function($stateProvider) {
  $stateProvider.state('davidtolife', {
    cache: false,
    views: {
      'main-view': {
        templateUrl: 'scenes/davidtolife/davidtolife.html',
        controller: 'davidtolifeCtrl'
      }
    }
  })
});
