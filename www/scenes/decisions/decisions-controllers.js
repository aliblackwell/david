'use strict';

angular.module('david.decisions', ['david.show.services', 'ui.router','ionic', 'ionic.service.core','firebase', 'david.global.services'])
  .controller('decisionsCtrl', ['$scope', '$state', 'user', 'DecisionStore', function ($scope, $state, user, DecisionStore, DecisionImages){
    var images,
        numberOfDecisions;

    $scope.greeting = 'Hello World!';
    $scope.d = {}

    var currentSection = $state.current.name;

    console.log("HELLO")

    console.log(user)


    var store = new DecisionStore(currentSection, user);
    store.$loaded().then(function(){
      loadPage();

    })

    // var init = function() {
    //   $scope.d = {}

    //   user = new User();
    //   currentSection = $state.current.name;

    //   user.$loaded().then(function() {
    //     loadDatabase();
    //   })
    // }

    // var loadDatabase = function() {
    //   store = new DecisionStore(currentSection, user);
    //   store.$loaded().then(function(){
    //     loadPage();

    //   })
    // }

    var loadPage = function() {
      console.log(currentSection)
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
