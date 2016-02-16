'use strict';

angular.module('david.scanning')

  .factory("ScanningWords", function($firebaseObject, FirebaseShowURL) {
      var url = new FirebaseShowURL();
      var itemsRef = new Firebase(url + '/scanningwords');
      return $firebaseObject(itemsRef);
    })
