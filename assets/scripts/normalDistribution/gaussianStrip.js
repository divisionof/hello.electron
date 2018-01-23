const p5 = require('p5');
const d3 = require('d3-random');

function setup() {
  createCanvas(windowWidth,windowHeight);
}

function draw() {
  const num = d3.randomNormal();
  const sd = 60;
  const mean = windowWidth / 2;

  const x = sd * num() + mean;

  noStroke();
  fill(0, 10);
  ellipse(x, windowHeight/2, 15, 15);
}
