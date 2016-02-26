var ripplyScott = (function() {

  var tl = ''

  function rippleAnimation(event, timing, ripple) {

    tl           = new TimelineMax();
    var  x            = event.offsetX,
        y            = event.offsetY,
        w            = event.target.offsetWidth,
        h            = event.target.offsetHeight,
        offsetX      = Math.abs( (w / 2) - x ),
        offsetY      = Math.abs( (h / 2) - y ),
        deltaX       = (w / 2) + offsetX,
        deltaY       = (h / 2) + offsetY,
        scale_ratio  = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

    tl.fromTo(ripple, timing, {
      x: x,
      y: y,
      transformOrigin: '50% 50%',
      scale: 0,
      opacity: 1,
      ease: Linear.easeOut
    },{
      scale: scale_ratio,
      opacity: 0
    });
    return tl;
  }

  return {

    tl: '',
    init: function(target, timing) {
      var button = document.getElementById(target);
      var circle = document.getElementById('js-ripple'),
          ripple = document.querySelectorAll('.js-ripple');

      button.addEventListener('click', function(event) {
        rippleAnimation.call(this, event, timing, ripple);
      });
    },
    destroy: function() {
      tl = false;
      console.log(tl)
    }
  };
})();