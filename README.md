# Robot Boy
JavaScript Video Game
![GameImage](https://github.com/ltcervan/Crash-Landing/assets/26885863/9f22d5f5-23c8-4eab-9d9c-b3d468dd9514)
Join Robot Boy as he attempts to repower his jets by collection energy orbs while simultaneously evading capture from the ailen ships!

### Technologies Used
### 1. JavaScript
JavaScript is the core programming language used to build the game logic and interactivity. It runs in the browser and handles user interactions, game mechanics, and rendering.
### 2. HTML5 Canvas
The game's graphics are rendered using HTML5 Canvas. This allows for smooth animations and dynamic visuals.
### 4. CSS
CSS is used for styling the game's user interface elements.

### Installation - Getting Started
To run the game locally, follow these steps:
1. Clone the repository using `git clone`.
2. Install dependencies with `npm install`.
3. Use a development server or open the `index.html` file in your browser.
4. Open the directory in your text editor to view or edit the code

To run the game in the browser follow this link : https://ltcervan.github.io/Robot_Boy/

### Approach
This code was primarily built around the use of 3 classes which had 2 function, update() and draw(). This outline was used to build the main components of the game, namely, Player(), Opponent() and Battery().
The update() function of the class was used to position and control the element and is where we positioned the collision detection between objects while the draw() function was used to create the rendering conditions for that same element. All instances of these classes were animated using an animate function wich contained the conditions for winning and losing. Lastly the game is control through mouse movement that is strictly used to control the Player() instance.

### Code Explanations 
This is an example of the update funtion within the class Opponent. The first part of the funtion is responsible for setting the "spawning" condition of the opponent. Where on the canvas the Opponent will spawn from and in what direction the opponent will be heading. The second half of this function handles the collision detection between the Player and Opponent. Here we chose to use collision detection bewteen two circles. This collision detection method employs the Pythagorean Theorem which finds the distance between two objects then once you have the distance, you can compare it to the sum of the radii or half-widths of the objects. If distance is less than or equal to the sum of the radii, it means the objects are colliding.
```
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
```

How to handle the floating orbs--- This function is responsible for making the energy orbs disapear after they have collided with the Player, how to add to the score when collision happens and how to play sounds when collision occurs:

```
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
```

### Unresolved Problems
1. The function mentioned above is supposed to play a sound every time the player collides with the energy orb, however the sound only occurs everyother time the two objects collide
2. Collision detection: This can be optimized to ensure the spirite more closely resembles the shape that is being used for collision detection. Here we only used circles.
3. The mouse movement is not very dynamic. The Player objects follows a very strict trajectory set by the mouse cursor when the point was to have a more fluid movement using the mouse.

### Stretch Goals
1. Implementing harder levels with more opponents
2. Optimizing animations of the player and the opponents
3. Setting a timer for added challenge. 

