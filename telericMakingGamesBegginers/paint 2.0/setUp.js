const canvas = document.getElementById("canvas"),
    penSize = document.getElementById("penSize"),
    button = document.getElementById("button"),
    ctx = canvas.getContext("2d");

document.body.style.margin = "0px";
document.body.style.overflow = "hidden";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

button.value = "clear";
button.style.position = "relative";
button.style.width = "60px"
button.style.height = "40px"
button.style.bottom = canvas.height - 15 + "px";
button.style.left = canvas.width - parseInt(button.style.width) - 25 + "px";
button.onclick = () => {
    lastState = [];
    drawColorsAndInfo();
    index = 0;
}

penSize.style.position = "relative";
penSize.style.bottom = canvas.height - 25 + "px";
penSize.style.left = canvas.width - 300 - parseInt(button.style.width) + "px";
penSize.onchange = () => {
    penRadius = penSize.value;
}

const strokeColorOnSelect = "white",
    optionsStrokeWidth = 3,
    textFontPixels = 20,
    instructions = {
        backgroundColor : "Background color: ",
        penColor : "Pen color: "
    },
    getRandomNum = (min, max) => {
        return (Math.random() * (max - min) + min) | 0;
    };    
    
    let colors = ["red", "chartreuse", "gray", "black", "purple", "brown", "yellow", "blue", "white", "orange", "pink"],
    colorOptionsSide = canvas.width / (4 * colors.length),
    pen = {},
    penRadius = penSize.value,    
    backgroundChangers = [],
    penColorChangers = [],
    poped = [],    
    lastState = [],
    index = 0,
    enabled = 0,
    separatingLineY,
    currentBackgroundColor = colors[getRandomNum(0, colors.length)],
    currentPenColor = (function(){
        let color = colors[getRandomNum(0, colors.length)];
        
        while(color === currentBackgroundColor){
            color = colors[getRandomNum(0, colors.length)];    
        }

        return color
    })();