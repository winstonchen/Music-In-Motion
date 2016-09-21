/*
  MiM.js

  interprets leap motion coordinates to turntable functions

*/

(function(){
  // Setup Leap loop with frame callback function
  var controllerOptions = {
    enableGestures: true
  };
  //
  Leap.loop(controllerOptions, function(frame) {
    var palmPosition = document.getElementById("palmPosition");
    var x = "", y = "", z = ""; // left hand x,y,z coords
    var rX = "", rY = "", rZ = ""; // right hand x,y,z coords
    //grab the data from the Leap Motion 
    if (frame.hands.length > 0) {
      for (var i = 0; i < frame.hands.length; i++) {
        var hand = frame.hands[i];
        if(hand.type == "left"){
          x = parseInt(hand.palmPosition[0]);
          y = parseInt(hand.palmPosition[1]);
          z = parseInt(hand.palmPosition[2]);
        }
        if(hand.type == "right"){
          rX = parseInt(hand.palmPosition[0]);
          rY = parseInt(hand.palmPosition[1]);
          rZ = parseInt(hand.palmPosition[2]);
        }
      }
    }
    // x coordinates determine if audio should be muted or not
    var audio = document.getElementById("audio");
    if (x < -150){
      audio.muted = true;
    } else {
      audio.muted = false;
    }
    turnTable(audio, z, "#donut"); 
    var audioTwo = document.getElementById("audioTwo");
    if (rX > 150){
      audioTwo.muted = true;
    } else {
      audioTwo.muted = false;
    }
    turnTable(audioTwo, rZ, "#pokeball");
  });
  var rewind = document.getElementById("rewind");

  /*
    control rotation of images and modify speed of song
    @param: audio - html element controlling audio
    @param: id - image's tag name
    @param: zAxis - left hand or right hand z position
  */
  function turnTable(audio, id, zAxis){
    // rotates the images based on the current z coordinate
    if(zAxis < 0){ // rotate clockwise
        $(id).show();
        //continuously rotate the images - added programatically, so it can be controlled in js
        $(id).css({MozTransform: 'rotate(-' + zAxis + 'deg)', WebkitTransform: 'rotate(' + zAxis + 'deg)', transform: 'rotate(' + zAxis + 'deg)'
      });
      audio.currentTime -= 0.1;//(z/200.0);
      rewind.play();
      rewind.currentTime = 0;  
    } else if(zAxis > 0){ // rotate counter clockwise
        $(id).show();
        //continuously rotate the images - added programatically, so it can be controlled in js
        $(id).css({MozTransform: 'rotate(' + zAxis + 'deg)', WebkitTransform: 'rotate(' + zAxis + 'deg)', transform: 'rotate(' + zAxis + 'deg)'
      });
      audio.currentTime += 0.1;//(z/200.0); 
    } else { //still image
      $(id).hide();
    }
  }
})();