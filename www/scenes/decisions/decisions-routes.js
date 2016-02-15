'use strict';

angular.module('david.decisions')

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/sdf');
  $stateProvider
    .state('skipormundane', {
      cache: false,
      views: {
        'main-view': {
          templateUrl: 'scenes/decisions/decisions.html',
          controller: 'decisionsCtrl',
          resolve: {
            user: function(User) {

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
          controller: 'decisionsCtrl'
        }
      }
    })
});
