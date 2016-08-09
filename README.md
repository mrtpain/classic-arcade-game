# Front-End Nanodegree Arcade Game
_____________________________________

## How to Run the Game

The game and its functions primarily live in app.js, this is where the rules of the game are stored. You can run the game and play it by opening up index.html in the browser of you choice.

There are 2 main class necessary to run the game

* The **Player** class
* The **Enemy** class

Each class represents different objects in the game. While there are multiple enemies, there is only 1 player on the canvas at a time.

## The Enemy Class

The enemy class takes 3 parameters which are used to create a new instance of an enemy.

* **x** is used to create the starting x coordinate
* **y** is used to create the starting y coordinate
* **speed** is used to get a random speed the enemy will move at

Prototype chains are used to update, render, and reset the enemies on the map.

## The Player Class

The player class takes no parameters as it has set x and y coordinates on reset.

Prototype chains are used to update, render, reset, win or die.

The character is controlled by using the arrow keys in which the program will check:

* where the player should move to
* if the player tried to go out of bounds
* if the player reached the
* if a player collided with an enemy

## How to Play the Game

* Use the **arrow keys** to move the player around the map.
* Reach the water and gain a point.
* Lose all 3 of your lives and you reset the game.