'use strict';

angular.module('david.blank').config(function($stateProvider) {
  $stateProvider.state('blank', {
    url: '/',
    cache: false,
    views: {
      'main-view': {
        templateUrl: 'scenes/blank/blank.html',
        controller: 'blankCtrl'
      }
    }
  })
});
