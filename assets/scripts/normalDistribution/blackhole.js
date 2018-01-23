const p5 = require('p5');
const d3 = require('d3-random');

function setup() {
  createCanvas(windowWidth,windowHeight);
}

function draw() {
  const num = d3.randomNormal();
  const sd = 60;
  const xMean = windowWidth / 2;
  const yMean = windowHeight / 2;

  const x = sd * num() + xMean;
  const y = sd * num() + yMean;

  noStroke();
  fill(0, 10);
  ellipse(x, y, 15, 15);
}
