'use strict';

angular.module('david.welcomeControllers', [])

  .controller('welcomeTabsCtrl', ['$scope', '$timeout', '$ionicTabsDelegate', '$state', function ($scope, $timeout, $ionicTabsDelegate, $state){
    $timeout(function() {
      $ionicTabsDelegate.select(1);
    }, 20);
  }])

  .controller('welcomeEpoqCtrl', ['$scope', '$timeout', '$ionicTabsDelegate', '$state', function ($scope, $timeout, $ionicTabsDelegate, $state){

  }])


  .controller('welcomeCtrl', ['$scope', 'User', 'AvailablePerformances', '$location', 'Settings', '$rootScope', function ($scope, User, AvailablePerformances, $location, Settings, $rootScope){

    var user, shows;

    // Workaround for ion-content bug
    $scope.d = {};

    // Load available performances
    shows = AvailablePerformances;
    shows.$loaded().then(function(){
      $scope.d.shows = shows;
      user = User;
      user.$bindTo($scope, 'user');
    })

    $scope.setShow = function() {
      localStorage.setItem('showId', $scope.user.show);
      $rootScope.watchSettings();
    }

  }])