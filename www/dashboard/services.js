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
          'actionWord': 'Launch Modal',
          'controls': true
        },
        'skiporhips': {
          'key': 'skiporhips',
          'title': 'Skip or Hips?',
          'actionWord': 'Start Countdown',
          'active': false,
          'controls': true
        },
        'skipormundane': {
          'key': 'skipormundane',
          'title': 'Skip or Mundane?',
          'actionWord': 'Start Countdown',
          'active': false,
          'controls': true
        },
        'skipping': {
          'key': 'skipping',
          'title': 'Skipping',
          'active': false
        },
        'intimacy': {
          'key': 'intimacy',
          'title': 'Intimacy',
          'active': false
        },
        'intimacy-blank': {
          'key': 'intimacy-blank',
          'title': 'Intimacy Blank',
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
  })

  .factory("Hips", function($firebaseObject, FIREBASE_URL){
    var Hips = function(show_slug) {
      var itemsRef = new Firebase(FIREBASE_URL + '/' + show_slug + '/hips');
      return $firebaseObject(itemsRef);
    }
    return Hips;
  })


