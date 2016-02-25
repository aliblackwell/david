'use strict';

angular.module('david.decisions')
  .factory('DecisionImages', function() {
      var DecisionImages = function(section) {
        var imgUrl1, choiceName1,
            imgUrl2, choiceName2,
            imageCollection;

        switch (section) {
          case 'skiporhips':
            imgUrl1 = '/img/decisions/feet_1.jpg';
            choiceName1 = 'skip';
            imgUrl2 = '/img/decisions/butt_1.jpg';
            choiceName2 = 'hips';
            break;
          case 'skipormundane':
            imgUrl1 = '/img/decisions/feet_2.jpg';
            choiceName1 = 'skip';
            imgUrl2 = '/img/decisions/crotch_2.jpg';
            choiceName2 = 'mundane';
            break;
          case 'puppiesorkittens':
            imgUrl1 = '/img/decisions/cat.jpg';
            choiceName1 = 'kittens';
            imgUrl2 = '/img/decisions/dog.jpg';
            choiceName2 = 'puppies';
            break;
          default:
            return false;
        }

        imageCollection = {
          'choice1': {
            'imgUrl': imgUrl1,
            'choiceName': choiceName1
          },
          'choice2': {
            'imgUrl': imgUrl2,
            'choiceName': choiceName2
          }
        }
        return imageCollection;
      }
      return DecisionImages;
    })

    .factory('DecisionStoreUser', ['$firebaseObject', 'FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
      var DecisionStoreUser = function(currentSection, uid) {
        var f = new FirebaseShowURL();
        var itemsRef = new Firebase(f.url + '/decisions/' + currentSection + '/responses/' + uid);
        return $firebaseObject(itemsRef);
      }
      return DecisionStoreUser;
    }])

    .factory('Decisions', ['$firebaseObject', 'FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
      var Decisions = function(currentSection) {
        var f = new FirebaseShowURL();
        var itemsRef = new Firebase(f.url + '/decisions/' + currentSection);
        return $firebaseObject(itemsRef);
      }
      return Decisions;
    }])

    .factory('DecisionsTimer', ['$firebaseObject', 'FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
      var DecisionsTimer = function(currentSection) {
        var f = new FirebaseShowURL();
        var itemsRef = new Firebase(f.url + '/decisionstimers/' + currentSection);
        return $firebaseObject(itemsRef);
      }
      return DecisionsTimer;
    }])

    // .factory('DecisionTimer', ['$firebaseObject', 'FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
    //   var DecisionTimer = function(currentSection) {
    //     var f = new FirebaseShowURL();
    //     var itemsRef = new Firebase(f.url + '/decisions/' + currentSection + '/timer/');
    //     return $firebaseObject(itemsRef);
    //   }
    //   return DecisionTimer;
    // }])
