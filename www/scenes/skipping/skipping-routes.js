'use strict';

angular.module('david.skipping').config(function($stateProvider) {
  $stateProvider.state('skipping', {
    cache: false,
    views: {
      'main-view': {
        templateUrl: 'scenes/skipping/skipping.html',
        controller: 'skippingCtrl',
          resolve: {
            user: function(User) {
              console.log('works')
              var user = new User();
              return user;
            }
          }
      }
    }
  })
});