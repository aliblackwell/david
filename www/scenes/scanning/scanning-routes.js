'use strict';

angular.module('david.scanning').config(function($stateProvider) {
  $stateProvider.state('scanning', {
    cache: false,
    views: {
      'main-view': {
        templateUrl: 'scenes/scanning/scanning.html',
        controller: 'scanningCtrl',
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
