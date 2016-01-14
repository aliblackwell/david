'use strict';

angular.module('david.welcomeControllers', [])
  .controller('welcomeCtrl', ['$scope', 'User', 'AvailablePerformances', '$location', function ($scope, User, AvailablePerformances, $location){

    var user, shows, uuid;

    // Workaround for ion-content bug
    $scope.d = {};

    $scope.d.showForm = true;
    // Load available performances
    shows = AvailablePerformances;
    shows.$loaded().then(function(){
      $scope.d.shows = shows;
    })

    $scope.submit = function() {

      // clear localstorage

      uuid = guid();
      localStorage.setItem('uuid', uuid);
      localStorage.setItem('showId', $scope.d.show.slug);

      // set name and show in ls

      user = User.create(uuid, $scope.d.show.slug);
      user.name = $scope.d.name;
      user.email = $scope.d.email;
      user.show = $scope.d.show.slug;
      user.$save();

      $scope.d.showForm = false;
      $location.path('/foyer');



    }

  }])