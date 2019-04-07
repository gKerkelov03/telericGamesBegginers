pen = new Pen(0, 0);   

makeBackgroundChangers();
makePenColorChangers();

separatingLineY = penColorChangers[0].y + colorOptionsSide + 5;

drawColorsAndInfo();

window.addEventListener("click", (event) => {	
    let shouldCheck = true;
    
    let clickedOption = backgroundChangers.find((colorOption) => colorOption.isClicked({x : event.clientX, y : event.clientY}));
	
	if(clickedOption){
		clickedOption.onClick();
		shouldCheck = false;
	}
            
    if(shouldCheck){
        clickedOption = penColorChangers.find((colorOption) => colorOption.isClicked({x : event.clientX, y : event.clientY}));
	    if(clickedOption){
		   clickedOption.onClick();                                    
	    }
    }
	
	if(pen.isDrawing){
		pen.isDrawing = false;			
		++index;
		enabled = 0;
	}
});

window.addEventListener("mousedown" , (event) => {		
	if(isClickInside(event.clientY)){
		pen.isDrawing = true;
		pen.down(event.clientX, event.clientY);
		lastState.push([{x : event.clientX, y : event.clientY, radius : penRadius, color : currentPenColor}]);
	}
});

window.addEventListener("mousemove" , (event) => {	
	if(pen.isDrawing && isClickInside(event.clientY)){	
		pen.down(event.clientX, event.clientY);
		lastState[index].push({x : event.clientX, y : event.clientY, radius : penRadius, color : currentPenColor});
	}
});

window.addEventListener("keydown", (event) => {
	if(event.keyCode === 37 && lastState.length > 0){
		poped.push(lastState.pop());

		index = index === 0 ? index : index - 1;
		enabled++;
		
		drawColorsAndInfo();
	}	
	else if(event.keyCode === 39 && enabled && poped.length > 0){
		lastState.push(poped.pop());
		drawColorsAndInfo();
		index++;
		enabled--;
	}
});