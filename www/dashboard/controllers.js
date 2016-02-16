'use strict';

angular.module('dashboard.controllers', [])
  .controller('dashboardCtrl', ['$scope', 'AvailablePerformances','Sections','ActiveSection', '$ionicModal', 'Hips', '$interval', '$timeout', 'TriggerReload', 'DecisionStore', function ($scope, AvailablePerformances, Sections, ActiveSection, $ionicModal, Hips, $interval, $timeout, TriggerReload, DecisionStore){

    var performances, sections, decision;

    $scope.d = {};

    performances = new AvailablePerformances();
    performances.$loaded().then(function() {
      $scope.d.performances = performances;
    });

    $scope.setShow = function() {
      if ($scope.unbind) {
        $scope.unbind();
      }
      var activeSection = new ActiveSection($scope.d.activeShow);
      activeSection.$loaded().then(function(){
        activeSection.$bindTo($scope, 'activeSection').then(function(unbind){
          $scope.unbind = unbind;
          $scope.setActiveSection();
        });
      })

    };

    $scope.triggerReload = function() {
      var reload = new TriggerReload()
      reload.$value = true;
      reload.$save()
      $timeout(function(){
        reload.$value = false;
        reload.$save()
      }, 100);
    }

    $scope.setActiveSection = function() {
      $scope.d.sections = new Sections();
      $scope.d.sections[$scope.activeSection.section].active = true
      $scope.d.activeSectionFull = $scope.d.sections[$scope.activeSection.section]
    }

    $scope.changeActiveSection = function(activeSection) {

      cleanupPreviousSection();

      angular.forEach($scope.d.sections, function(section, key) {
        if (key != activeSection.key) {
          section.active = false;
        }
      });
      $scope.activeSection.section = activeSection.key;
      if (activeSection.type === 'decision') {
        $scope.startTimer(activeSection);
      }
    }

    $scope.startTimer = function(activeSection) {
      decision = new DecisionStore($scope.d.activeShow, activeSection.key);
      var count = activeSection.timerLength;
      $scope.clearDecisionTimer = $interval(function() {
        if (count != -1) {
          $scope.d.timer = count;
          decision.timer = count;
          decision.$save();
          count--;
        }
      }, 1000, count + 1);
    }

    $scope.launchControls = function(activeSection) {

      $ionicModal.fromTemplateUrl(activeSection.key+'.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });

    }

    $scope.closeModal = function() {
      $scope.modal.hide().then(function() {
        // cleanup
        $scope.modal.remove();

        if ($scope.clearInterval) {
          $interval.cancel($scope.clearInterval);
        }

        if (hips) {
          hips.$destroy();
        }

      });
    }

    var cleanupPreviousSection = function() {
      if ($scope.clearDecisionTimer) {
        $interval.cancel($scope.clearDecisionTimer);
      }
    }


    /*
    //  Hips Modal Controls
    //  * bind to /show_slug/hips in firebase
    //  * countdown at /show_slug/hips/timer
    */

    var hips, voteIteration = 0;

    // count down from 15 seconds
    var hipsStartCountdown = function() {
      var count = 15;
      hips.voteIteration = 'vote'+voteIteration;
      voteIteration++;
      hips.$save();

      $scope.clearInterval = $interval(function() {
        if (count != -1) {
          $scope.d.timer = count;
          hips.timer = count;
          hips.$save();
          count--;
        } else {
          $scope.hipsCalculateResults();
          hips.timer = ''
          hips.$save();
        }
      }, 1000, 17);
    }


    $scope.hipsCalculateResults = function() {
      var mean,
          results = []
      if (hips.responses) {
        angular.forEach(hips.responses[hips.voteIteration], function(response, key) {
          results.push(parseInt(response.decision));
        });
      }
      if (results.length) {
        var total = results.reduce(function(previousValue, currentValue, currentIndex, array) {
          return previousValue + currentValue;
        });
        mean = total / results.length;
        $scope.d.result = mean;
      } else {
        if($scope.d.result) {
          // set mean to previous result
          mean = $scope.d.result;
        } else {
          mean = 50;
        }
      }
      var newObj = {
        "avg": mean,
        "iteration": hips.voteIteration
      }
      if (!hips.results) {
        hips.results = {}
        hips.results.iterator = 0;
      }
      hips.results[hips.voteIteration] = newObj
      hips.results.iterator++;
      hips.$save();
      $timeout(function() {
        hipsStartCountdown();
      }, 5000)

      //hipsSaveOldResults(hips.responses);
    }

    $scope.hipsStart = function() {
      hips = new Hips($scope.d.activeShow);
      hips.$loaded().then(function(){
        hipsStartCountdown();
      })
    }

    var stopHips = function() {

    }

  }])



