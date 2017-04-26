var   s,
      food,
      spd = 0.25;
      width = window.innerWidth,
      height = window.innerHeight,
      scl = 40;
      nose = 'right';

// function setScale() {
//    if (width > height) {
//       scl = (width / 40);
//    } else {
//       scl = (height / 40);
//    }
// }
// setScale();
// setup();

//canvas setup
function setup() {
   createCanvas(window.innerWidth, window.innerHeight);
   s = new Snake();
   frameRate(60);
   r = random(100, 180);
   g = random(100, 180);
   b = random(100, 180);
   pickLocation();
}

//canvas setup
function pickLocation() {
   r = random(100, 180);
   g = random(100, 180);
   b = random(100, 180);
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

   stroke(0, 0, 0);
   ellipse(food.x+(scl/2), food.y+(scl/2), scl, scl);
   ellipse(0, 0, 0);
}

function keyPressed() {
   if ((keyCode === DOWN_ARROW) || (keyCode === 83)) {
      if (nose != 'up') {
         s.dir(spd, 0);
         nose = 'down';
      };
   };
   if (((keyCode === UP_ARROW) || (keyCode === 87)) && (nose != 'down'))  {
      s.dir(0, -spd);
      nose = 'up';
   } else if (((keyCode === DOWN_ARROW) || (keyCode === 83)) && (nose != 'up')) {
      s.dir(0, spd);
      nose = 'down';
   } else if (((keyCode === RIGHT_ARROW) || (keyCode === 68)) && (nose != 'left')) {
      s.dir(spd, 0);
      nose = 'right';
   } else if (((keyCode === LEFT_ARROW) || (keyCode === 65)) && (nose != 'right')) {
      s.dir(-spd, 0);
      nose = 'left';
   }
}
