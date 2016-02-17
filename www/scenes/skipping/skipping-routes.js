'use strict';

angular.module('david.skipping').config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('skipping', {
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
    .state('skipping2', {
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
}]);
