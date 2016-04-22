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
    isCalibrating = false,
    colors = ["#1f6c7c", "#f4c51d", "#8ad0dd", "#f9e69d"];

// Let's roll
sphero.connect(function (){
  
  // Break when pushing the left trigger
  controller.on('lefttrigger', function(position){
    if(Math.abs(position) > 0) {
      speed = 0;
      isBreaking = true;
    } else {
      isBreaking = false;
    }
  });

  // Use analog trigger to set the speed.
  // Speed values go from 0 to 255 on both, controller and Sphero.
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
  
  // Give the sphero a nice color
  controller.on('a:release', function (key) {
    var color = Math.floor(Math.random() * (colors.length - 0));
    sphero.color(color);
  });
  
  // Finally roll the Sphero every 200ms
  setInterval(function() { 
    sphero.roll(speed, direction); 
  }, 200);

});