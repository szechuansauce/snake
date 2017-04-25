var   s,
      scl = 20,
      food,
      spd = 0.5,
      score = 0,
      message = "Snek snek snek";

//meta control
$(function() {
    $('#score').html(score);
    $('#message').html(message);
});

//canvas setup
function setup() {
   createCanvas(scl*40, scl*40);
   s = new Snake();
   frameRate(30);
   r = random(150, 255);
   g = random(150, 255);
   b = random(150, 255);
   pickLocation();
}

//canvas setup
function pickLocation() {
   r = random(180, 240);
   g = random(180, 240);
   b = random(180, 240);
   fill(r, g, b);
   var cols = floor(width/scl);
   var rows = floor(height/scl);
   food = createVector(floor(random(cols)), floor(random(rows)));
   food.mult(scl);
}

function mousePressed() {
   s.total++;
}

function draw() {

   background(r, g, b);

   if (s.eat(food)) {
      pickLocation();
   }
   s.death();
   s.update();
   s.show();

   fill(r, g, b);
   ellipse(food.x+(scl/2), food.y+(scl/2), scl, scl);
}

function keyPressed() {
   if (keyCode === UP_ARROW) {
      s.dir(0, -spd);
   } else if (keyCode === DOWN_ARROW) {
      s.dir(0, spd);
   } else if (keyCode === RIGHT_ARROW) {
      s.dir(spd, 0);
   } else if (keyCode === LEFT_ARROW) {
      s.dir(-spd, 0);
   }
}
