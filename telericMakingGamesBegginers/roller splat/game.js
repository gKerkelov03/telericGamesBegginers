const canvas = document.getElementById("canvas"),
    byeImage = document.getElementById("byeImage"),
    winImage = document.getElementById("winImage"),
    ctx = canvas.getContext("2d");

document.body.style.margin = "0px";
document.body.style.background = "black";
byeImage.style.display = "none";
winImage.style.display = "none";

canvas.width = window.innerHeight - 5;
canvas.height = window.innerHeight - 5;

canvas.style.position = "relative";
canvas.style.left = window.innerWidth / 2 - canvas.width / 2 + "px";

ctx.strokeStyle = "white";
ctx.lineWidth = 2;

let level = 1,
    hasWon = false,
    hasQuited = false,
    levels = {
        1 : [
            [
                [2, 0, 1, 0, 0],
                [0, 0, 0, 0, 0],
                [1, 0, 1, 0, 1],
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
            ],
            {
                playerColor : "chartreuse",
                zeroesColor : "gray",
                obsticalsColor : "yellow",
                passedColor : "mediumslateblue"
            }
        ],
        2 : [
            [
                [0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 1],
                [0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 1, 0, 0, 2]
            ],
            {
                playerColor : "red",
                zeroesColor : "white",
                obsticalsColor : "blue",
                passedColor : "palegreen"
            }
        ],
        3 : [
            [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0, 0, 1],
                [0, 1, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ],
            {
                playerColor : "yellow",
                zeroesColor : "red",
                obsticalsColor : "white",
                passedColor : "orange"
            }
        ],
        4 : [
            [
                [1, 1, 2, 1, 1],
                [1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0],
                [1, 1, 0, 1, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1],                
                [0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0],
                [1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1],
                [0, 1, 0, 0, 0],
                [0, 0, 0, 1, 0]
            ],
            {
                playerColor : "brown",
                zeroesColor : "pink",
                obsticalsColor : "forestgreen",
                passedColor : "gainsboro"
            }
        ],
        5 : [
            [
                [1, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 1, 0, 0, 0],
                [0, 0, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0, 1, 0],
                [0, 1, 1, 2, 0, 1, 0],
                [0, 1, 0, 0, 1, 0, 0],
                [0, 0, 0, 1, 1, 0, 0],
                [1, 0, 0, 0, 0, 0, 1]
            ],
            {
                playerColor : "cyan",
                zeroesColor : "papayawhip",
                obsticalsColor : "rosybrown",
                passedColor : "midnightblue"
            }
        ],
        6 : [
            [
                [0, 0, 0, 1, 1, 0, 2, 1],
                [0, 0, 0, 1, 0, 0, 1, 1],
                [0, 1, 1, 0, 0, 1, 0, 0],
                [0, 1, 0, 0, 1, 0, 0, 0],
                [0, 1, 0, 1, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 1, 1, 0],
                [1, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 1, 0],
                [0, 1, 0, 0, 1, 0, 0, 0],
                [0, 1, 1, 0, 0, 1, 1, 0],
                [0, 0, 0, 1, 0, 0, 1, 0],
                [0, 0, 0, 1, 1, 0, 0, 0],                
            ],
            {
                playerColor : "turquoise",
                zeroesColor : "gray",
                obsticalsColor : "tomato",
                passedColor : "thistle"
            }
        ],
        7 : [
            [
                [0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0, 1, 1, 0],
                [0, 1, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 0, 0, 1, 1, 0, 0],
                [0, 0, 0, 0, 1, 1, 0, 1],
                [0, 1, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 1, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 0, 1, 0, 2, 1],

            ],
            {
                playerColor : "peru",
                zeroesColor : "purple",
                obsticalsColor : "palegreen",
                passedColor : "black"
            }
        ],
        8 : [
            [
                [1, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 1, 0],
                [1, 1, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 1, 0, 0],
                [0, 0, 0, 2, 0, 0, 0],
                [0, 0, 1, 0, 1, 0, 1],
                [0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 1, 0, 0],

            ],
            {
                playerColor : "maroon",
                zeroesColor : "lightcyan",
                obsticalsColor : "yellow",
                passedColor : "mediumPurple"    
            }
        ],
        9 : [
            [
                [1, 0, 0, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1],
                [0, 1, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0, 0, 2],            
            ],
            {
                playerColor : "skyblue",
                zeroesColor : "black",
                obsticalsColor : "chartreuse",
                passedColor : "gold"
            }
        ],
        10 : [
            [
                [0, 0, 0, 0, 1, 1],
                [0, 1, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 2],
                [1, 0, 0, 0, 0, 1]
            ],
            {
                playerColor : "chartreuse",
                zeroesColor : "gray",
                obsticalsColor : "white",
                passedColor : "navy"
            }
        ]
    }

