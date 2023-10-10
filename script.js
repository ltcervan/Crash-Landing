// canvas set up
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 700;
let score = 0;
let gameFrame = 0;
ctx.font = '50px Georgia';
// const gameLevel = doc.getEle;
let gameOver = false; 
/**
 * =============== Game level selection ============
 */


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
 * ================== Setting up canvas Background ========================
 * 
 */
let scrollSpeed = 1;
let scorllY = 0;
const spaceBackground = new Image();
spaceBackground.src = 'Starbasesnow.png';


function drawBackground(){
    ctx.drawImage(spaceBackground, 0, scorllY, canvas.width, canvas.height);
    ctx.drawImage(spaceBackground, 0, scorllY - canvas.height, canvas.width, canvas.height);
    scorllY += scrollSpeed;
    if (scorllY >= canvas.height){
        scorllY = 0;
    }
}


/**
 * ================== Spawning  Opponent Objects ===========================
 * Opponents class is used to 'spawn' random objects at random positions 
 * on canvas
 * 
 */
const opponentImg = new Image();
opponentImg.src = 'Aircrafts-04.png';
const numOpponents = 5;
const opponentArray = [];

class Opponent {
    constructor(){
        this.x = canvas.width + 200;
        this.y = Math.random() * (canvas.height - 150) + 90;
        this.radius = 50;
        this.speed = Math.random() * 2 + 2;
        this.spriteHeight = 501;
        this.spriteWidth = 501;
    }
    draw(){
        /*ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();*/
        ctx.drawImage(opponentImg, this.x - 55 , this.y - 60, this.radius * 2.45, this.radius * 2.45);
    }
    update(){
        this.x -= this.speed;
        if (this.x < 0 - this.radius * 2){
            this.x = canvas.width + 200;
            this.y = Math.random() * (canvas.height - 150) + 90;
            this.speed = this.speed;
        }
        // Collision detection with Player
        const dx = this.x - player.x; 
        const dy = this.y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.radius + player.radius){
            GameOver('You got Hit!');
        }
    }
}
const opponent1 = new Opponent();
function handleOpponent (){
    opponent1.draw();
    opponent1.update();
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
        this.radius = 40;
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
        /*ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();*/
        ctx.closePath();

        ctx.drawImage(robotBoy, this.x - 60, this.y - 70, this.spriteWidth/6, this.spriteHeight/6);
    }
}
const player = new Player

// ==================== Making Batteries ======================
const pulseBall = new Image();
pulseBall.src = 'pulsing-electric-ball.png';
const batteriesArray = [];
class Battery {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100; //--- Look here to make batteries drop instead of rise
        this.radius = 25;
        this.speed = Math.random() * 5 + 1;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 512;
        this.spriteHeight = 512;
        this.distance;
        this.counted = false;
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
    }
    update() {
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
        if(gameFrame % 5 == 0){
            this.frame++;
            if (this.frame >= 8) this.frame = 0;
            if (this.frame == 3 || this.frame == 7){
                this.frameX = 0;
            } else {
                this.frameX++;
            }
            if (this.frame < 3) this.frameY = 0;
            else if (this.frame < 7)this.frameY = 1;
            else this.frameY = 0;
        }
    }
    draw() {
        /*ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();*/
        ctx.closePath();
        ctx.stroke();
        ctx.drawImage(pulseBall, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - 58, this.y - 58, this.radius * 4.5, this.radius * 4.5);

    }
}

const batteryCharge = document.createElement('audio');
batteryCharge.src = 'Plug-in.wav'
// const batteryCharge2 = document.createElement('audio');
// batteryCharge2.src = 'Plug-out.wav'
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
                }
                score++;
                batteriesArray[i].counted = true;
                batteriesArray.splice(i, 1);
            }
        }
    }
}


// Animate Loop 

function GameOver(results){
    ctx.fillStyle = 'white';
    ctx.fillText(results, 130, 250);
    gameOver = true;
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    handleOpponent();
    handleBatteries();
    player.update();
    player.draw();
    ctx.fillStyle = 'green';
    ctx.fillText('score: ' + score, 10, 50);
    gameFrame++;
    if (score >= 10) {
        GameOver('You Win! Try another level');
    }
    if (!gameOver) requestAnimationFrame(animate);
    
    
};
animate();
window.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
});