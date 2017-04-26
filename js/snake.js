//TODO
//embed font awesome
//replace highscore, score, lives, message with FA icons
//set highscore properly
//push

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = spd;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  this.lives = 1;
  highscore = 0;
  message = 'go snek!';
  score = 0;


  $('#score').html('<i class="fa fa-circle" aria-hidden="true"></i>' + score);
  $('#highscore').html('<i class="fa fa-trophy" aria-hidden="true"></i>' + highscore);



   function sendMessage(state) {
      parent = $('#message');
      function run() {
         parent.append("<p>" + message + "</p>");
         function animate() {
            $('p').addClass('raise');
         }
         setTimeout(animate, 1);
      }
      if (state === 'dead') {
         message = 'you died!';
         run();
      } else if (state === 'eat') {
         var eatChance;
         setEatChance = function(min, max) {
            eatChance = Math.random();
         }
         setEatChance();
         if (eatChance < 0.25) {
            message = 'ssss';
         } else if (eatChance > 0.25 && eatChance < 0.5) {
            message = 'snek snek';
         } else if (eatChance > 0.5 && eatChance < 0.75) {
            message = 'yesss';
         } else {
            message = 'tasssty';
         }
         run();
      } else if (state === 'restart') {
         message = 'go snek!';
         run();
      } else if (state === 'lostLife') {
         message = 'we lost a snek...';
         run();
      }
   };

   function updateHighscore() {
      console.log(highscore);
      if (score > highscore) {
         highscore = score;
         $('#highscore').html('<i class="fa fa-trophy" aria-hidden="true"></i>' + highscore);
      };
   };

   this.drawLives = function() {
      this.livesHolder = this.lives;
      $('#lives').html('<i class="fa fa-heart" aria-hidden="true"></i>' + this.lives);
      // for(this.livesHolder; this.livesHolder > 0; this.livesHolder--){
      //    $('#lives').append('+');
      // };
   }
   this.drawLives();

   this.addLife = function() {
      console.log('lives:' + this.lives + ' ' + 'score' + this.total);
      if (this.total % 50 == 0) {
         this.lives++;
         this.drawLives();
         return true;
      } else {
         return false;
      }
   };

   this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < scl) {
      this.total++;
      score++;
      this.addLife();
      $('#score').html('<i class="fa fa-circle" aria-hidden="true"></i>' + score);
      spd = spd + 0.003;
      sendMessage('eat');
      updateHighscore();
      return true;
      } else {
      return false;
      }
   }

   this.dir = function(x, y) {
      this.xspeed = x;
      this.yspeed = y;
   }

  this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {

         if (this.lives > 1) {
            sendMessage('dead');
            this.total = 0;
            this.tail = [];
            s.dir(spd, 0);
            this.x = scl*4;
            this.y = scl*4;
            this.lives = (this.lives - 1);
            this.drawLives();
            pickLocation();
         } else {
            sendMessage('dead');
            updateHighscore();
            this.total = 0;
            this.tail = [];
            s.dir(spd, 0);
            this.x = scl*4;
            this.y = scl*4;
            this.drawLives();
            spd = 0.25;
            score = 0;
            pickLocation();
         }
        $(function() {
            $('#score').html('<i class="fa fa-circle" aria-hidden="true"></i>' + score);
        });
      }
    }
  }

  this.update = function() {
    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }

  this.show = function() {
    fill(0, 0, 0);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);

  }
}
