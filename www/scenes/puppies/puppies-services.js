'use strict';

angular.module('david.puppies')

  .factory("PuppiesWords", ['$firebaseObject', 'FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
      var PuppiesWords = function() {
        var url = new FirebaseShowURL();
        var itemsRef = new Firebase(url.url + '/puppies/puppieswords');
        return $firebaseObject(itemsRef);
      }
      return PuppiesWords;
    }])

  // TODO
  .factory("PuppiesWordsAllResults", ['$firebaseObject', 'FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
      var url = new FirebaseShowURL();
      var itemsRef = new Firebase(url.url + '/puppies/individualtaps');
      return $firebaseObject(itemsRef);
    }])

  .factory('PuppiesUserStore', ['$firebaseObject', 'FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
    var PuppiesUserStore = function(currentSection, uid) {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/' + currentSection + '/responses/' + uid);
      return $firebaseObject(itemsRef);
    }
    return PuppiesUserStore;
  }])



