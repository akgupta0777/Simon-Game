var buttonColors = ["red","green","blue","yellow"];
var gameList = [];
var userList = [];
var gameStarted = false;
var level = 0;

$(document).click(function(e) {
  if(!gameStarted){
    $("#level-title").text("level "+level);
    nextPattern();
    gameStarted = true;
  }
})

// $("#container").click(function(e){
//   alert("Don't click on buttons");
// })

$(".btn").click(function(){
  var userClickedColor = $(this).attr("id");
  userList.push(userClickedColor);
  playSound(userClickedColor);
  animatePress(userClickedColor);
  checkAnswer(userList.length-1);

})

function nextPattern(){
  userList = [];
  level++;
  $("#level-title").text("level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomColor = buttonColors[randomNumber];
  gameList.push(randomColor);
  $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

function checkAnswer(checkIndex){
  if(userList[checkIndex] === gameList[checkIndex]){
    if(userList.length === gameList.length){

      setTimeout(function () {
        nextPattern();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game over, Press any key to restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function playSound(sound){
  var audio = new Audio("sounds/"+sound+".mp3");
  audio.play();
}

function animatePress(color){
  $("#"+color).addClass("pressed");
  setTimeout(function () {
    $("#"+color).removeClass("pressed");
  }, 100);
}

function startOver(){
  gameStarted = false;
  gameList = [];
  userList = [];
  level = 0;
}
