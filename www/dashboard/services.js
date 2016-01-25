angular.module('dashboard.services', [])



  .factory("Sections", function() {
    var Sections = function() {
      var s = {
        'welcome': {
          'key': 'welcome',
          'title': 'Welcome',
          'active': false
        },
        'davidtolife': {
          'key': 'davidtolife',
          'title': 'David to Life',
          'active': false
        },
        'hips': {
          'key': 'hips',
          'title': 'Hips',
          'active': false
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
  });


