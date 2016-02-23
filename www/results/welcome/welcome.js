'use strict';

angular.module('results.welcome', ['firebase'])

  .directive('welcomeresults',['Images', function (Images) {

    return {
      restrict: 'EA',
      replace: false,
      templateUrl: 'welcome/welcome.html',
      scope: true,
      link: function($scope, element, attrs) {

        var unwatch = $scope.$watch('activeUser', function(newVal, oldVal){
          // or $watchCollection if students is an array
          if (newVal) {
            init();
            // remove the watcher
            // unwatch();
          }
        });

        var init = function() {
          console.log($scope.showSlug)
          var lifeswipes = $scope.db[$scope.showSlug].lifeswipes;
          var likes = [];
          var dislikes = [];

          var images = new Images();

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
      }// END link
    };

  }])

  .factory('Images', function() {
    var Images =  function() {
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
      return images;
    }
    return Images;
  })


