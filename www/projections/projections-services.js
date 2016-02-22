angular.module('projections.services', [])

  .factory('InteractiveSections', function() {
    var InteractiveSections = function() {
      var sections = {
        'davidtolife': {
          'key': 'davidtolife',
          'title': 'David to Life',
          'active': false,
          'controls': false
        },
        'hips': {
          'key': 'hips',
          'title': 'Hips',
          'type': 'option',
          'active': false,
          'actionWord': 'Launch Modal',
          'controls': true
        },
        'puppies': {
          'key': 'puppies',
          'title': 'Puppies',
          'type': 'option',
          'active': false,
          'actionWord': 'Launch Modal',
          'controls': true
        }

      }
      return sections;
    }
    return InteractiveSections;
  })










