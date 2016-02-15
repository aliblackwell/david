'use strict';

angular.module('david.ritControllers', [])
  .controller('religioninatieCtrl', ['$scope', function ($scope){

    $scope.d = {}
    $scope.d.run = true;

    var ctx; //audio context
    var buf; //audio buffer
    var fft; //fft audio node
    var samples = 128;
    var setup = false; //indicate if audio is set up yet


    //init the sound system
    function init() {
        try {
            ctx = new AudioContext(); //is there a better API for this?
            setupCanvas();
            loadFile();
        } catch(e) {
            alert('you need webaudio support' + e);
        }
    }
    init();

    //load the mp3 file
    function loadFile() {
        var req = new XMLHttpRequest();
        req.open("GET","/audio/music.mp3",true);
        //we can't use jquery because we need the arraybuffer type
        req.responseType = "arraybuffer";
        req.onload = function() {
            //decode the loaded data
            ctx.decodeAudioData(req.response, function(buffer) {
                buf = buffer;
                play();
            });
        };
        req.send();
    }

    function play() {
        //create a source node from the buffer
        var src = ctx.createBufferSource();
        src.buffer = buf;
        //create fft
        fft = ctx.createAnalyser();
        fft.fftSize = samples;

        //connect them up into a chain
        src.connect(fft);

        // comment out below to disable sounds
        //fft.connect(ctx.destination);

        //play immediately
        src.start ? src.start(0) : src.noteOn(0);
        setup = true;
    }

    var gfx;
    function setupCanvas() {
        var canvas = document.getElementById('canvas');
        gfx = canvas.getContext('2d');
        requestAnimationFrame(update);
    }

    function update() {

        if($scope.d.run === true) {
            requestAnimationFrame(update);
            if(!setup) return;
            gfx.clearRect(0,0,800,600);
            gfx.fillStyle = 'gray';
            gfx.fillRect(0,0,800,600);

            var data = new Uint8Array(samples);
            fft.getByteFrequencyData(data);


            gfx.fillStyle = 'red';
            for(var i=0; i<data.length; i++) {
                gfx.fillRect(100+i*4,100+256-data[i]*2,3,100);
            }
        }

    }

    $scope.$on('$destroy', function() {
        $scope.d.run = false;
    })





  }])