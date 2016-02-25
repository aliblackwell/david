'use strict';
angular.module('david.davidtolife')
  .factory('SwipeImages', function() {
    var images = [
        '/img/davidtolife/DT1.JPG',
        // '/img/davidtolife/DT2.JPG',
        // '/img/davidtolife/DT3.JPG',
        // '/img/davidtolife/DT4.JPG',
        // '/img/davidtolife/DT5.JPG',
        // '/img/davidtolife/DT6.JPG',
        // '/img/davidtolife/DT7.JPG',
        // '/img/davidtolife/DT8.JPG',
        // '/img/davidtolife/DT9.JPG',
        // '/img/davidtolife/DT10.JPG',
        // '/img/davidtolife/DT11.JPG',
        // '/img/davidtolife/DT12.JPG',
        // '/img/davidtolife/DT13.JPG',
        // '/img/davidtolife/DT14.JPG',
        '/img/davidtolife/DT15.JPG'
      ]
    return images;
  })

  .factory("DavidToLifeResults", ['$firebaseObject','FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
    var DavidToLifeResults = function(uid) {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/davidtolife/' + uid);
      return $firebaseObject(itemsRef);
    }
    return DavidToLifeResults;
  }])

  .factory("FinishedSwipesScenes", ['$firebaseObject', 'FirebaseShowURL', function($firebaseObject, FirebaseShowURL) {
    var FinishedSwipesScenes = function(uid) {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/finishedswipes/' + uid);
      return $firebaseObject(itemsRef);
    }
    return FinishedSwipesScenes;
  }])


