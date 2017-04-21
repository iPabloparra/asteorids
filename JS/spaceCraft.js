document.onkeydown = function(e){
  //console.log(e.keyCode);
  var turnSpeed = Math.PI/16;
  if (e.keyCode === 39){
    turnDegrees(turnSpeed);
  } else if (e.keyCode === 37) {
    turnDegrees(-turnSpeed);
  } else if(e.keyCode == 90) {
    shooting();
  }
};

var currentRotation = 0;
var space = $(".box-space");
var currentPosition = {x:space.width()/2,y:space.height()/2};
var craft = $("#craft");
var asteroidPos, bulletPos, craftPos;
craft.css({'top': currentPosition.y-craft.height()/2,
'left': currentPosition.x-craft.width()/2});

function turnDegrees(rad) {
   currentRotation += rad;
  document.getElementById('craft').style.transform = "rotate(" + currentRotation + "rad)";
}


function calculatePos() {
  asteroids = $(".asteroid").toArray();
  asteroids2 = $(".asteroid2").toArray();
  asteroids3 = $(".asteroids3").toArray();
  allAsteroids = asteroids.concat(asteroids2);
  masAllAsteroids = allAsteroids.concat(asteroids3);

  masAllAsteroids.forEach(function(asteroid){
    asteroidPos = $("#"+asteroid.id).offset();
    craftPos    = $("#craft").offset();
    collide(asteroidPos, craftPos, asteroid);
    //  console.log("asteroid: ", asteroidPos);
    //  console.log("craft: ", craftPos);
    shootAsteroid(asteroidPos, asteroid);
  });
}

setInterval(function() {
  calculatePos();
}, 33);


function collide(asteroidPos, craftPos, asteroid) {
  // if (asteroidPos.top + 100 > craftPos.top && asteroidPos.left + 100 > craftPos.left
  //    ) {
  var topReference = craftPos.top - asteroidPos.top;
  var leftReference = craftPos.left - asteroidPos.left;
  if (topReference < 60 && topReference > 0 && leftReference < 60 && leftReference > 0){  gameOver();}
  //   gameOver();
  // }
}

function gameOver() {
  $("#craft").fadeOut("slow");
  clearInterval(x);
  console.log("GAME OVER");
}

var bulletSpeed = 0.6;
function shooting(){
  console.log("SHOOT!!!");
  var bullet = $('<div>').addClass("bullet"); //.css("transform","rotate("+currentRotation+"deg)");
  $("#bulletHolder").append(bullet);
  currentPosition = {x:space.width()/2, y:space.height()/2};
  var pos = {x:currentPosition.x,
             y:currentPosition.y};
  var radius = 0.1;
  var rotation = currentRotation-Math.PI/2;
  var bulletLife = 50;

  // Animate the bullets :)
  var intervalID = setInterval( function() {
    //var pos = bullet.positon();
    bullet.css({"top": pos.y,"left": pos.x});

    pos = {
      x: pos.x + Math.cos(rotation)*radius,
      y: pos.y + Math.sin(rotation)*radius
    };
    radius += bulletSpeed;
    bulletPos = $(".bullet").offset();

    // Clear bullets from DOM
    bulletLife--;
    if(bulletLife<0){
      bullet.remove();
      bulletPos = undefined;
      window.clearInterval(intervalID);
    }
  },5);
//  shootAsteroid();
}

function shootAsteroid(pos, e){
  if (bulletPos){
    if (pos.top < bulletPos.top && pos.left < bulletPos.left && pos.top+100 > bulletPos.top && pos.left+100 > bulletPos.left){
      $("#"+e.id).remove();
      $(".bullet").remove();
      console.log("IMPACT!!!!");
    }
  }
}

var i = 1;
// function generateAsteroid(){

// }

//funcion empezar a jugar
$(document).ready(function(){
  $(".btn-start").on("click",function(){
    var x = setInterval(function(){
        i++;
        randomLeft = Math.floor(Math.random()*500);
        randomLeftDown = Math.floor(Math.random()*500)+400;
        var asteroid = $('<div>').addClass("asteroid").attr("id", "asteroid"+i);
        i++;
        var asteroid2 = $('<div>').addClass("asteroid2").attr("id", "asteroid"+i);
        i++;
        var asteroid3 = $('<div>').addClass("asteroid3").attr("id", "asteroid"+i);
        $(".box-space").append(asteroid);
        $(".box-space").append(asteroid2);
        $(".box-space").append(asteroid3);


        $("#asteroid"+i).css({"top":0, "left":randomLeft});
        $("#asteroid"+i).css({"top":800, "left":randomLeftDown});
        //$("#asteroid"+i).css({"top":, "left":});

      },4000);
  });

});
