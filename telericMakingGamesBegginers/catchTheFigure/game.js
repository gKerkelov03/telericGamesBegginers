const canvas = document.getElementById("canvas"),
    refreshImage = document.getElementById("refresh"),
    ctx = canvas.getContext("2d");

document.body.style.margin = "0px";
canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 5;
canvas.style.background = "black";
refreshImage.style.display = "none";

const sizes = {
        width : 60,
        height : 140,
        radius : 50,
        sizeToCut : 1.7
    },
    figureCoordinates = {
        x : sizes.radius,
        y : sizes.radius
    },
    colors = {
        highRectangleColor : "yellow",
        wideRectangleColor : "blue",
        circleColor : "red"
    },
    speeds = {
        x : 1,
        y : 1,
        speedToAdd : 0.5
    },
    maxLevel = 26;
    
    let currentLevel = 1,
    [currentWidth, currentHeight] = currentLevel % 3 === 1 ? [sizes.width, sizes.height] : [sizes.height, sizes.width],
    isCircle = false,
    hasWon = false;

const getRandomNumber = (min, max) => (Math.random() * (max - min) + min) | 0 ,
    isPlayerClicked = (clickedX, clickedY) => {
        if(isCircle){
            return sizes.radius >= ((figureCoordinates.x - clickedX) ** 2 + (figureCoordinates.y - clickedY) ** 2) ** (1 / 2)
        }

        return clickedX >= figureCoordinates.x && clickedX <= figureCoordinates.x + currentWidth && clickedY >= figureCoordinates.y && clickedY <= figureCoordinates.y + currentHeight;
    },
    setUpForDrawing = () => {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 4;

        switch (currentLevel % 3) {
            case 1:
                ctx.fillStyle = colors.highRectangleColor;
                break;
            case 2: 
                ctx.fillStyle = colors.wideRectangleColor;
                break;       
            default:
                ctx.fillStyle = colors.circleColor;
                break;
        }
    },   
    bounce = () => {
        figureCoordinates.x += speeds.x;
        figureCoordinates.y += speeds.y;

        if(isCircle){
            if(figureCoordinates.x + sizes.radius > canvas.width){
                speeds.x *= -1;
                figureCoordinates.x = canvas.width - sizes.radius;
            }
            else if(figureCoordinates.x - sizes.radius < 0){
                speeds.x *= -1;
                figureCoordinates.x = sizes.radius;
            }
            if(figureCoordinates.y + sizes.radius > canvas.height){
                speeds.y *= -1;
                figureCoordinates.y = canvas.height - sizes.radius;
            }
            else if(figureCoordinates.y - sizes.radius < 0){
                speeds.y *= -1;
                figureCoordinates.y = sizes.radius;
            }
        }
        else {
            if(figureCoordinates.x + currentWidth > canvas.width){
                figureCoordinates.x = canvas.width - currentWidth;
                speeds.x *= -1;
            }
            else if(figureCoordinates.x < 0){
                figureCoordinates.x = 0;
                speeds.x *= -1;
            }
            if(figureCoordinates.y + currentHeight > canvas.height){
                figureCoordinates.y = canvas.height - currentHeight;
                speeds.y *= -1;
            }
            else if(figureCoordinates.y < 0){
                figureCoordinates.y = 0;
                speeds.y *= -1;
            }
        }
    },
    drawCurrentFigure = () => {
        ctx.beginPath();
        setUpForDrawing();

        if(isCircle){
            ctx.arc(figureCoordinates.x, figureCoordinates.y, sizes.radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
        else {
            ctx.beginPath();
            ctx.rect(figureCoordinates.x, figureCoordinates.y, currentWidth, currentHeight);
            ctx.stroke();
            ctx.fill();
        }

        ctx.closePath();
    },    
    makeItHarder = () => {
        if(speeds.x < 0){
            speeds.x -= speeds.speedToAdd;
        }
        else {
            speeds.x += speeds.speedToAdd;  
        }
        if(speeds.y < 0){
            speeds.y -= speeds.speedToAdd;
        }
        else {
            speeds.y += speeds.speedToAdd;
        }

        sizes.width -= sizes.sizeToCut;
        sizes.height -= sizes.sizeToCut;
        sizes.radius -= sizes.sizeToCut;
    },
    drawScore = () => {
        ctx.font = "50px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Score: " + currentLevel, 5, 50)                
    },
    isWin = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if(currentLevel === maxLevel){
			hasWon = true;
            alert("Congratulations you win! If you want to play again please refresh the page");            
        }
    };
        
window.addEventListener("click", event => {
    if(isPlayerClicked(event.clientX, event.clientY)){
        currentLevel++;
        isCircle = currentLevel % 3 === 0;        

        figureCoordinates.x = getRandomNumber(0, canvas.width);
        figureCoordinates.y = getRandomNumber(0, canvas.height);

        makeItHarder();
        drawScore();
        isWin();

        if(!isCircle){
            [currentWidth, currentHeight] = currentLevel % 3 === 1 ? [sizes.width, sizes.height] : [sizes.height, sizes.width];
        }
    }
});

setUpForDrawing();
drawCurrentFigure();

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(!hasWon){
        bounce();
        drawCurrentFigure();
        drawScore();
        requestAnimationFrame(animate);
    }
    else {		
        ctx.drawImage(refreshImage, canvas.width / 2 - refreshImage.width / 2, canvas.height / 2 - refreshImage.height / 2, canvas.width / 2, canvas.height / 2);
    }
};

animate();
