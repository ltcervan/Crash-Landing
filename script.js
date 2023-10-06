const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 12; // to control scroll speed:

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


// --- Making background animation ---

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
    update(){
        this.speed = gameSpeed * this.speedModifier;
    }
    draw(){

    }
}

function animation() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    requestAnimationFrame(animation);
};
animation();