const getPlayerCoordinates = () => {
        for(let row = 0; row < grid.length; row++){
            for(let col = 0; col < grid[row].length; col++){
                if(grid[row][col].value === 2){
                    return [row, col];
                }
            }
        }
    },
    move = (r, c) => {
        let [row, col] = getPlayerCoordinates();
        grid[row][col].value = 0;
        grid[row][col].color = colors.passedColor;
                
        while(isInside(row + r, col + c) && grid[row + r][col + c].value !== 1){      
            grid[row + r][col + c].color = colors.passedColor;
            
            row += r;
            col += c;
        } 
        
        grid[row][col].value = 2;
        grid[row][col].color = colors.playerColor;  
    },    
    isLevelPassed = (msg) => {
        if((function(){
            for(let row = 0; row < grid.length; row++){
                for(let col = 0; col < grid[row].length; col++){
                    if(grid[row][col].color !== colors.passedColor && grid[row][col].value === 0){
                        return false;
                    }
                }
            }            

            return true;
        })()){
            if(level !== Object.keys(levels).length){
                if(confirm(`You passed level ${level}! Do you want to continue with level ${level + 1}`)){                  
                    init(++level);
                    drawGrid();
                }
                else {
                    hasQuited = true;
                    ctx.drawImage(byeImage, 0, 0, canvas.width, canvas.height);
                }
            }
            else {
                hasWon = true;
                ctx.drawImage(winImage, 0, 0, canvas.width, canvas.height);
                msg ? alert(msg) : alert("You win the game!");
            }
        }
    }
    drawGrid = () => grid.forEach(row => row.forEach(square => square.drawMyself())),
    isInside = (row, col) => grid[row] !== undefined ? col < grid[row].length && col >= 0 : false,
    init =() => {
    [templateGrid, colors] = (function(){return levels[level];})();
    longestRowLength = templateGrid.reduce((acc, curr) => acc.length > curr.length ? acc : curr, []).length,
    squareSizes = {
        width : canvas.width / longestRowLength,
        height : canvas.height / templateGrid.length 
    },
    grid = (function(){
        let grid = [];
        
        for(let row = 0; row < templateGrid.length; row++){
            let r = [];
    
            for(let col = 0; col < templateGrid[row].length; col++){
                let color = (function(){
                    switch(templateGrid[row][col]){
                        case 0: return colors.zeroesColor;
                        case 1: return colors.obsticalsColor;
                        case 2 : return colors.playerColor;
                    }
                })();
    
                r.push(new function (x, y, value, color){
                    this.x = x;
                    this.y = y;
                    this.value = value;
                    this.color = color;
                    this.drawMyself = () => {        
                        ctx.fillStyle = this.color;
                        ctx.fillRect(this.x, this.y, squareSizes.width, squareSizes.height);
                        ctx.strokeRect(this.x, this.y, squareSizes.width, squareSizes.height);
                    }    
                }(col * squareSizes.width, row * squareSizes.height, templateGrid[row][col], color));
            }
    
            grid.push(r);
        }
    
        return grid;
    })();    
    };

init();
drawGrid();
window.addEventListener("keydown", e => {
    if(!hasQuited){
        switch(e.keyCode){
            case 37: move(0, -1); break;
            case 38: move(-1, 0); break;
            case 39: move(0, 1); break;
            case 40: move(1, 0); break;        
        }
    
        drawGrid();
        hasWon ? isLevelPassed("You already win... We dont have more levels. If you want to play again refresh the page!") : isLevelPassed();
    }
});