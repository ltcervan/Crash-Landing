/** @type {HTMLCanvasElement} */ // Accessing canvas elements in HTML
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 3; // to control scroll speed: It is a global game speed

// ---- Level Diffculties ---- Even listeners ~~~~~~ Optional 1:15min


//--- appending all layers of parallax background ----
const backgroundLayer1 = new Image();
backgroundLayer1.src = 'layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'layer-5.png';
const backgroundLayer6 = new Image();
backgroundLayer6.src = 'layer-6.png';
const backgroundLayer7 = new Image();
backgroundLayer7.src = 'layer-7.png';
const backgroundLayer8 = new Image();
backgroundLayer8.src = 'layer-8.png';


/**
 * ================== Making Background Animation ==================
 */

/**
 * The "Layer" class will be used as a blue print to draw each layer
 * and prep it for endless scrolling. Creating 8 image layer objects.
 * each layer will have the same properties except 'image' and 'speed'
 * because we want each layer to move at a different speed from eachother
 */
class Layer {
    constructor(image, speedModifier){ // image and speedModifier are the 2 objects that will differ bwteen each image layer object
        this.x = 0; // Horizontal x coordinate that is set to 0
        this.y = 0; // Virtical y coordinate that is set to 0
        this.width = 2400; // Same width for all layers
        this.height = 700; // Same height for all layers
        this.x2 = this.width;
        this.image = image; // This will be the argument we pass into the class 
        this.speedModifier = speedModifier; // This will be the argument we pass into the class  
        this.speed = gameSpeed * this.speedModifier;
    }
    update(){ // this will help keep the game speed dynamic rather than static
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width){
            this.x = this.width + this.x2 - this.speed;
        }
        if (this.x2 <= -this.width) {
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw(){ // This will draw the image at the coordinates given below
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}
// creating instances of the class Layer using the background-images, to prep for animation
const layer1 = new Layer(backgroundLayer1, .2); // inputing the 2 arguments (image, speedModifier)
const layer2 = new Layer(backgroundLayer2, .4);
const layer3 = new Layer(backgroundLayer3, .5);
const layer4 = new Layer(backgroundLayer4, .65);
const layer5 = new Layer(backgroundLayer5, .75);
const layer6 = new Layer(backgroundLayer6, .8);
const layer7 = new Layer(backgroundLayer7, .95);
const layer8 = new Layer(backgroundLayer8, 1);

// an array of all the new instances made from class layer
const allLayers = [layer1, layer2, layer3, layer4, layer5, layer6, layer7, layer8]; 

function animation() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    allLayers.forEach(layer => {
        layer.update();
        layer.draw();
    })
    requestAnimationFrame(animation);
};
animation();

/**
 * ================== Spawning Random Opponent Objects ===========================
 */

const numOpponents = 3;
const OpponentsArray = [];
const OpponentImg = new Image();
OpponentImg.src = 'skeleton-fly_01.png';

/** Opponents class is used to 'spawn' random objects at random positions 
 * on canvas
 */
class Opponent {
    constructor(enemyImg){
        this.image = enemyImg;
        this.alienWidth = 473;
        this.alienHeight = 468;
        this.width = this.alienWidth/4; // setting width-size paramenter
        this.height = this.alienHeight/4;// setting height-size paramenter
        this.x = Math.random() * (canvas.width - this.width); // setting x-coordinate that will spawn
        this.y = Math.random() * (canvas.height - this.height);   // setting y-coordinate that will spawn
        
    }
    update(){ // this function resets the position of the opponent so it generates coordinates (x and y) dependant on speed variable
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 5 - 2.5; 
    }
    draw(){ // Function used to draw random rectangles that is filled according to the current fillStyle
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
/** 
 * This for loop will take a given number of desired 
 * opponenets and will create an instance of the 
 * class Opponents and push that instance to an empty array
 *  */ 
for (let i = 0; i < numOpponents; i++){
    OpponentsArray.push(new Opponent(OpponentImg));
}

function animateOpponent (){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    OpponentsArray.forEach(opponent => {
        opponent.update();
        opponent.draw();
    }) 
    requestAnimationFrame(animateOpponent);
}
animateOpponent();
