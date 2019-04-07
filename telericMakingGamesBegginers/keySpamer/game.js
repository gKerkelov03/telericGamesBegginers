const canvas = document.getElementById("canvas"),
    spriteSheet = document.getElementById("sprite"),
    flag = document.getElementById("flag"),
    byeImage = document.getElementById("byeImage"),
    ctx = canvas.getContext("2d");

document.body.style.margin = "0px";
spriteSheet.style.display = "none";
flag.style.display = "none";
byeImage.style.display = "none";
canvas.style.background = "chocolate";
canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 5;


let xToCut = 0,
    yToCut = 0,
    prevKey = false,
    shouldFix = false,
    isQuited = false,
    start = new Date(),
    end = {};
    linesToRun = (function(){
        let lines = +(prompt("How many lines do you want to run? (0 is invalid)"));
        
        while(lines === 0 || isNaN(lines)){
            lines = +(prompt("You entered invalid number please enter again"));
        }
        
        return lines + 1;
    }()),
    linesPassed = 0;

const sides = {
        spritesWidth : spriteSheet.width / 5,
        spritesHeight : spriteSheet.height / 2,
        playerSide : canvas.height / (linesToRun)   
    }, 
    player = {
        x : 15,
        y : sides.playerSide,
        speed : 10
    },
    spritesSizeToFix = 15 - (linesToRun - 5),
    getCoordinatesToCut = () => {    
        if(xToCut > sides.spritesWidth * 4){
            shouldFix = true;
            xToCut = 0
            yToCut += sides.spritesHeight;
    }

    if(yToCut > sides.spritesHeight){
        shouldFix = false;
        yToCut = 0;
    }

    return [xToCut, yToCut];
    },
    moveEverything = () => {
        player.x += sides.playerSide;
        xToCut += sides.spritesWidth;

        if(player.x + sides.playerSide >= canvas.width){
            linesPassed++;
            player.y += canvas.height / linesToRun;
            player.x = 15;
        }

        
        if(linesPassed === linesToRun - 1){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            endGame(); 
        }
    },
    drawEverything = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${linesToRun > 20 ? 30 - (linesToRun - 20) : 30}px Arial`;

        for(let i = 0, y = sides.playerSide; i < linesToRun; i ++, y += sides.playerSide){
            if(i !== 0){
                ctx.fillText(i + ".",0, y - 5);
            }

            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }   
    
        ctx.drawImage(flag, canvas.width / 2 - sides.playerSide / 2, 0, sides.playerSide, sides.playerSide);
        ctx.drawImage(spriteSheet, ...getCoordinatesToCut(), sides.spritesWidth, sides.spritesHeight, player.x, shouldFix ? player.y + spritesSizeToFix : player.y, sides.playerSide, sides.playerSide);                      
        console.log("in")
    },
    endGame = () => {
        end = new Date();
        let wantToPlayAgain = confirm(`You run that for ${end.getSeconds() - start.getSeconds()} seconds and ${Math.abs(end.getMilliseconds() - start.getMilliseconds())} milliseconds. Do you want to play again?`);
        if(wantToPlayAgain){
            linesPassed = 0;
            player.y = sides.playerSide;
            start = new Date();
        }
        else {
            isQuited = true;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(byeImage, canvas.width / 2 - byeImage.width / 2, 0);                        
        }   
    }

window.addEventListener("keydown", event => {
    if(event.keyCode === 79){
        prevKey = true;        
    }
});

window.addEventListener("keyup", event => {
    if(!isQuited){
        if(event.keyCode === 80 && prevKey){        
            prevKey = false;
            moveEverything();
            if(!isQuited){
                drawEverything();
            }
        }
    }
});

window.onload = () =>  drawEverything();
