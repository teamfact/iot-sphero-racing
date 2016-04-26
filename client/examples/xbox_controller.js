"use strict";

var XboxController = require('../lib/xbox'),
    controller = new XboxController();

controller.on('a:press', function (key) {
  console.log('a press');
});

controller.on('b:release', function (key) {
  console.log('b release');
});

controller.on('righttrigger', function (position) {
  console.log('righttrigger', position);
});

controller.on('left:move', function (position) {
  console.log('left:move', position);
});