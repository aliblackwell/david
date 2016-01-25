angular.module('dashboard.services', [])



  .factory("Sections", function() {
    var Sections = function() {
      var s = {
        'welcome': {
          'key': 'welcome',
          'title': 'Welcome',
          'active': false,
          'controls': false
        },
        'davidtolife': {
          'key': 'davidtolife',
          'title': 'David to Life',
          'active': false,
          'controls': false
        },
        'hips': {
          'key': 'hips',
          'title': 'Hips',
          'active': false,
          'controls': true
        }

      }
      return s;
    }
    return Sections;
  })

  .factory("ActiveSection", function($firebaseObject, FIREBASE_URL){
    var ActiveSection = function(show_slug) {
      var itemsRef = new Firebase(FIREBASE_URL + '/' + show_slug + '/settings');
      return $firebaseObject(itemsRef);
    }
    return ActiveSection;
  })

  .factory("Hips", function($firebaseObject, FIREBASE_URL){
    var Hips = function(show_slug) {
      var itemsRef = new Firebase(FIREBASE_URL + '/' + show_slug + '/hips');
      return $firebaseObject(itemsRef);
    }
    return Hips;
  })

  .factory("HipsArchive", function($firebaseArray, FIREBASE_URL){
    var HipsArchive = function(show_slug) {
      var itemsRef = new Firebase(FIREBASE_URL + '/' + show_slug + '/hips/archive');
      return $firebaseArray(itemsRef);
    }
    return HipsArchive;
  })


