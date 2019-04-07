const canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
document.body.style.margin = "0px";
document.body.style.background = "#6495ED";

canvas.width = window.innerHeight - 5;
canvas.height = canvas.width;

const srcMap = {
        1 : {        
            "apple" : "data:image/png;base64,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",
            "orange" : "https://images.clipartlogo.com/files/istock/previews/1004/100417777-cartoon-vector-graphic-juicy-fresh-orange-fruit-with-green-leaf.jpg",
            "banana" : "https://schools.fairtrade.org.uk/wp-content/uploads/2016/02/Bananas-right.jpg",
            "pineaple" : "https://ih1.redbubble.net/image.620901784.3144/flat,550x550,075,f.u3.jpg",
            "coconut" : "http://mscpi.com/wp-content/uploads/2018/04/MSCPI-Coconut-Milk-and-Cream.jpg",
            "watermelon" : "https://www.jellycat.com/images/products/large/A2W.jpg",
            "lemon" : "https://image.shutterstock.com/image-vector/fresh-lemon-slice-260nw-224271694.jpg",
            "strawberry" : "https://previews.123rf.com/images/rubynurbaidi/rubynurbaidi1710/rubynurbaidi171000012/88230918-illustration-of-cute-cartoon-strawberry-.jpg"
        },

        2 : {
            "lion" : "https://cosmos-images2.imgix.net/file/spina/photo/14772/GettyImages-691120979.jpg?ixlib=rails-2.1.4&auto=format&ch=Width%2CDPR&fit=max&w=835",
            "pika" : "https://allthatsinteresting.com/wordpress/wp-content/uploads/2011/12/cute-animal-red-panda.jpg",
            "cat" : "https://pbs.twimg.com/profile_images/602729491916435458/hSu0UjMC_400x400.jpg",
            "dog" : "http://adparl.com/uploads/images/1473355793kivfp-dogs-71.jpg",
            "wolf" : "https://earthjustice.org/sites/default/files/styles/image_800x600/public/mexican-gray-wolf_don-burkett-800.jpg?itok=LadqU1Ws",
            "tiger" : "https://cdn.shopify.com/s/files/1/0242/5403/products/tiger_poster_grande.jpg?v=1538417698",
            "panda" : "http://bi.gazeta.pl/im/27/13/16/z23148071V,Panda-wielka.jpg",
            "shark" : "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzEwMy8yNzgvb3JpZ2luYWwvbWVnYWxvZG9uLmpwZw==",
            "fish" : "https://m.secure.liveaquaria.com/images/categories/large/lg_72329_Royal_Gramma_Basslet.jpg",
            "gorilla" : "https://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/m/mountain-gorilla_thumb.jpg",
            "monkey" : "https://upload.wikimedia.org/wikipedia/commons/e/ea/Vervet_Monkey_%28Chlorocebus_pygerythrus%29.jpg", 
            "hippopotamus" : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Hippo_at_dawn.jpg/220px-Hippo_at_dawn.jpg",
            "owl" : "https://download.ams.birds.cornell.edu/api/v1/asset/63737991/1800",
            "coolBird" : "https://emmabulpittfilm.files.wordpress.com/2012/02/close-up.jpg",
            "rabbit" : "https://www.goddardvetgroup.co.uk/content/uploads/2018/01/rabbitcosts.png",
            "horse" : "https://www.thesprucepets.com/thmb/UBQTlhbSKHWDL2LbdAzdZm-UGkE=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/iceland-eskifjordur-portrait-of-icelandic-horse-by-lake-543346155-587d6b4b3df78c17b63fa919.jpg",
            "penguin" : "https://www.wwf.org.uk/sites/default/files/styles/adopt_background/public/2016-10/Original_WW22776.jpg?h=66ac411f&itok=uu2PrKqk",
            "fox" : "https://cdn.shopify.com/s/files/1/0242/5403/products/Red-Fox---_-Dmitry-Deshevykh--WWF-Russia_grande.jpg?v=1538406736"
        }
    },
    colors = {
        default : "gray",
        stroke : "white"
    },
    strokeWidth = 1,
    leftPadding = window.innerWidth / 2 - canvas.width / 2,
    gridSize = {
        1 : 4,
        2 : 6, 
        3 : 8
    }, 
    secondsToWait = {
        1 : 0.5,
        2 : 0.3,
        3 : 0.2
    };
    
let grid = [],
    opened = [],
    currentClicked = {},
    level = 1;
    maxLevel = 2;
    squareSide = canvas.width / gridSize[level],

canvas.style.position = "relative";
canvas.style.left = leftPadding + "px";

const createGrid = () => {
    for (let row = 0; row < gridSize[level]; row++){ 
        grid[row] = [];

        for (let col = 0; col < gridSize[level]; col++){ 
            grid[row].push(new function (x, y) {
                this.x = x;
                this.y = y;
                this.isFound = false;
                this.img = new Image();        
                
                this.draw = () => {        
                    ctx.fillStyle = colors.default;
                    ctx.strokeStyle = colors.stroke;
                    
                    ctx.fillRect(this.x, this.y, squareSide, squareSide);
                    ctx.strokeRect(this.x, this.y, squareSide, squareSide);
                }
            
                this.drawImg = () => {
                    ctx.drawImage(this.img, this.x, this.y, squareSide, squareSide);
                }
            }(col * squareSide, row * squareSide));
        }               
    }
},   

drawGrid = () => {
    grid.forEach((row) => {
        row.forEach((square) => {
            if(square.isFound){
                square.drawImg();                
            }
            else {
                square.draw();                
            }
        });
    });
},

random = (min, max) => Math.floor(Math.random() * (max - min) + min);

initSquaresSrc = () => {        
    for (const name in srcMap[level]) {
        for (let i = 0; i < 2; i++) {
            let row = random(0, gridSize[level]),
                col = random(0, gridSize[level]);
    
            while(grid[row][col].img.src){
                row = random(0, gridSize[level]),
                col = random(0, gridSize[level]);
            }
            
            grid[row][col].img.src = srcMap[level][name];
        }
    }    
},

hasWin = () => {
    for (let row = 0; row < gridSize[level]; row++) {
        for (let col = 0; col < gridSize[level]; col++) {
            if(!grid[row][col].isFound){
                return false;
            }            
        }        
    }

    return true;
};

createGrid();
drawGrid();
initSquaresSrc();

window.addEventListener("click", (event) => {
    let x = event.clientX - leftPadding;

    if(opened.length <= 1){
        for(let row = 0; row < gridSize[level]; row++){
            let square = grid[row].find(square => square.x <= x && square.x + squareSide >= x && square.y <= event.clientY && square.y + squareSide >= event.clientY);            
            if(square && !square.isFound){
                square.drawImg();
                if(currentClicked != square){
                    opened.push(square);
                    currentClicked = square;
                }
                break;
            }    
        }        
        
        if(opened[0].img.src === opened[1].img.src){
            opened[0].isFound = true;
            opened[1].isFound = true;

            if(hasWin() && level !== maxLevel && confirm("You win! Do you want to continue playing?")){
                level++;
                squareSide = canvas.width / gridSize[level],
                opened = [];
                currentClicked = {};
                createGrid();
                initSquaresSrc();
                drawGrid();
            }
            else if(hasWin() && level === maxLevel){
                alert("Congratulations you win if you want to play again please refresh the page!")
            }
        }
        if(opened.length >= 2){
            setTimeout(drawGrid, secondsToWait[level] * 1000);
            setTimeout(() => opened = [], secondsToWait[level] * 1000);
            currentClicked = {};
        }
    }
});

