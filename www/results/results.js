'use strict';

angular.module('results', [
  'results.controller',
  'results.firebase',
  'results.welcome'
])

angular.module('results.controller', [])
  .controller('resultsCtrl', ['$scope', '$location', 'Database', function($scope, $location, Database) {

    $scope.db = new Database();
    $scope.personal = false;


    $scope.db.$loaded().then(function(){


      displayResults();
    })

    var displayResults = function() {
      var params = $location.path().split('/')
      $scope.showSlug = params[1];
      if (params[2] != '') {
        $scope.selectedUserId = params[2];
      }

      if (params[3] === 'personal') {
        $scope.personal = true;
      }
      $scope.performance = $scope.db.availablePerformances[$scope.showSlug].name
      getAudience();

    }

    var getAudience = function() {
      var audienceCount = []
      $scope.audience = {}
      angular.forEach($scope.db.users, function(user,id) {
        if (user.show === $scope.showSlug) {
          user.id = id;
          user.greeting = user.name;
          audienceCount.push(user);
          if ($scope.selectedUserId) {
            if (id === $scope.selectedUserId) {
              user.active = true;
              if ($scope.personal) {
                user.greeting = 'You'
              }
              $scope.activeUser = user;
            }
          }
          $scope.audience[id] = user
        }
      });
      $scope.audienceCount = audienceCount.length;
      $scope.audienceLoaded = true;
    }

    $scope.setActive = function(userId) {
      $scope.activeUser = $scope.audience[userId];
      angular.forEach($scope.audience, function(user, id) {
        user.active = false;
      })
      $scope.audience[userId].active = true;
      $location.path('/'+$scope.showSlug+'/'+userId);
      //$scope.calculateTinderResultsGroup();
    }

    $scope.calculateTinderResultsGroup = function() {
      // dummy function
    }

  }])


angular.module('results.firebase', ['firebase'])
  .factory('Database', ['$firebaseObject', function($firebaseObject) {
    var Database = function(currentSection) {
      var itemsRef = new Firebase('https://david-ionic.firebaseio.com/');
      return $firebaseObject(itemsRef);
    }
    return Database;
  }])
