'use strict';

angular.module('david.countdown', [])

  .directive('countdown', function () {

    return {
      restrict: 'EA',
      replace: false,
      template: '<span>{{timer}}</span>',
      scope: {
        timer: '='
      }
    };

  })