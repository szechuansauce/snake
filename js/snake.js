function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = spd;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  function updateMessage(state) {
      function run() {
        $('#message').addClass('hide');
        setTimeout(refresh, 200);
        function refresh() {
           $('#message').html(message).removeClass('hide');
        }
        function remove() {
           $('#message').html(message).removeClass('hide');
        }
      }
      if (state === 'dead') {
         message = 'you died!';
         run();
         setTimeout(deadUpdate, 650);
         function deadUpdate() {
            message = 'go snek!';
            run();
         }
      } else if (state === 'eat') {
         var eatChance;
         setEatChance = function(min, max) {
            eatChance = Math.random();
         }
         setEatChance();
         if (eatChance < 0.25) {
            message = 'SNEK';
         } else if (eatChance > 0.25 && eatChance < 0.5) {
            message = 'SNEEEEEEEK';
         } else if (eatChance > 0.5 && eatChance < 0.75) {
            message = 'SNEK KWEEN';
         } else {
            message = 'YASS';
         }
         run();
      } else if (state === 'restart') {
         message = 'go snek!';
         run();
      }
   };

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < scl) {
      this.total++;
      score++;
      $('#score').html(score);
      spd = spd + 0.006;
      updateMessage('eat');
      console.log(message);
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
        console.log('starting over');
        updateMessage('dead');
        this.total = 0;
        this.tail = [];
        this.x = scl*4;
        this.y = scl*4;
        spd = 0.5;
        score = 0;
        $(function() {
            $('#score').html(score);
        });
        pickLocation();
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
