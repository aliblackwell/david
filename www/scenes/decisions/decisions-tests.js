'use strict';

describe('david.decisions', function() {
  var scope, controller, WaltzGroups, firebaseMock, $firebaseObject;

  // Load the module
  beforeEach(function () {
    module('ionic');
    module('david.decisions');
  });

  window.MockFirebase.override();

  beforeEach(inject(function($rootScope, $controller, $firebaseObject, $firebaseArray, $ionicSlideBoxDelegate, DecisionImages, $timeout, $state) {
    scope = $rootScope.$new();

    var User = function() {
      var ref = new Firebase('https://david-ionic.firebaseio.com/tests');
      return $firebaseArray(ref);
    }

    controller = $controller('decisionsCtrl', {
      $scope: scope,
      $state: $state,
      user: new User(),
      DecisionStore: function() {
        var ref = new Firebase('https://david-ionic.firebaseio.com/tests');
        return $firebaseArray(ref);
      },
      DecisionImages: DecisionImages,
      DecisionTimer:  function() {
        var ref = new Firebase('https://david-ionic.firebaseio.com/tests');
        return $firebaseObject(ref);
      },
      DecisionResult: function() {
        var ref = new Firebase('https://david-ionic.firebaseio.com/tests');
        return $firebaseObject(ref);
      },
      $timeout: $timeout
    });
  }));

  it('should have the controller', inject(function() {
    expect(controller).toBeDefined();
  }));

  // it('should enable a slider when it loads', inject(function () {
  //   expect(scope.d.slideactive).toBeTruthy();
  // }));

  // it('should disable the slider after all the pictures', inject(function () {
  //   var numberOfImages = scope.turnImages.length;
  //   scope.slideHasChanged(numberOfImages + 1);
  //   expect(scope.d.slideactive).toBeFalsy();
  // }));

});
