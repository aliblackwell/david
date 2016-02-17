'use strict';

angular.module('david.religioninatie').config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('religioninatie', {
    cache: false,
    views: {
      'main-view': {
        templateUrl: 'scenes/religioninatie/religioninatie.html',
        controller: 'religioninatieCtrl',
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
