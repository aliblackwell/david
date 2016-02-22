'use strict';

describe('david/waltz', function() {
  var scope, controller;

  // Load the module
  beforeEach(function () {
    module('david.waltz');
  });

  window.MockFirebase.override();

  beforeEach(inject(function($rootScope, $controller, $firebaseObject) {
    scope = $rootScope.$new();
    controller = $controller('waltzCtrl', {
      $scope: scope,
      WaltzGroups: function() {
        var ref = new Firebase('https://david-ionic.firebaseio.com/tests');
        return $firebaseObject(ref);
      }
    });
  }));

  it('should have the controller', inject(function() {
    expect(controller).toBeDefined();
  }));

  it('should choose a random group', inject(function () {
    expect(scope.group.length).toEqual(2);
  }));

  it('should set the light to be off by default', inject(function () {
    expect(scope.d.showLight).toBeFalsy();
  }));

});
