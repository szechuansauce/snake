var s;
var scl = 20;

var food;

function setup() {
   createCanvas(600, 600);
   s = new Snake();
   frameRate(10);
   r = random(150, 255);
   g = random(150, 255);
   b = random(150, 255);
   pickLocation();
}

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
      s.dir(0, -1);
   } else if (keyCode === DOWN_ARROW) {
      s.dir(0, 1);
   } else if (keyCode === RIGHT_ARROW) {
      s.dir(1, 0);
   } else if (keyCode === LEFT_ARROW) {
      s.dir(-1, 0);
   }
}
