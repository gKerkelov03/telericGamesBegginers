const getStartingGrid = () => {
    let grid = [];
        
    for (let row = 0; row < dimensions; row++){ 
        grid[row] = [];

        for (let col = 0; col < dimensions; col++){           
            let isWhite = undefined;

            if(row === 0 || row === 1){
                isWhite = false;
            }
            else if(row === dimensions - 2 || row === dimensions - 1){
                isWhite = true;
            }

            grid[row][col] = new Square(col * squareSide, row * squareSide, squareSide, isWhite, templateGridValues[row][col], templateGridColors[row][col]);            
        }               
    }

    return grid;
},

drawGrid = () => {
    grid.forEach((row) => {		
        row.forEach((square) => {
            square.drawMyself();
            square.drawMyValue();	
        });
    });
},

findPieceToDraw = (isWhite, value) => {
    let coordinates = [];

    if(isWhite){
        coordinates.push(piecesSide * piecesIndexes[value], 0);        
    }
    else {        
        coordinates.push(piecesSide * piecesIndexes[value], spriteSheet.height / 2);                
    }

    return coordinates;
},

selectSquare = (x, y) => {
    for (let row = 0; row < dimensions; row++) {
        for (let col = 0; col < dimensions; col++) {            
            if(grid[row][col].value !== 0 && clicked(row, col, x, y)){
                if(grid[row][col].isWhite === isWhiteTurn){
                    isSquareSelected = true;
                    showMovingOptions(grid[row][col], row, col);
                    return {
                        row : row,
                        col : col
                    };                
                }               
            }
        }           
    }
},

clicked = (row, col, x, y) => {
    x -= window.innerWidth / 2 - canvas.width / 2;

    return grid[row][col].x <= x && grid[row][col].x + grid[row][col].side >= x && grid[row][col].y <= y && grid[row][col].y + grid[row][col].side >= y;    
},

showMovingOptions = (square, row, col) => {
    if(square.value === 1){
        showRookOptions(row, col);
    }
    else if(square.value === 2){
        showKnightOptions(row, col);
    }
    else if(square.value === 3){
        showBishopOptions(row, col);
    }
    else if(square.value === 4){
        showQueenOptions(row, col);
    }
    else if(square.value === 5){
        showKingOptions(row, col);
    }
    else if(square.value === 6){
        showPownOptions(row, col, square.isWhite);
    }
},

showKingOptions = (row, col) => {
    let options = [],
        criticals = [];

    if(isInsideGrid(row - 1, col - 1) && grid[row - 1][col - 1].value === 0){
        options.push({
            row : row - 1,
            col : col - 1
        });
    }
    else if(isInsideGrid(row - 1, col - 1) && grid[row - 1][col - 1].value !== 0 && grid[row - 1][col - 1].isWhite !== grid[row][col].isWhite){
        criticals.push({
            row : row - 1,
            col : col - 1
        });
    }

    if(isInsideGrid(row - 1, col) && grid[row - 1][col].value === 0){
        options.push({
            row : row - 1,
            col : col
        });
    }
    else if(isInsideGrid(row - 1, col) && grid[row - 1][col].value !== 0 && grid[row - 1][col].isWhite !== grid[row][col].isWhite){
        criticals.push({
            row : row - 1,
            col : col
        });
    }

    if(isInsideGrid(row - 1, col + 1) && grid[row - 1][col + 1].value === 0){
        options.push({
            row : row - 1,
            col : col + 1
        });
    }
    else if(isInsideGrid(row - 1, col + 1) && grid[row - 1][col + 1].value !== 0 && grid[row - 1][col + 1].isWhite !== grid[row][col].isWhite){
        criticals.push({
            row : row - 1,
            col : col + 1
        });
    }

    if(isInsideGrid(row, col + 1) && grid[row][col + 1].value === 0){
        options.push({
            row : row,
            col : col + 1
        });
    }
    else if(isInsideGrid(row, col + 1) && grid[row][col + 1].value !== 0 && grid[row][col + 1].isWhite !== grid[row][col].isWhite){
        criticals.push({
            row : row,
            col : col + 1
        });
    }

    if(isInsideGrid(row + 1, col + 1) && grid[row + 1][col + 1].value === 0){
        options.push({
            row : row + 1,
            col : col + 1
        });
    }
    else if(isInsideGrid(row + 1, col + 1) && grid[row + 1][col + 1].value !== 0 && grid[row + 1][col + 1].isWhite !== grid[row][col].isWhite){
        criticals.push({
            row : row + 1,
            col : col + 1
        });
    }

    if(isInsideGrid(row + 1, col) && grid[row + 1][col].value === 0){
        options.push({
            row : row + 1,
            col : col
        });
    }
    else if(isInsideGrid(row + 1, col) && grid[row + 1][col].value !== 0 && grid[row + 1][col].isWhite !== grid[row][col].isWhite){
        criticals.push({
            row : row + 1,
            col : col
        });
    }

    if(isInsideGrid(row + 1, col - 1) && grid[row + 1][col - 1].value === 0){
        options.push({
            row : row + 1,
            col : col - 1
        });
    }
    else if(isInsideGrid(row + 1, col - 1) && grid[row + 1][col - 1].value !== 0 && grid[row + 1][col - 1].isWhite !== grid[row][col].isWhite){
        criticals.push({
            row : row + 1,
            col : col - 1
        });
    }

    if(isInsideGrid(row, col - 1) && grid[row][col - 1].value === 0){
        options.push({
            row : row,
            col : col - 1
        });
    }
    else if(isInsideGrid(row, col - 1) && grid[row][col - 1].value !== 0 && grid[row][col - 1].isWhite !== grid[row][col].isWhite){
        criticals.push({
            row : row,
            col : col - 1
        });
    }

    currentOptions = options;
    currentCriticals = criticals;
},

