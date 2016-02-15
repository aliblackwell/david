'use strict';

angular.module('david')

.config(function($stateProvider) {
  $stateProvider
    .state('skipormundane', {
      cache: false,
      views: {
        'mainview': {
          templateUrl: 'scenes/decisions/decisions.html',
          controller: 'decisionsCtrl',
          resolve: {
            user: function(User) {
              console.log('does not work')
              var user = new User();
              return user;
            }
          }
        }
      }
    })
    .state('skiporhips', {
      cache: false,
      views: {
        'main-view': {
          templateUrl: 'scenes/decisions/decisions.html',
          controller: 'decisionsCtrl',
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
