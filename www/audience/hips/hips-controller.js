'use strict';

angular.module('david.hipsController', [])
  .controller('hipsCtrl', ['$scope', 'User', 'Hips', 'HipsResult', 'HipsTimer', 'HipsResponses', '$timeout', '$ionicModal', function ($scope, User, Hips, HipsResult, HipsTimer, HipsResponses, $timeout, $ionicModal){

    /*
      This controller saves the user response
      It also watches hips/results and when it changes, it shows the results page
    */

    var unwatchResults, choice,
        timer, hips,
        results = new HipsResult(),
        user = new User();

    $scope.d = {}

    var resetButton = function() {
      $scope.d.saveState = 'Save';
      $scope.d.buttonStyle = 'button-positive';
    }

    var getWordFromNumber = function(number) {
      var word;
      if (number > 50) {
        word = "You pushed David further away";
      } else if (number < 50) {
        word = "You brought David closer";
      } else {
        word = "You thought David's position was just right";
      }
      return word;
    }


    $scope.d.voted = false;

    $scope.d.distance = 50;

    timer = new HipsTimer();
    var timerUnwatch = timer.$watch(function() {
      $scope.d.timer = timer.$value;
    })



    resetButton();



    user.$loaded().then(function(){
      user.uuid = user.$id;
    });

    $scope.submitRange = function() {
      hips = new Hips();
      hips.$loaded().then(function(){
        var saveLocation = new HipsResponses(user, hips.voteIteration);
        saveLocation.decision = $scope.d.distance;
        console.log(saveLocation);
        saveLocation.$save();
        $scope.d.saveState = 'Saved';
        $scope.d.buttonStyle = 'button-balanced';
        $scope.d.voted = true;
        $timeout(resetButton, 1000);
      })
    };

    $scope.closeModal = function() {
      if ($scope.modal) {
        $scope.modal.hide().then(function(){
          $scope.modal.remove();
        })
      }
      $scope.d.voted = false;
    };



    $scope.unwatchResults = results.$watch(function() {
      if(results.$value != 0) {
        $scope.d.showResults = true;
        $scope.d.audienceResult = getWordFromNumber(results.$value);

        // This if statement should never run as
        // we remove it in $scope.closeModal BSTS
        if ($scope.modal) {
          $scope.modal.remove();
        }

        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
            $timeout($scope.closeModal, 5000);
        });
      }
    });


    // Should be run whenever this view is closed
    $scope.$on('$destroy', function() {
      console.log('destroying view')
      $scope.unwatchResults();
      if ($scope.modal) {
        $scope.closeModal();
      }
      if (results) {
        results.$destroy();
      }
      if (user) {
        user.$destroy();
      }
      if(timerUnwatch) {
        timerUnwatch()
      }
    })



  }])
