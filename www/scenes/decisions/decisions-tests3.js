'use strict';


// load the module for our app
beforeEach(module('david'));

describe('decisionsCtrl', function() {

  var controller,
      deferredLogin,
      dinnerServiceMock,
      stateMock,
      ionicPopupMock,
      scope;



  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('decisionsCtrl', {
      $scope: scope
    });
  }));

  it('says hello world!', function () {
    expect(scope.greeting).toEqual("Hello world!");
  });





  describe('init', function() {
    it('should load the user', function() {
      expect(false).toBeTruthy()
    })

    it('should add an empty object to the scope', function() {
      expect(false).toBeTruthy()
    })
  })
});

