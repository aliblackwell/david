angular.module('david.show.services', [])


  .factory("Connection", function($firebaseObject, FIREBASE_URL, FirebaseShowURL) {
    var Connection = function(user) {

      var f = new FirebaseShowURL();

      // since I can connect from multiple devices or browser tabs, we store each connection instance separately
      // any time that connectionsRef's value is null (i.e. has no children) I am offline
      var myConnectionsRef = new Firebase(f.url+'/users/'+user.$id+'/connections');

      // stores the timestamp of my last disconnect (the last time I was seen online)
      var lastOnlineRef = new Firebase(f.url+'/users/'+user.$id+'/lastonline');

      var connectedRef = new Firebase(FIREBASE_URL+'/.info/connected');
      connectedRef.on('value', function(snap) {
        if (snap.val() === true) {
          // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)

          // add this device to my connections list
          // this value could contain info about the device or a timestamp too
          var con = myConnectionsRef.push(true);

          // when I disconnect, remove this device
          con.onDisconnect().remove();

          // when I disconnect, update the last time I was seen online
          lastOnlineRef.onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
        }
      });
    }
    return Connection;
  })

  .factory("User", function($firebaseObject, FIREBASE_URL) {
    var User = function() {
      var showId, uuid,
          itemsRef, fbUrl;
      // Get/Set UUID
      if (localStorage.getItem('uuid')) {
        uuid = localStorage.getItem('uuid');
      } else {
        uuid = guid();
        localStorage.setItem('uuid', uuid);
      }
      fbUrl = FIREBASE_URL + 'users/'+uuid;
      itemsRef = new Firebase(fbUrl);
      return $firebaseObject(itemsRef);
    }
    return User;
  })

  .factory("Items", function($firebaseArray, FirebaseShowURL) {
    var url = new FirebaseShowURL();
    var itemsRef = new Firebase(url + '/items');
    return $firebaseArray(itemsRef);
  })

  .factory("Settings", function($firebaseObject, FirebaseShowURL) {
    var Settings = function() {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/settings');
      return $firebaseObject(itemsRef);
    }
    return Settings;
  })

  .factory("ScanningWords", function($firebaseObject, FirebaseShowURL) {
    var url = new FirebaseShowURL();
    var itemsRef = new Firebase(url + '/scanningwords');
    return $firebaseObject(itemsRef);
  })

  .factory("LifeSwipes", function($firebaseArray, FirebaseShowURL) {
    var LifeSwipes = function(user) {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/lifeswipes/' + user.$id);
      return $firebaseArray(itemsRef);
    }
    return LifeSwipes;
  })

  .factory("FinishedSwipes", function($firebaseArray, FirebaseShowURL) {
    var FinishedSwipes = function() {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/finishedswipes');
      return $firebaseArray(itemsRef);
    }
    return FinishedSwipes;
  })

  .factory("HipsResponses", function($firebaseObject, FirebaseShowURL) {
    var HipsResponses = function(user, voteIteration) {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/hips/responses/' + voteIteration + '/' + user.$id);
      return $firebaseObject(itemsRef);
    }
    return HipsResponses;
  })

  .factory("Hips", function($firebaseObject, FirebaseShowURL) {
    var Hips = function() {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/hips');
      return $firebaseObject(itemsRef);
    }
    return Hips;
  })

  .factory("HipsResults", function($firebaseObject, FirebaseShowURL) {
    var HipsResults = function() {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/hips/results');
      return $firebaseObject(itemsRef);
    }
    return HipsResults;
  })

  .factory("HipsTimer", function($firebaseObject, FirebaseShowURL) {
    var HipsTimer = function() {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/hips/timer/');
      return $firebaseObject(itemsRef);
    }
    return HipsTimer;
  })

  .factory("DecisionImages", function() {
    var DecisionImages = function(section) {
      console.log(section)
      var imgUrl1, choiceName1,
          imgUrl2, choiceName2,
          imageCollection;

      switch (section) {
        case 'skiporhips':
          imgUrl1 = '/img/feet_1.jpg';
          choiceName1 = 'skip';
          imgUrl2 = '/img/butt_1.jpg';
          choiceName2 = 'hips';
          break;
        case 'skipormundane':
          imgUrl1 = '/img/feet_2.jpg';
          choiceName1 = 'skip';
          imgUrl2 = '/img/crotch_2.jpg';
          choiceName2 = 'mundane';
          break;
        default:
          return false;
      }

      console.log(imgUrl1)

      imageCollection = {
        "choice1": {
          "imgUrl": imgUrl1,
          "choiceName": choiceName1
        },
        "choice2": {
          "imgUrl": imgUrl2,
          "choiceName": choiceName2
        }
      }
      return imageCollection;
    }
    return DecisionImages;
  })

  .factory("DecisionStore", function($firebaseObject, FirebaseShowURL) {
    var DecisionStore = function(currentSection) {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/' + currentSection + '/responses/');
      return $firebaseObject(itemsRef);
    }
    return DecisionStore;
  })

  .factory("SkippingStore", function($firebaseObject, FirebaseShowURL) {
    var SkippingStore = function(currentSection) {
      var f = new FirebaseShowURL();
      var itemsRef = new Firebase(f.url + '/skipping/');
      return $firebaseObject(itemsRef);
    }
    return SkippingStore;
  })


