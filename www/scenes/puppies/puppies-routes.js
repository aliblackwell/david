'use strict';

angular.module('david.puppies').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('puppies', {
    cache: false,
    views: {
      'main-view': {
        templateUrl: 'scenes/puppies/puppies.html',
        controller: 'puppiesCtrl',
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
