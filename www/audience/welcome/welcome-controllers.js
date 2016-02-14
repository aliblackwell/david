'use strict';

angular.module('david.welcomeControllers', [])

  .controller('welcomeCtrl', ['$scope', 'User', 'AvailablePerformances', '$location', 'Settings', '$rootScope', '$timeout', 'Connection', function ($scope, User, AvailablePerformances, $location, Settings, $rootScope, $timeout, Connection){

    var user, shows;

    // Workaround for ion-content bug
    $scope.d = {};

    var loadAvailableShows = function() {
      shows = new AvailablePerformances();
      shows.$loaded().then(function(){
        $scope.d.shows = shows;
        $scope.d.saveState = 'Save';
        $scope.d.buttonStyle = 'button-positive'
        loadUser();
      })
    }

    var loadUser = function() {
      user = new User();
      var connection = new Connection(user);
      user.$bindTo($scope, 'user');
      if (user.name) {
        $scope.saveResponse();
      }

    }

    $scope.setShow = function() {
      if ($scope.user.show) {
        localStorage.setItem('showId', $scope.user.show);
      }
      $rootScope.watchSettings();
      $scope.resetSave();
    }

    $scope.saveResponse = function() {
      $scope.d.saveState = 'Saved';
      $scope.d.buttonStyle = 'button-balanced';
    }

    $scope.resetSave = function() {
      $scope.d.saveState = 'Save';
      $scope.d.buttonStyle = 'button-positive';
    }

    loadAvailableShows();

    // Should be run whenever this view is closed
    $scope.$on('$destroy', function() {
      if (shows) {
        shows.$destroy()
      }
      if (user) {
        user.$destroy();
      }
    });

  }])
