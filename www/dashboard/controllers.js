'use strict';

angular.module('dashboard.controllers', [])
  .controller('dashboardCtrl', ['$scope', 'AvailablePerformances','Sections','ActiveSection', function ($scope, AvailablePerformances, Sections, ActiveSection){

    var performances, sections;

    $scope.d = {};

    performances = AvailablePerformances;
    performances.$loaded().then(function() {
      $scope.d.performances = performances;
    });

    $scope.setShow = function() {
      if ($scope.unbind) {
        console.log('unbinding')
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
      console.log($scope.d.sections)
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

  }])



