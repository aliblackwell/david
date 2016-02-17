angular.module('dashboard.services', [])

  .factory('Sections', function() {
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
        'vicarioustrauma': {
          'key': 'vicarioustrauma',
          'title': 'Vicarious Trauma 1',
          'active': false,
          'controls': false
        },
        'skiporhips': {
          'key': 'skiporhips',
          'type': 'decision',
          'timerLength': 60,
          'title': 'Skip or Hips?',
          'actionWord': 'Start Countdown',
          'active': false,
          'controls': true
        },
        'hips': {
          'key': 'hips',
          'title': 'Hips',
          'type': 'option',
          'active': false,
          'actionWord': 'Launch Modal',
          'controls': true
        },
        'skipping': {
          'key': 'skipping',
          'type': 'option',
          'active': false,
          'controls': false,
          'title': 'Skipping'
        },
        'vicarioustrauma2': {
          'key': 'vicarioustrauma2',
          'title': 'Vicarious Trauma 2',
          'active': false,
          'controls': false
        },
        'intimacy': {
          'key': 'intimacy',
          'title': 'Intimacy',
          'active': false
        },
        'religioninatie': {
          'key': 'religioninatie',
          'title': 'Religion in a Tie',
          'active': false,
          'controls': false
        },
        'puppiesorkittens': {
          'key': 'puppiesorkittens',
          'title': 'Puppies or Kittens?',
          'active': false,
          'controls': true,
          'type': 'decision',
          'timerLength': 30
        },
        'puppies': {
          'key': 'puppies',
          'type': 'option',
          'active': false,
          'controls': false,
          'title': 'Puppies'
        },
        'kittens': {
          'key': 'kittens',
          'type': 'option',
          'active': false,
          'controls': false,
          'title': 'Kittens'
        },
        'skipormundane': {
          'key': 'skipormundane',
          'title': 'Skip or Mundane?',
          'actionWord': 'Start Countdown',
          'active': false,
          'type': 'decision',
          'controls': true,
          'timerLength': 20
        },
        'skipping2': {
          'key': 'skipping2',
          'title': 'Skipping',
          'type': 'option',
          'active': false
        },
        'mundane': {
          'key': 'mundane',
          'title': 'Mundane',
          'type': 'option',
          'active': false
        },
        'intimacy-blank': {
          'key': 'intimacy-blank',
          'title': 'Intimacy Blank',
          'active': false
        },
        'vicarioustrauma3': {
          'key': 'vicarioustrauma3',
          'title': 'Vicarious Trauma 3',
          'active': false,
          'controls': false
        },
        'waltz': {
          'key': 'waltz',
          'title': 'Waltz',
          'active': false,
          'controls': false
        },
        'blank': {
          'key': 'blank',
          'title': 'Blank',
          'active': false
        }

      }
      return s;
    }
    return Sections;
  })

  .factory('ActiveSection', ['$firebaseObject', 'FIREBASE_URL', function($firebaseObject, FIREBASE_URL){
    var ActiveSection = function(show_slug) {
      var itemsRef = new Firebase(FIREBASE_URL + '/' + show_slug + '/settings');
      return $firebaseObject(itemsRef);
    }
    return ActiveSection;
  }])

  .factory('Hips',['$firebaseObject', 'FIREBASE_URL', function($firebaseObject, FIREBASE_URL){
    var Hips = function(show_slug) {
      var itemsRef = new Firebase(FIREBASE_URL + '/' + show_slug + '/hips');
      return $firebaseObject(itemsRef);
    }
    return Hips;
  }])

  .factory('DecisionStore', ['$firebaseObject', 'FIREBASE_URL', function($firebaseObject, FIREBASE_URL){
    var ActiveSection = function(show_slug, decision_slug) {
      var itemsRef = new Firebase(FIREBASE_URL + '/' + show_slug + '/' + decision_slug);
      return $firebaseObject(itemsRef);
    }
    return ActiveSection;
  }])
