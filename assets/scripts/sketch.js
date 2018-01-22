const p5 = require('p5');

function setup() {
  createCanvas(screen.width, screen.height);
}

function draw() {
}

function touchMoved() {
  ellipse(mouseX, mouseY, 10, 10);
  // prevent default
  return false;
}
