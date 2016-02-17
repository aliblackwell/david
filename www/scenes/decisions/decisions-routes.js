'use strict';

angular.module('david.decisions').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('skiporhips', {
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
    .state('skipormundane', {
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
}]);
