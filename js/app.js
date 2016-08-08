// Enemies our player must avoid
// Takes X, Y, and Speed parameters used for enemy creation
var Enemy = function(x, y, speed) {
    /* Image sprite is the enemies picture
     * X represents the x coordinate
     * Y represents the y coordinate
     * Speed is how fast the enemy moves
     * End is the end of the board in pixels
     */
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.end = 510;
};

// Calculate a random speed that the enemies will move at
// Utilizes min and max parameters set when creating the enemy
function randomSpeed(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// This calculates a random Y coordinate chosen from an array
// The array equals the three rows of stone enemies walk on
function randomY() {
    var yCoordinates = [60, 145, 230];
    var chooseCoordinate = yCoordinates[Math.floor(Math.random() * yCoordinates.length)];
    return chooseCoordinate;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Change the value of x by setting this.x
    // to equal x plus speed and multiple by dt
    this.x += this.speed * dt;
    // if X goes past the end of the board, reset the enemy
    if (this.x >= this.end) {
        this.reset();
    }
};

/* Reset each enemy when it reaches the end of the board
 * Sets necessary parameters. Can be updated to adjust
 * level difficulty in future versions.
 */
Enemy.prototype.reset = function() {
    this.x = -200;
    this.y = randomY();
    this.speed = randomSpeed(50, 200);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Start Player Script
var Player = function() {
    /* Sprite is the image of the character
     * X equals initial X coordinate
     * Y equals initial Y coordinate
     */
    this.sprite = 'images/char-boy.png'
    this.x = 200;
    this.y = 400;
};

// Render the player on the canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.die = function() {
    // Loop through all enemies on the map
    for (i = 0; i < allEnemies.length; i++) {
        // Check enemy positions vs player positions
        // We are checking if the player is within 65px
        // of the left, right, top, and bottom of an enemy
        if (
            (this.x - allEnemies[i].x) < 65 &&
            (this.y - allEnemies[i].y) < 65 &&
            (allEnemies[i].x - this.x) < 65 &&
            (allEnemies[i].y - this.y) < 65
        ) {
            // Detects collision and takes away a life
            // updates the number of lives available then checks
            // if lives is equal to 0, if so, resets game.
            lives = lives - 1;
            livesBoard.innerHTML = lives;
            if (lives == 0) {
                alert('Game Over. ' + 'You had a score of ' + score);
                score = 0;
                scoreBoard.innerHTML = score;
                resetLives();
            }
            // Reset the players position on death
            this.reset();
        }
    }
}

// Player moves left
Player.prototype.moveLeft = function() {
    this.x -= 100;
};

// Player moves right
Player.prototype.moveRight = function() {
    this.x += 100;
};

// Player moves up
Player.prototype.moveUp = function() {
    this.y -= 85;
};

// Player moves down
Player.prototype.moveDown = function() {
    this.y += 85;
};

// Checks to see if the player has won
Player.prototype.win = function() {
    // Check all instances of player coordinates
    // If player's Y coordinate equals -25, the player
    // has reached the water and won
    if (this.y === -25) {
        //You Win!
        score = score + 1;
        scoreBoard.innerHTML = score;
        this.reset();
    }

    // If the player tries to go more than 400 
    // pixels down the map, don't let them move.
    else if (this.y > 400) {
        //don't let the player go down anymore
        this.y = 400;
    }

    // If the player tries to go more than -100 
    // pixels left of the map, don't let them move.
    else if (this.x === -100) {
        //don't let the player go left anymore
        this.x = 0;
    }

    // If the player tries to go more than 500 
    // pixels right of the map, don't let them move.
    else if (this.x === 500) {
        //don't let the player go right anymore
        this.x = 400;
    }
};

/* Runs required player functions on update
 * Move functions change the players coordinates
 * Die function runs when player collision with enemy occurs
 */
Player.prototype.update = function(dt) {
    this.moveLeft();
    this.moveRight();
    this.moveUp();
    this.moveDown();
    this.die();
    this.win();
};

// Reset function for when a player dies
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

Player.prototype.handleInput = function(keyup) {
    switch (keyup) {
        case 'left':
            this.moveLeft();
            break;
        case 'right':
            this.moveRight();
            break;
        case 'up':
            this.moveUp();
            break;
        case 'down':
            this.moveDown();
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Creates the enemy array and loops through to create
// multiple enemies at once
var allEnemies = [];
for (i = 0; i < 6; i++) {
    allEnemies[i] = new Enemy(-200, randomY(), randomSpeed(50, 200));
}

// Creates the player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Grab the score ID from the html
// Set the initial score to 0 and update the html
var scoreBoard = document.getElementById('score');
var score = 0;
scoreBoard.innerHTML = score;

// Grab the container that the lives live in
// Created a function to easily reset the available
// amount of lives
var livesBoard = document.getElementById('lives');

function resetLives() {
    lives = 3;
    livesBoard.innerHTML = lives;
};
resetLives();