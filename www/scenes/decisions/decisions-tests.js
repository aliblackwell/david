describe('david/skipormundane', function() {

  var state, scope, user;

  beforeEach(module('david.decisions'))

  beforeEach(inject(function ($state) {
    state = $state.get('skipormundane');
  }));

  // instantiate the controller and mocks for every test
  beforeEach(inject(function($controller, $q, $rootScope) {
    deferredLogin = $q.defer();

    // mock decisionStore
    decisionStoreMock = function(section, user){
        this.$loaded = function() {
          return true;
        }
        return this
    };

    scope = $rootScope.$new();

    user = {

    }

    var decisionImages = function(section) {
      return {
        "choice1": {
          "imgUrl": 'img/image1.jpg',
          "choiceName": 'choice1'
        },
        "choice2": {
          "imgUrl": 'img/image2.jpg',
          "choiceName": 'choice2'
        }
      }
    }

    // instantiate LoginController
    controller = $controller('decisionsCtrl', {
        '$scope': scope,
        'user': user,
        'DecisionStore': decisionStoreMock,
        'DecisionImages': decisionImages
      }
    );
  }));


  it('loads the correct template', function () {
    expect(state.views.mainview.templateUrl).toEqual('scenes/decisions/decisions.html');
  });

  it('says hello world!', function () {
    expect("Hello World!").toEqual("Hello World!");
  });

});