showQueenOptions = (row, col) => {
    showBishopOptions(row, col);
    showRookOptions(row, col, true);
},

showBishopOptions = (row, col) => {
    let index = 1,
        options = [],
        criticals = [];

    while(isInsideGrid(row - index, col - index)){
        if(grid[row - index][col - index].value === 0){
            options.push({
                row : row - index,
                col : col - index
            });
        }
        else if(grid[row - index][col - index].isWhite !== grid[row][col].isWhite){
            criticals.push({
                row : row - index,
                col : col - index
            });

            break;
        }
        else {
            break;
        }

        index++;
    }
    index = 1;

    while(isInsideGrid(row - index, col + index)){
        if(grid[row - index][col + index].value === 0){
            options.push({
                row : row - index,
                col : col + index
            });
        }
        else if(grid[row - index][col + index].isWhite !== grid[row][col].isWhite){
            criticals.push({
                row : row - index,
                col : col + index
            });

            break;
        }
        else {
            break;
        }

        index++;
    }
    index = 1;

    while(isInsideGrid(row + index, col + index)){
        if(grid[row + index][col + index].value === 0){
            options.push({
                row : row + index,
                col : col + index
            });
        }
        else if(grid[row + index][col + index].isWhite !== grid[row][col].isWhite){
            criticals.push({
                row : row + index,
                col : col + index
            });

            break;
        }
        else {
            break;
        }

        index++;
    }
    index = 1;

    while(isInsideGrid(row + index, col - index)){
        if(grid[row + index][col - index].value === 0){
            options.push({
                row : row + index,
                col : col - index
            });
        }
        else if(grid[row + index][col - index].isWhite !== grid[row][col].isWhite){
            criticals.push({
                row : row + index,
                col : col - index
            });

            break;
        }
        else {
            break;
        }

        index++;
    }
    index = 1;

    currentOptions = options;
    currentCriticals = criticals;
},

