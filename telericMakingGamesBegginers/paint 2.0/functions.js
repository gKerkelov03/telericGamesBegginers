const drawTexts = () => {
        ctx.font = textFontPixels + "px Arial";
        ctx.fillStyle = currentBackgroundColor === "white" ? "black" : "white";

        ctx.fillText(instructions.backgroundColor, 0, textFontPixels)
        ctx.fillText(instructions.penColor, 0, textFontPixels * 2 + 20)
},
makeBackgroundChangers = () => {
    let startingX = (instructions.backgroundColor.length * textFontPixels) / 2;

    colors.forEach((color) => {
        if(color === currentBackgroundColor){
            backgroundChangers.push(new BackgroundChanger(color, startingX + backgroundChangers.length * colorOptionsSide, 0, colorOptionsSide, true));
        }
        else {
            backgroundChangers.push(new BackgroundChanger(color, startingX + backgroundChangers.length * colorOptionsSide, 0, colorOptionsSide, false));
        }
    });
},
makePenColorChangers = () => {
    let startingX = (instructions.penColor.length * textFontPixels) / 2;
    
    colors.forEach((color) => {            
        if(color === currentPenColor){
            penColorChangers.push(new colorChanger(color, startingX + penColorChangers.length * colorOptionsSide, textFontPixels * 2 + 5, colorOptionsSide, true));            
        }
        else {
            penColorChangers.push(new colorChanger(color, startingX + penColorChangers.length * colorOptionsSide, textFontPixels * 2 + 5, colorOptionsSide, false));            
        }
    });
},
displayBackgroundChangers = () => {
    backgroundChangers.forEach((colorOption) => {
        colorOption.draw(true);
    });
},
displayPenColorChangers = () => {
    penColorChangers.forEach((colorOption) => {
        colorOption.draw();
    });
},
drawBackground = () => {
    ctx.fillStyle = currentBackgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
},
drawColorsAndInfo = () => {	
    let tempColor = ctx.strokeStyle;

    drawBackground();
    drawTexts();
    displayBackgroundChangers();
    displayPenColorChangers();
    
    ctx.strokeStyle = currentBackgroundColor === "black" ? "white" : "black";
    ctx.beginPath()
    ctx.moveTo(0, separatingLineY);
    ctx.lineTo(canvas.width, separatingLineY);
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = tempColor;
    
	pen.generateLastState(lastState);	
},
isClickInside = (y) => y - penRadius >= separatingLineY;