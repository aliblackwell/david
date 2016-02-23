'use strict';

describe('results.welcome', function() {
  var scope, controller, WaltzGroups, firebaseMock, $firebaseObject;

  // Load the module
  beforeEach(function () {
    module('results.welcome');
  });

  window.MockFirebase.override();


  beforeEach(inject(function($rootScope, $controller, $firebaseObject) {
    scope = $rootScope.$new();
    controller = $controller('welcomeCtrl', {
      $scope: scope
    });
  }));

  it('should have the controller', inject(function() {
    expect(controller).toBeDefined();
  }));

  it('should say hello world', inject(function () {
    expect(scope.d.greeting).toEqual('Hello, World!');
  }));

});