showKnightOptions = (row, col) => {
    let options = [],
        criticals = [];
    
    if(isInsideGrid(row - 2, col + 1) && grid[row - 2][col + 1].value === 0){       
        options.push({
            row : row - 2,
            col : col + 1
        });
    }
    else if(isInsideGrid(row - 2, col + 1) && grid[row - 2][col + 1].isWhite !== grid[row][col].isWhite){
        criticals.push({
            row : row - 2,
            col : col + 1
        });
    }

    if(isInsideGrid(row - 2, col - 1) && grid[row - 2][col - 1].value === 0){       
        options.push({
            row : row - 2,
            col : col - 1
        });
    }
    else if(isInsideGrid(row - 2, col - 1) && grid[row - 2][col - 1].isWhite !== grid[row][col].isWhite){
        criticals.push({
            row : row - 2,
            col : col - 1
        });
    }

    if(isInsideGrid(row + 2, col + 1) && grid[row + 2][col + 1].value === 0){        
        options.push({
            row : row + 2,
            col : col + 1
        });
    }
    else if(isInsideGrid(row + 2, col + 1) && grid[row + 2][col + 1].isWhite !== grid[row][col].isWhite){
        criticals.push({
            row : row + 2,
            col : col + 1
        });
    }  
    
    if(isInsideGrid(row + 2, col - 1) && grid[row + 2][col - 1].value === 0){        
        options.push({
            row : row + 2,
            col : col - 1
        });
    }
    else if(isInsideGrid(row + 2, col - 1) && grid[row + 2][col - 1].isWhite !== grid[row][col].isWhite){
        criticals.push({
            row : row + 2,
            col : col - 1
        });
    } 

    if(isInsideGrid(row + 1, col - 2) && grid[row + 1][col - 2].value === 0){
        options.push({
            row : row + 1,
            col : col - 2
        });
    }
    else if(isInsideGrid(row + 1, col - 2) && grid[row + 1][col - 2].isWhite !== grid[row][col].isWhite){
        criticals.push({
            row : row + 1,
            col : col - 2
        });
    }     

    if(isInsideGrid(row + 1, col + 2) && grid[row + 1][col + 2].value === 0){
        options.push({
            row : row + 1,
            col : col + 2
        });
    }
    else if(isInsideGrid(row + 1, col + 2) && grid[row + 1][col + 2].isWhite !== grid[row][col].isWhite){
        criticals.push({
            row : row + 1,
            col : col + 2
        });        
    }     

    if(isInsideGrid(row - 1, col - 2) && grid[row - 1][col - 2].value === 0){
        options.push({
            row : row - 1,
            col : col - 2
        });
    }
    else if(isInsideGrid(row - 1, col - 2) && grid[row - 1][col - 2].isWhite !== grid[row][col].isWhite){
        criticals.push({
            row : row - 1,
            col : col - 2
        });
    }     

    if(isInsideGrid(row - 1, col + 2) && grid[row - 1][col + 2].value === 0){
        options.push({
            row : row - 1,
            col : col + 2
        });
    }
    else if(isInsideGrid(row - 1, col + 2) && grid[row - 1][col + 2].isWhite !== grid[row][col].isWhite){
        criticals.push({
            row : row - 1,
            col : col + 2
        });        
    }     

    currentOptions = options;
    currentCriticals = criticals;
},

showRookOptions = (row, col, isQueen) => {
    let index = 1,
        options = [],
        criticals = [];

    while(isInsideGrid(row - index, col)){
        if(grid[row - index][col].value === 0){
            options.push({
                row : row - index,
                col : col
            });
        }
        else if(grid[row - index][col].isWhite !== grid[row][col].isWhite){
            criticals.push({
                row : row - index,
                col : col
            });

            break;
        }
        else {
            break;
        }

        index++;
    }
    index = 1;

    while(isInsideGrid(row + index, col)){
        if(grid[row + index][col].value === 0){
            options.push({
                row : row + index,
                col : col
            });
        }
        else if(grid[row + index][col].isWhite !== grid[row][col].isWhite){
            criticals.push({
                row : row + index,
                col : col
            });

            break;
        }
        else {
            break;
        }

        index++;
    }
    index = 1;

    while(isInsideGrid(row, col + index)){
        if(grid[row][col + index].value === 0){
            options.push({
                row : row,
                col : col + index
            });
        }
        else if(grid[row][col + index].isWhite !== grid[row][col].isWhite){
            criticals.push({
                row : row,
                col : col + index
            });

            break;
        }
        else {
            break;
        }

        index++;
    }
    index = 1;

    while(isInsideGrid(row, col - index)){
        if(grid[row][col - index].value === 0){
            options.push({
                row : row,
                col : col - index
            });
        }
        else if(grid[row][col - index].isWhite !== grid[row][col].isWhite){
            criticals.push({
                row : row,
                col : col - index
            });

            break;
        }
        else {
            break;
        }

        index++;
    }
    index = 1;

    if(isQueen){
        options.forEach((option) => {
            currentOptions.push(option);
        });

        criticals.forEach((option) => {
            currentCriticals.push(option);
        });
    }
    else {        
        currentOptions = options;
        currentCriticals = criticals;
    }
},

