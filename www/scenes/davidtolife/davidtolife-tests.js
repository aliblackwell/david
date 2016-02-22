'use strict';

describe('david.davidtolife', function() {
  var scope, controller, WaltzGroups, firebaseMock, $firebaseObject;

  // Load the module
  beforeEach(function () {
    module('ionic');
    module('david.davidtolife');
  });

  window.MockFirebase.override();

  beforeEach(inject(function($rootScope, $controller, $firebaseObject, $firebaseArray, $ionicSlideBoxDelegate) {
    scope = $rootScope.$new();
    controller = $controller('davidtolifeCtrl', {
      $scope: scope,
      FinishedSwipes: function() {
        var ref = new Firebase('https://david-ionic.firebaseio.com/tests');
        return $firebaseArray(ref);
      },
      User: function() {
        var ref = new Firebase('https://david-ionic.firebaseio.com/tests');
        return $firebaseObject(ref);
      },
      $ionicSlideBoxDelegate: $ionicSlideBoxDelegate
    });
  }));

  it('should have the controller', inject(function() {
    expect(controller).toBeDefined();
  }));

  it('should enable a slider when it loads', inject(function () {
    expect(scope.d.slideactive).toBeTruthy();
  }));

  it('should disable the slider after all the pictures', inject(function () {
    var numberOfImages = scope.turnImages.length;
    scope.slideHasChanged(numberOfImages + 1);
    expect(scope.d.slideactive).toBeFalsy();
  }));

});
