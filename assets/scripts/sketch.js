const p5 = require('p5');

let flock;

function setup() {
  createCanvas(screen.width, screen.height);

  flock = new Flock();
}

function draw() {
  background(255);
  flock.run();
}

function touchMoved() {
  flock.addDot(new Dot(mouseX, mouseY));

  // prevent default
  return false;
}

function Flock() {
  this.dots = [];
}

Flock.prototype.run = function() {
  const dots = this.dots;

  this.dots.forEach(function(dot){
    dot.run(dots);
  });
}

Flock.prototype.addDot = function(d) {
  this.dots.push(d);
}

function Dot(x, y) {
  this.acceleration = createVector(0,0);
  this.velocity = createVector(random(-1,1), random(1, 1));
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxSpeed = 3;
  this.maxForce = 0.05;
}

Dot.prototype.run = function(dots) {
  this.flock(dots);
  this.update();
  this.borders();
  this.render();
}

Dot.prototype.applyForce = function(force) {
  this.acceleration.add(force);
}

Dot.prototype.flock = function(dots) {
  const sep = this.separate(dots);
  const ali = this.align(dots);
  const coh = this.cohesion(dots);

  sep.mult(1.5);
  ali.mult(1.0);
  coh.mult(1.0);

  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

Dot.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.velocity.limit(this.maxSpeed);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
}

Dot.prototype.seek = function(target) {
  const desired = p5.Vector.sub(target, this.position);

  desired.normalize();
  desired.mult(this.maxSpeed);

  var steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxForce);

  return steer
}

Dot.prototype.render = function() {
  ellipse(this.position.x, this.position.y, 10, 10);
}

Dot.prototype.borders = function() {
  if (this.position.x < -this.r)  this.position.x = width +this.r;
  if (this.position.y < -this.r)  this.position.y = height+this.r;
  if (this.position.x > width +this.r) this.position.x = -this.r;
  if (this.position.y > height+this.r) this.position.y = -this.r;
}

Dot.prototype.separate = function(dots) {
  var desiredseparation = 25.0;
  var steer = createVector(0,0);
  var count = 0;

  for (var i = 0; i < dots.length; i++) {
    var d = p5.Vector.dist(this.position,dots[i].position);

    if ((d > 0) && (d < desiredseparation)) {

      var diff = p5.Vector.sub(this.position,dots[i].position);
      diff.normalize();
      diff.div(d);
      steer.add(diff);
      count++;
    }
  }

  if (count > 0) {
    steer.div(count);
  }

  if (steer.mag() > 0) {
    steer.normalize();
    steer.mult(this.maxSpeed);
    steer.sub(this.velocity);
    steer.limit(this.maxForce);
  }
  return steer;
}

Dot.prototype.align = function(dots) {
  var neighbordist = 50;
  var sum = createVector(0,0);
  var count = 0;
  for (var i = 0; i < dots.length; i++) {
    var d = p5.Vector.dist(this.position,dots[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(dots[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxSpeed);
    var steer = p5.Vector.sub(sum,this.velocity);
    steer.limit(this.maxForce);
    return steer;
  } else {
    return createVector(0,0);
  }
}

Dot.prototype.cohesion = function(dots) {
  var neighbordist = 50;
  var sum = createVector(0,0);
  var count = 0;
  for (var i = 0; i < dots.length; i++) {
    var d = p5.Vector.dist(this.position,dots[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(dots[i].position);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);
  } else {
    return createVector(0,0);
  }
}
