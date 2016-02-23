'use strict';

angular.module('results', [
  'results.controller',
  'results.firebase',
  'results.welcome'
])

angular.module('results.controller', [])
  .controller('resultsCtrl', ['$scope', '$location', 'Database', function($scope, $location, Database) {
    console.log($location.path());

    var showSlug, selectedUserId;

    var db = Database;
    var personal = false;


    db.$loaded().then(function(){
      displayResults();



    })

    var displayResults = function() {
      var params = $location.path().split('/')
      showSlug = params[1];
      if (params[2] != '') {
        selectedUserId = params[2];
      }

      if (params[3] === 'personal') {
        personal = true;
      }
      $scope.performance = db.availablePerformances[showSlug].name
      getAudience();

    }

    var getAudience = function() {
      var audienceCount = []
      $scope.audience = {}
      angular.forEach(db.users, function(user,id) {
        if (user.show === showSlug) {
          user.id = id;
          user.greeting = user.name;
          audienceCount.push(user);
          if (selectedUserId) {
            if (id === selectedUserId) {
              user.active = true;
              if (personal) {
                user.greeting = 'You'
              }
              $scope.activeUser = user;
            }
          }
          $scope.audience[id] = user
        }
      });
      $scope.audienceCount = audienceCount.length;
      calculateTinderResultsGroup();
    }

    $scope.setActive = function(userId) {
      $scope.activeUser = $scope.audience[userId];
      angular.forEach($scope.audience, function(user, id) {
        user.active = false;
      })
      $scope.audience[userId].active = true;
      $location.path('/'+showSlug+'/'+userId);

    }







  }])


angular.module('results.firebase', ['firebase'])
  .factory('Database', ['$firebaseObject', function($firebaseObject) {

    var itemsRef = new Firebase('https://david-ionic.firebaseio.com/');
    return $firebaseObject(itemsRef);

  }])
