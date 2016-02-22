'use strict';

describe('david.end', function() {
  var scope, controller, WaltzGroups, firebaseMock, $firebaseObject;

  // Load the module
  beforeEach(function () {
    module('david.end');
  });

  window.MockFirebase.override();

  beforeEach(inject(function($rootScope, $controller, $firebaseObject) {
    scope = $rootScope.$new();
    controller = $controller('endCtrl', {
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

  it('should say hello world', inject(function () {
    expect(scope.d.greeting).toEqual('Hello, World!');
  }));

});