showPownOptions = (row, col, isWhite) => {
    let options = [],
        criticals = [];

    if (isWhite && isWhiteTurn) {        
        if(isInsideGrid(row - 1, col) && grid[row - 1][col].value === 0){
            options.push({
                row : row - 1,
                col : col
            });

            if(row === 6){
                if(isInsideGrid(row - 2, col) && grid[row - 2][col].value === 0){
                    options.push({
                        row : row - 2,
                        col : col
                    });
                }
            }
        }

        if(isInsideGrid(row - 1, col + 1) && grid[row - 1][col + 1].value !== 0 && grid[row - 1][col + 1].isWhite !== grid[row][col].isWhite){
            criticals.push({
                row : row - 1,
                col : col + 1
            });
        }

        if(isInsideGrid(row - 1, col - 1) && grid[row - 1][col - 1].value !== 0 && grid[row - 1][col - 1].isWhite !== grid[row][col].isWhite){
            criticals.push({
                row : row - 1,
                col : col - 1
            });
        }
    }
    else if(isWhite === false && isWhiteTurn === false){        
        if(isInsideGrid(row + 1, col) && grid[row + 1][col].value === 0){
            options.push({
                row : row + 1,
                col : col
            });

            if(row === 1){
                if(isInsideGrid(row + 2, col) && grid[row + 2][col].value === 0){
                    options.push({
                        row : row + 2,
                        col : col
                    });
                }
            }
        }

        if(isInsideGrid(row + 1, col + 1) && grid[row + 1][col + 1].value !== 0 && grid[row + 1][col + 1].isWhite !== grid[row][col].isWhite){
            criticals.push({
                row : row + 1,
                col : col + 1
            });
        }

        if(isInsideGrid(row + 1, col - 1) && grid[row + 1][col - 1].value !== 0 && grid[row + 1][col - 1].isWhite !== grid[row][col].isWhite){
            criticals.push({
                row : row + 1,
                col : col - 1
            });
        }
    }

    fetchOptions(options, criticals);
},

drawOptions = (options, criticals) => {
    options.forEach((option) => {
        grid[option.row][option.col].drawMyself(colors.options);
        grid[option.row][option.col].drawMyValue();
    });

    
    criticals.forEach((option) => {
        grid[option.row][option.col].drawMyself(colors.criticals);
        grid[option.row][option.col].drawMyValue();
    });
},

changeValue = (from, to) => {
    grid[to.row][to.col].value = grid[from.row][from.col].value;
    grid[to.row][to.col].isWhite = grid[from.row][from.col].isWhite;

    grid[from.row][from.col].value = 0;
    grid[from.row][from.col].isWhite = undefined;
},

fetchOptions = (options, criticals) => {
    currentOptions = options;
    currentCriticals = criticals;
},

isSomeoneDead = () => {
    let kings = (function(){
        let result = {
            white : false,
            black : false                    
        };

        grid.forEach((row) => {
            row.forEach((square) => {
                if(square.value === 5){
                    if(square.isWhite){
                        result.white = true;
                    }
                    else {
                        result.black = true;
                    }
                }
            });
        });

        return result;
    })();

    if(kings.white === false || kings.black === false){
        let winner = kings.white ? "white" : "black",
            answer = confirm(`${winner} win the game in ${movesCounter} turns! Do you want to play again?`);
        
        if(answer) {
            grid = getStartingGrid();
            currentSelectedSquareLocation = {};
            currentOptions = [];
            currentCriticals = [];
            isSquareSelected = false;
            isWhiteTurn = true;
            movesCounter = 0;
            drawGrid();
        }
    }
},
canWhiteMakeLittleRocad = () => {
	
}

isInsideGrid = (row, col) => {
    return row >= 0 && col >= 0 && row < dimensions && col < dimensions;
};