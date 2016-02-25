'use strict';

angular.module('david.skipping').config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('skipping1', {
      cache: false,
      views: {
        'main-view': {
          templateUrl: 'scenes/skipping/skipping.html',
          controller: 'skippingCtrl',
            resolve: {
              user: function(User) {
                var user = new User();
                return user;
              }
            }
        }
      }
    })
    .state('skipping2', {
        cache: false,
        views: {
          'main-view': {
            templateUrl: 'scenes/skipping/skipping.html',
            controller: 'skippingCtrl',
              resolve: {
                user: function(User) {
                  var user = new User();
                  return user;
                }
              }
          }
        }
      })
}]);
