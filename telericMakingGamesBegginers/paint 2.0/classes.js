class ColorOption {
    constructor(color, x, y, side, isSelected){
        this.color = color;
        this.x = x;
        this.y = y;
        this.side = side;  
        this.isSelected = isSelected;       
    }

    draw(isBackground){
        ctx.fillStyle = this.color;        
        ctx.fillRect(this.x, this.y, this.side, this.side);

        if(this.isSelected){      
            if(isBackground){
                ctx.strokeStyle = currentBackgroundColor === "white" ? "black" : strokeColorOnSelect;
            }                  
            else {
                ctx.strokeStyle = this.color === "white" ? "black" : strokeColorOnSelect;
            }

            ctx.lineWidth = optionsStrokeWidth;
            ctx.strokeRect(this.x, this.y, this.side, this.side);            
        }
    }

    isClicked(coordinates){
        return this.x <= coordinates.x && this.x + this.side >= coordinates.x && this.y <= coordinates.y && this.y + this.side >= coordinates.y;
    }
}

class BackgroundChanger extends ColorOption {
    onClick(){
        currentBackgroundColor = this.color;
        backgroundChangers.find((colorOption) => colorOption.isSelected).isSelected = false;                                                  
        this.isSelected = true;
        drawColorsAndInfo();
    }
}

class colorChanger extends ColorOption{
    onClick(){
        currentPenColor = this.color;
        penColorChangers.find((colorOption) => colorOption.isSelected).isSelected = false;                                                  
        this.isSelected = true;
		
        drawColorsAndInfo();
    }
}

class Pen {
    constructor(x, y){
        this.x = x;
        this.y = y;
		this.isDrawing = false;			
    }
	
	down(x, y){		
		if(isClickInside(y)){
			pen.x = x;
			pen.y = y;  

			pen.draw();		              
		}    
	}
	
	generateLastState(positions){	
		positions.forEach((position) => position.forEach(state => this.draw(state.x, state.y, state.radius, state.color)));
	}
	
    draw(x = this.x, y = this.y, r = penRadius, color = currentPenColor){		     
        ctx.fillStyle = color;
		
        ctx.beginPath();		
		ctx.arc(x, y, r, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
    }
}