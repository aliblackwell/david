'use strict';

angular.module('results', [
  'results.controller',
  'results.firebase'
])

angular.module('results.controller', [])
  .controller('resultsCtrl', ['$scope', '$location', 'Database', function($scope, $location, Database) {
    console.log($location.path());

    var showSlug, selectedUserId;

    var db = new Database();
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
      calculateTinderResultsGroup();
    }

    var calculateTinderResultsGroup = function() {
      var lifeswipes = db[showSlug].lifeswipes;
      var likes = [];
      var dislikes = [];

      var images = {
        '/img/davids/angry.jpg': {
          'likes': [],
          'dislikes': []
        },
        '/img/davids/debauched.jpg': {
          'likes': [],
          'dislikes': []
        },
        '/img/davids/defamation.jpg': {
          'likes': [],
          'dislikes': []
        },
        '/img/davids/disappearing.jpg': {
          'likes': [],
          'dislikes': []
        },
        '/img/davids/disgust.jpg': {
          'likes': [],
          'dislikes': []
        },
        '/img/davids/dull.jpg': {
          'likes': [],
          'dislikes': []
        },
        '/img/davids/excited.jpg': {
          'likes': [],
          'dislikes': []
        },
        '/img/davids/professional.jpg': {
          'likes': [],
          'dislikes': []
        },
        '/img/davids/sad.jpg': {
          'likes': [],
          'dislikes': []
        }
      }

      if ($scope.activeUser) {
        var userLikes = [];
        var userDislikes = [];
      }

      angular.forEach(lifeswipes, function(user, id) {
        angular.forEach(user, function(swipe) {
          if (swipe.sentiment === 'like') {
            likes.push(swipe);
            images[swipe.image].likes.push(swipe);
          } else {
            dislikes.push(swipe);
            images[swipe.image].dislikes.push(swipe);
          }

          if ($scope.activeUser && $scope.activeUser.id === id) {
            if (swipe.sentiment === 'like') {
              userLikes.push(swipe);
            } else {
              userDislikes.push(swipe);
            }
          }
        })
      })

      if (likes.length > dislikes.length) {
        $scope.preshowPositive = true;
      } else {
        $scope.preshowPositive = false;
      }
      $scope.audienceNumberOfLikes = likes.length;
      $scope.audienceNumberOfDislikes = dislikes.length;

      if ($scope.activeUser) {
        if (userLikes.length > userDislikes.length) {
          $scope.userPreshowPositive = true;
        } else {
          $scope.userPreshowPositive = false;
        }
        $scope.userNumberOfLikes = userLikes.length;
        $scope.userNumberOfDislikes = userDislikes.length;
      }
      var mostLikes = 0;
      var mostDislikes = 0;
      var mostPopularImage = {};
      var leastPopularImage = {};
      angular.forEach(images, function(arrs, imgslug) {
        if (arrs.likes.length > mostLikes) {
          mostPopularImage.url = imgslug;
          mostPopularImage.count = arrs.likes.length;
          mostLikes = arrs.likes.length;
        }
        if (arrs.dislikes.length > mostDislikes) {
          leastPopularImage.url = imgslug;
          leastPopularImage.count = arrs.dislikes.length;
          mostDislikes = arrs.dislikes.length;
        }
      });
      $scope.mostPopularImage = mostPopularImage;
      $scope.leastPopularImage = leastPopularImage;
      $scope.loaded = true;
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
