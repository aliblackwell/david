'use strict';


  beforeEach(module('david.decisions'));
  beforeEach(module('david.show.services'));


  var controller, scope, deferredLogin, decisionStoreMock, stateMock, user;


  // instantiate the controller and mocks for every test
  beforeEach(inject(function($controller, $q, $rootScope) {
    deferredLogin = $q.defer();

    // mock decisionStore
    decisionStoreMock = {
        login: jasmine.createSpy('login spy')
                      .and.returnValue(deferredLogin.promise)
    };

    // mock $state
    stateMock = jasmine.createSpyObj('$state spy', ['go', 'skiporhips']);

    scope = $rootScope.$new();

    user = {

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
        '$state': stateMock,
        'User': user,
        'DecisionStore': decisionStoreMock,
        'DecisionImages': decisionImages
      }
    );
  }));

  it('says hello world!', function () {
    expect("Hello World!").toEqual("Hello World!");
  });
