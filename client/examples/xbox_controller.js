"use strict";

// Require node modules
var XboxController = require('xbox-controller'),
    Sphero = require("Sphero");

// Setup objects
var controller = new XboxController(),
    sphero = Sphero("<PLEASE ADD>", { timeout: 100 });

// Setup internal variables
var speed = 0,
    direction = 0,
    isBreaking = false,
    isCalibrating = false;

// Let's roll
sphero.connect(function (){
  
  // Brake when pushing the left trigger
  controller.on('lefttrigger', function(position){
    if(Math.abs(position) > 0) {
      speed = 0;
      isBreaking = true;
    } else {
      isBreaking = false;
    }
  });

  // Use analog trigger to set the speed.
  controller.on('righttrigger', function(position){
    if(!isBreaking) {
      speed = Math.abs(position);
    }
  });
  
  // Left stick is used for setting the direction.
  controller.on("left:move", function(position){
    if(position.x == 0.0 && position.y == 0.0) {
      direction = 0;
    } else {
      direction = Math.atan2(position.y,position.x) * 360 / (Math.PI * 2) + 90;
      if(direction < 0) {
        direction = 360 + direction;
      }        
    }
  });
  
  // Enable collision detection
  sphero.detectCollisions();
  
  // Rumble for half a second on collision
  sphero.on("collision", function(data) {
    controller.rumble(Math.abs(data.speed), Math.abs(data.speed));
      setTimeout(function() {
        controller.rumble(0, 0);
      }, 500);
  });
    
  controller.on('x:release', function (key) {
    if(isCalibrating) {
      sphero.finishCalibration();
      isCalibrating = false;
    } else {
      isCalibrating = true;
      sphero.startCalibration();
    }
  });
  
  // Give the sphero a random color
  controller.on('a:release', function (key) {
    var color = '#'+('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6);
    sphero.color(color);
  });
  
  // Finally roll the Sphero every 200ms
  setInterval(function() { 
    sphero.roll(speed, direction); 
  }, 200);

});