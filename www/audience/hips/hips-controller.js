'use strict';

angular.module('david.hipsController', [])
  .controller('hipsCtrl', ['$scope', 'User', 'Hips', 'HipsResults', 'HipsTimer', 'HipsResponses', '$timeout', '$interval', '$ionicModal', function ($scope, User, Hips, HipsResults, HipsTimer, HipsResponses, $timeout, $interval, $ionicModal){

    /*
      This controller saves the user response
      It also watches hips/results and when it changes, it shows the results page
      // TODO: stop the david is coming message from trumping the results message when they vote late
      // Improve the CSS of the animations
    */

    var unwatchResults, choice,
        timer, hips,
        introMessage = 'Move David...',
        user = new User();

    $scope.d = {}
    $scope.d.message = introMessage;
    if(!$scope.previousValue) {
      $scope.previousValue = 50;
    }

    hips = new Hips();

    var resetButton = function() {
      $scope.d.saveState = 'Save';
      $scope.d.buttonStyle = 'button-positive';
    }

    var getRelativeDistance = function(oldValue, newValue) {
      var message, start, end;

      start = parseInt(oldValue);
      end = parseInt(newValue);

      if (start === end){
        message = 'same';
      } else if (end > start) {
        message = 'further';
      } else if (end < start) {
        message = 'closer';
      } else {
        message = false;
      }

      return message
    }

    $scope.updateSliderMessage = function(newValue) {

      var end = parseInt(newValue);

      var message = getRelativeDistance($scope.previousValue, newValue);

      if (message === 'same') {
        $scope.d.message = introMessage + 'or leave him where he is';
      }

      if (message === 'closer') {
        $scope.d.message = introMessage + 'closer';
      }

      if (message === 'further') {
        $scope.d.message = introMessage + 'further away';
      }

    }


    $scope.d.voted = false;

    $scope.d.distance = $scope.previousValue;

    timer = new HipsTimer();
    var timerUnwatch = timer.$watch(function() {
      $scope.d.timer = timer.$value;
    })



    resetButton();



    user.$loaded().then(function(){
      user.uuid = user.$id;
    });

    $scope.submitRange = function() {

      var saveLocation = new HipsResponses(user, hips.voteIteration);
      saveLocation.$loaded().then(function(){
        saveLocation.decision = $scope.d.distance;
        saveLocation.$save();
        $scope.d.saveState = 'Saved';
        $scope.d.buttonStyle = 'button-balanced';

        $timeout(resetButton, 1000);
        $timeout(function(){
          $scope.d.voted = true;
          $scope.d.message = 'David is coming';
        }, 1000)
      })


    };


    $scope.allowNewVote = function() {
      if ($scope.modal) {
        $scope.modal.hide().then(function(){
          $scope.modal.remove();
        })
      }
      $scope.d.voted = false;
      $scope.d.message = introMessage;
    };

    var displayAudienceResult = function() {
      // Display a written result
      var message = getRelativeDistance($scope.previousValue, results[hips.voteIteration].avg);
      if (message) {
        if (message === 'same') {
          $scope.d.message = 'The audience thought he was just right';
        }

        if (message === 'closer') {
          $scope.d.message = 'You and the audience brought David closer';
        }

        if (message === 'further') {
          $scope.d.message = 'You and the audience pushed David away';
        }

      } else {
        $scope.d.message = 'Error connecting to server';
      }
    }

    var animateSlider = function(newValue) {

      /*
      if old value is 30 and new value is 80
      x = oldvalue, while x < newValue, x++

      if old value is 50 and new value is 40
      x = oldvalue, while x > newvalue, oldvalue--

      */
      var timesToIterate,
          oldValue = $scope.d.distance;

      if (newValue < 0) {
        newValue = newValue * -1;
      }

      if (newValue != 0 && oldValue != newValue) {

        if (oldValue <= newValue) {
          timesToIterate = newValue - oldValue;
          console.log(timesToIterate)
          $interval(function() {
            $scope.d.distance = parseInt($scope.d.distance) + 1;

          }, 10, timesToIterate);
        } else {
          timesToIterate = oldValue - newValue;
          console.log(timesToIterate)
          $interval(function(){
              $scope.d.distance = parseInt($scope.d.distance) - 1;

          }, 10, timesToIterate);
        }
      }
    };


    var results = new HipsResults()
    // Every time the results change in Firebase
    $scope.unwatchResults = results.$watch(function() {

      console.log('results changed')

      if(results[hips.voteIteration]) {

        console.log(hips.voteIteration)
        console.log(results[hips.voteIteration])

        // Display a message
        displayAudienceResult()

        // change previous value after running displayAudienceResult
        $scope.previousValue = results[hips.voteIteration].avg;

        // Update the slider with the new value
        animateSlider(results[hips.voteIteration].avg);

        // If they haven't voted by now, force the voted=true state
        $scope.d.voted = true;

        // Allow the audience to vote again
        $timeout($scope.allowNewVote, 5000);


      }
    });


    // Should be run whenever this view is closed
    $scope.$on('$destroy', function() {
      console.log('destroying view')
      $scope.unwatchResults();

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
