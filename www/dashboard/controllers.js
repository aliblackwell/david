'use strict';

angular.module('dashboard.controllers', [])
  .controller('dashboardCtrl', ['$scope', 'AvailablePerformances','Sections','ActiveSection', '$ionicModal', 'Hips', 'HipsArchive', '$interval', function ($scope, AvailablePerformances, Sections, ActiveSection, $ionicModal, Hips, HipsArchive, $interval){

    var performances, sections;

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

    $scope.setActiveSection = function() {
      $scope.d.sections = new Sections();
      $scope.d.sections[$scope.activeSection.section].active = true
      $scope.d.activeSectionFull = $scope.d.sections[$scope.activeSection.section]
    }

    $scope.changeActiveSection = function(activeSection) {
      angular.forEach($scope.d.sections, function(section, key) {
        if (key != activeSection.key) {
          section.active = false;
        }
      });
      $scope.activeSection.section = activeSection.key;
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
      $scope.modal.hide();
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

      $interval(function() {
        $scope.d.timer = count;
        hips.timer = count;
        hips.$save();
        count--;
        if (count === 0) {
          $scope.hipsCalculateResults();

        }
      }, 1000, 16);

    }

    var hipsSaveOldResults = function(responses) {
      var archive = new HipsArchive($scope.d.activeShow);
      archive.$add(responses);
    }

    $scope.hipsCalculateResults = function() {
      var results = []
      if (hips.responses) {
        angular.forEach(hips.responses[hips.voteIteration], function(response, key) {
          results.push(parseInt(response.decision));
        });
      }
      if (results.length) {
        var total = results.reduce(function(previousValue, currentValue, currentIndex, array) {
          return previousValue + currentValue;
        });
        var mean = total / results.length;
        $scope.d.result = mean;
        hips.result = mean;
        hips.$save();
      }
      hipsStartCountdown();
      //hipsSaveOldResults(hips.responses);
    }

    $scope.hipsStart = function() {
      hips = new Hips($scope.d.activeShow);
      hips.$loaded().then(function(){
        hipsStartCountdown();
      })
    }

  }])



