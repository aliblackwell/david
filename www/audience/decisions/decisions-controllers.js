'use strict';

angular.module('david.decisionsControllers', [])
  .controller('decisionsCtrl', ['$scope', 'User', '$state', 'DecisionImages', 'DecisionStore', function ($scope, User, $state, DecisionImages, DecisionStore){
    var currentSection, images, store, numberOfDecisions;
    $scope.d = {}

    var user = new User();
    currentSection = $state.current.name;

    user.$loaded().then(function() {
      loadDatabase();
    })

    var loadDatabase = function() {
      store = new DecisionStore(currentSection, user);
      store.$loaded().then(function(){
        loadPage();

      })
    }

    var loadPage = function() {
      images = new DecisionImages(currentSection);
      $scope.choices = images
      showAudienceResults();
      watchResults();
    }

    var watchResults = function() {
      // Every time the results change in Firebase
      $scope.unwatchResults = store.$watch(function() {
        showAudienceResults();
      })
    }

    var showAudienceResults = function() {
      numberOfDecisions = []
      angular.forEach(store, function(k,v) {
        numberOfDecisions.push(k)
      });

      var numDecs;
      if (numberOfDecisions.length <= 8) {
        numDecs = 2;
      }

      if (numberOfDecisions.length > 8 && numberOfDecisions.length <= 16) {
        numDecs = 3;
      }

      if (numberOfDecisions.length >= 17) {
        numDecs = 4;
      }

      $scope.d.thumbWidth = 100 / numDecs;
      $scope.d.results = store;
    }

    $scope.makeChoice = function(choice) {

      choice.chosen = true;
      angular.forEach($scope.choices, function(v,k) {
        if (v.choiceName != choice.choiceName) {
          v.chosen = false
        } else {
          v.chosen = true;
          saveChoice(v);
        }
      })
    }

    var saveChoice = function(v) {
      store[user.$id] = v;
      store.$save();
    }

    // Should be run whenever this view is closed
    $scope.$on('$destroy', function() {
      if (user) {
        user.$destroy()
      }
      if (store) {
        store.$destroy();
      }
      if($scope.unwatchResults) {
        $scope.unwatchResults();
      }
    });
  }])
