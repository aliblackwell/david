'use strict';

describe('Hello World example', function() {

  beforeEach(module('david.decisions'));

  var controller, scope, deferredLogin, decisionStoreMock, stateMock;


  // instantiate the controller and mocks for every test
  beforeEach(inject(function($controller, $q, $rootScope) {
    deferredLogin = $q.defer();

    // mock decisionStore
    decisionStoreMock = {
        login: jasmine.createSpy('login spy')
                      .and.returnValue(deferredLogin.promise)
    };

    // mock $state
    stateMock = jasmine.createSpyObj('$state spy', ['go', 'current']);

    scope = $rootScope.$new();

    var user = function() {

    }

    var decisionImages = {
      "choice1": {
        "imgUrl": 'img/image1.jpg',
        "choiceName": 'choice1'
      },
      "choice2": {
        "imgUrl": 'img/image2.jpg',
        "choiceName": 'choice2'
      }
    }

    // instantiate LoginController
    controller = $controller('decisionsCtrl', {
                    '$scope': scope,
                    'User': user,
                    '$state': stateMock,
                    'DecisionImages': decisionImages,
                    'DecisionStore': decisionStoreMock
                     }
                 );
  }));

  it('says hello world!', function () {
    expect("Hello World!").toEqual("Hello World!");
  });


});