var buttonColors = ["red", "blue", "green", "yellow"]
var buttonAudio = {"red": "sounds/red.mp3", "blue": "sounds/blue.mp3", "green": "sounds/green.mp3", "yellow": "sounds/yellow.mp3"}
var gamePattern = []
var userClickedPattern = []
level = 0
started = false

function playSound(key) {
    var audio = new Audio(buttonAudio[key])
    audio.play()
}

function failSound(){
    var audio = new Audio("sounds/wrong.mp3")
    audio.play()

    //Adding Red background when failed.
    $("body").addClass("failScreen")
    setTimeout(function() {
        $("body").removeClass("failScreen")
    }, 200);
}

function nextSequence() {
    level++
    $("h1").text("Level " + level.toString())

    randomNumber = Math.floor(4*(Math.random()));
    randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("." + randomChosenColour).fadeOut(100).fadeIn(100);
};

function gameLogic() {
    if (userClickedPattern.length < gamePattern.length) {
        if (userClickedPattern[userClickedPattern.length - 1] !== gamePattern[userClickedPattern.length - 1]) {
            $("h1").text("Game Over, Press Any Key to Restart")
            failSound()
            userClickedPattern = []
            gamePattern = []
            level = 0
            started = false
        }
    }

    else if (userClickedPattern.length === gamePattern.length) {
        if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[gamePattern.length - 1]) {
            setTimeout(nextSequence, 800)
            userClickedPattern = []
        }

        else {
            $("h1").text("Game Over, Press Any Key to Restart")
            failSound()
            userClickedPattern = []
            gamePattern = []
            level = 0
            started = false
        }
    }
}

// Starting the game by pressing any key
$(document).on("keypress", function(){
    if (!started) {
        setTimeout(nextSequence, 800)
        started = true
    }
})

// Logic after a color/button is pressed
$(".btn").on("click", function() {

    //Adding opacity to the button when pressed
    $(this).addClass("pressButton");
    setTimeout(() => {
        $(this).removeClass("pressButton");
    }, 200);

    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    gameLogic();
})

/*
for (const i of buttonColors){
    $("." + i).on("click", function(){
        var userChosenColour = i
        playSound(i)
        userClickedPattern.push(userChosenColour)
    })
}
    */

/*
var level = 1
while ((userClickedPattern.length === gamePattern.length) && (userClickedPattern.length > 0)){
    if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[gamePattern.length - 1]){
        level += 1
        $("h1").text("Level " + level.toString())

        setTimeout(nextSequence, 200)
    }

    else{
        $("h1").text("Game Over, Press Any Key to Restart")
        failSound()
        userClickedPattern = []
        gamePattern = []
        break
    }
}
*/