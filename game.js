
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

$(document).ready(function() {
    $(".btn").click(function() {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    });

    if(isMobileDevice()) {
        toMobile();
        $(".startGame").click(function() {
            if(start === false) {
            nextSequence();
            $("#level-title").html("Level " + level);
        }
        start = true;
        });
    }
    else {
        $(document).keypress(function() {
            if(start === false) {
            nextSequence();
            $("#level-title").html("Level " + level);
        }
        start = true;
        });
    }
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").html("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
     audio.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass('pressed');
    }, 100);
}

function checkAnswer(checkAnswer) {
    if(gamePattern[checkAnswer] ===  userClickedPattern[checkAnswer]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }
    else { 
           if(isMobileDevice()){
             toWrong("Press on the Button to Restart");
           }
           else {
             toWrong("Press Any Key to Restart");
           }
        }
}

function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
}

function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|iphone|ipad|ipod|blackberry|windows phone|mobi/i.test(userAgent);
}

function toMobile() {
    $("#level-title").html("Click on the Button to Start the Game");
    $(".startGame").css("display","inline-block");
}

function toWrong(string) {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
    $("body").removeClass("game-over");
    },200);
    $("#level-title").html("Game Over, " + string);
    startOver();
}
