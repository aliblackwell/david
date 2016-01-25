'use strict';

angular.module('david.hipsController', [])
  .controller('hipsCtrl', ['$scope', 'User', 'Hips', 'HipsResult', '$timeout', '$ionicModal', function ($scope, User, Hips, HipsResult, $timeout, $ionicModal){

    /*
      This controller saves the user response
      It also watches hips/results and when it changes, it shows the results page
    */

    var unwatchResults, choice,
        results = new HipsResult(),
        user = User;

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

    // Should be run whenever this view is closed
    var closeView = function() {
      $scope.unwatchResults();
      $scope.closeModal();
      results.destroy();
      user.destroy();
    }



    $scope.d.voted = false;

    $scope.d.distance = 50;

    $scope.d.countdown = 14; // read from firebase.hips.timer

    resetButton();



    user.$loaded().then(function(){
      user.uuid = user.$id;
      choice = new Hips(user);
    });

    $scope.submitRange = function() {
      choice.decision = $scope.d.distance;
      choice.$save();
      $scope.d.saveState = 'Saved';
      $scope.d.buttonStyle = 'button-balanced';
      $scope.d.voted = true;
      $timeout(resetButton, 1000);
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





  }])
