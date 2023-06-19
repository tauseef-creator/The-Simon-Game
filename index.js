
var levelStarted = 0;
var h1Title = $("#level-title")
var levelNo = 1;
var countButtons = 0
var buttons = ["green", "blue", "yellow", "red"]

var buttonSeq = [];

$(document).keypress(function (e) {
    if(!levelStarted) {
        if(e.key === "a" || e.key === "A") {
            initializeGame();
        }    
    }
});


function initializeGame() {
    h1Title.text("Level "+ levelNo);
    buttonSeq.push(getRandomButton());
    levelStarted = 1;
    
}


function restartGame() {
    playSound("wrong");
    $("body").addClass("game-over");
      setTimeout(() => {
            $("body").removeClass("game-over");
      }, 100);
    levelStarted = 0;    
    countButtons = 0;
    h1Title.text("Game Over! Press A key to start");
    buttonSeq.splice(0, buttonSeq.length); // Empty the buttonSeq array
            for(var i=0; i< buttonSeq.length; i++) {
                console.log(buttonSeq[i])
            }
    levelNo = 1;
    
}

function upgradeLevel() {
    countButtons = 0;
    levelNo++;
    h1Title.text("Level "+ levelNo);
    var recentButton = getRandomButton();
    buttonSeq.push(recentButton);
}


$(".btn").on("click", function(event) {
    if(levelStarted) {
            var buttonType = event.target.id;
            if(buttonType === buttonSeq[countButtons]) {
               playSound(buttonType);
               showButtonAnimation(buttonType);
               countButtons++;
                    if(countButtons === buttonSeq.length) {
                        setTimeout(function () {
                            upgradeLevel();
                        }, 1000)
                    }
            } else {
                restartGame();
            }
        }
        
    })
    
function playSound(type) {
    var sound = new Audio("./sounds/"+ type + ".mp3")
    sound.play();
}


function showButtonAnimation(type) {
    $("#"+ type).addClass("pressed");
    
    setTimeout(function(){
        $("#"+ type).removeClass("pressed");
    }, 150)
}


function getRandomButton() {
    var number = Math.floor(Math.random() * 4)
    var buttonID = buttons[number];
    playSound(buttonID);
    showButtonAnimation(buttonID);
    return buttonID;
}