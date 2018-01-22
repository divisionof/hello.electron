const p5 = require('p5');

function setup() {
  createCanvas(screen.width, screen.height);
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill (255);
  }

  ellipse(mouseX, mouseY, 80, 80);
}
