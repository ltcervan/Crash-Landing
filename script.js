// canvas set up
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 700;

let score = 0;
let gameFrame = 0;
ctx.font = '50px Georgia';
// Mouse interactivity
let canvasPosition = canvas.getBoundingClientRect();
const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
}
canvas.addEventListener('mousedown', function (event) {
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
})
canvas.addEventListener('mouseup', function () {
    mouse.click = false;
})
/**
 * ================== Spawning Random Opponent Objects ===========================
 */

const numOpponents = 5;
const OpponentsArray = [];
const OpponentImg = new Image();
OpponentImg.src = 'skeleton-fly_01.png';

/** Opponents class is used to 'spawn' random objects at random positions 
 * on canvas
 */
class Opponent {
    constructor(enemyImg) {
        this.image = enemyImg;
        this.alienWidth = 473;
        this.alienHeight = 468;
        this.width = this.alienWidth / 6; // setting width-size paramenter
        this.height = this.alienHeight / 6;// setting height-size paramenter
        this.x = Math.random() * (canvas.width - this.width); // setting x-coordinate that will spawn
        this.y = Math.random() * (canvas.height - this.height);   // setting y-coordinate that will spawn

    }
    update() { // this function resets the position of the opponent so it generates coordinates (x and y) dependant on speed variable
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 5 - 2.5;
    }
    draw() { // Function used to draw random rectangles that is filled according to the current fillStyle
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
/** 
 * This for loop will take a given number of desired 
 * opponenets and will create an instance of the 
 * class Opponents and push that instance to an empty array
 *  */
for (let i = 0; i < numOpponents; i++) {
    OpponentsArray.push(new Opponent(OpponentImg));
}

/**
 * =============== Making Player ====================
 */
const robotBoy = new Image();
robotBoy.src = 'robot.png';
class Player {
    constructor() {
        this.x = canvas.width;
        this.y = canvas.height / 2;
        this.radius = 50;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 796;
        this.spriteHeight = 719;
    }
    update() {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        if (mouse.x != this.x) {
            this.x -= dx / 20;
        }
        if (mouse.y != this.y) {
            this.y -= dy / 20;
        }
    }
    draw() {
        if (mouse.click) {
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.fillRect(this.x, this.y, this.radius, 10);

        ctx.drawImage(robotBoy, this.x - 60, this.y - 70, this.spriteWidth/6, this.spriteHeight/6);
    }
}
const player = new Player

// ==================== Making Batteries ======================
const batteriesArray = [];
class Battery {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100; //--- Look here to make batteries drop instead of rise
        this.radius = 25;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.counted = false;
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
    }
    update() {
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);

    }
    draw() {
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
}

const batteryCharge = document.createElement('audio');
batteryCharge.src = 'Plug-in.wav'
const batteryCharge2 = document.createElement('audio');
batteryCharge2.src = 'Plug-out.wav'


function handleBatteries() {
    if (gameFrame % 50 == 0) {
        batteriesArray.push(new Battery());
    }
    for (let i = 0; i < batteriesArray.length; i++) {
        batteriesArray[i].update();
        batteriesArray[i].draw();
    }
    for (let i = 0; i < batteriesArray.length; i++) {
        if (batteriesArray[i].y < 0 - batteriesArray[i].radius * 2) {
            batteriesArray.splice(i, 1);
        }
        if (batteriesArray[i].distance < batteriesArray[i].radius + player.radius) {
            if (!batteriesArray[i].counted) {
                if (batteriesArray[i].sound == 'sound1') {
                    batteryCharge.play();
                } else {
                    batteryCharge.play();
                }
                score++;
                batteriesArray[i].counted = true;
                batteriesArray.splice(i, 1);
            }
        }
    }
}


// Animate Loop 

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    OpponentsArray.forEach(opponent => {
        opponent.update();
        opponent.draw();
    })
    handleBatteries();
    player.update();
    player.draw();
    ctx.fillStyle = 'black';
    ctx.fillText('score: ' + score, 10, 50);
    gameFrame++;
    if (score > 5) {
        alert('Blast off! You can go home');
    }
    requestAnimationFrame(animate);
}
animate();
