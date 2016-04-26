"use strict";

var Sphero = require("Sphero"),
    sphero = Sphero(process.env.PORT);

sphero.connect(function() {

  // Roll  in a random direction
  setInterval(function() {
    var direction = Math.floor(Math.random() * 360);
    sphero.roll(150, direction);
  }, 1000);
  
});
