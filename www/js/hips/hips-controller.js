'use strict';

angular.module('david.hipsController', [])
  .controller('hipsCtrl', ['$scope', 'User', 'Hips', 'HipsResult', '$timeout', '$ionicModal', function ($scope, User, Hips, HipsResult, $timeout, $ionicModal){

    /*
      This controller saves the user response
      It also watches hips/results and when it changes, it shows the results page

    */

    var resetButton = function() {
      $scope.d.saveState = 'Save';
      $scope.d.buttonStyle = 'button-positive'
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

    var choice;

    $scope.d = {}

    $scope.d.voted = false;

    $scope.d.distance = 50;

    $scope.d.countdown = 14; // read from firebase.hips.timer

    resetButton();

    var user = User;

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

    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.closeModal = function() {
      $scope.modal.hide();
      $scope.d.voted = false;
    }


    var results = new HipsResult();
    var unwatchResults = results.$watch(function() {
      if(results.$value != 0) {
        $scope.d.showResults = true;
        $scope.d.audienceResult = getWordFromNumber(results.$value);
        $scope.modal.show();
      }
    });





  }])
