'use strict';

angular.module('david.welcomeControllers', [])


  .controller('welcomeEpoqCtrl', ['$scope', '$timeout', '$ionicTabsDelegate', '$state', function ($scope, $timeout, $ionicTabsDelegate, $state){

  }])


  .controller('welcomeCtrl', ['$scope', 'User', 'AvailablePerformances', '$location', 'Settings', '$rootScope', '$timeout', function ($scope, User, AvailablePerformances, $location, Settings, $rootScope, $timeout){

    var user, shows;

    // Workaround for ion-content bug
    $scope.d = {};

    $scope.d.saveState = 'Save';
    $scope.d.buttonStyle = 'button-positive'

    // Load available performances
    shows = AvailablePerformances;
    shows.$loaded().then(function(){
      $scope.d.shows = shows;
      user = User;
      user.$bindTo($scope, 'user');
      if (user.name) {
        $scope.saveResponse();
      }
    })

    $scope.setShow = function() {
      localStorage.setItem('showId', $scope.user.show);
      $rootScope.watchSettings();
      $scope.resetSave();
    }

    $scope.saveResponse = function() {
      $scope.d.saveState = 'Saved';
      $scope.d.buttonStyle = 'button-balanced';
      $scope.d.buttonIcon = ' ';
    }

    $scope.resetSave = function() {
      $scope.d.saveState = 'Save';
      $scope.d.buttonStyle = 'button-positive';
      $scope.d.buttonIcon = '';
    }

  }])