# Project-1-escape-Noface


# Escape NoFace

Sucess! NoFace has eaten the medicine you got from the River Spirit, But now he's projectile vomiting all the contents of his massive stomach ***and he's coming to get you!*** You are Chihiro running through the bathhouse to escape the wrath of NoFace, but the other employees of the bathhouse are in your way. Avoid these obstacles and make it out of the bathhouse before NoFace eats you to win the game! 

## What tech stack you plan on using
- HTML, CSS, JavaScript
- Pixel it (https://giventofly.github.io/pixelit/)
- https://www.codeandweb.com/free-sprite-sheet-packer
- Canvas

__Wireframes of your game__

## MVP Goals(minimum viable product)
- create a home screen with instructions and start game button
- have arrow keys control player movement on screen
- have the "bad" character stationary on the right side of the screen
- render obstacles the main character has to move around (collision detection)
- when character reaches right side of game screen where noface is located, run a end game & game over funtion
- write a set timeout function that after certain length of gameplay where player has not triggered end game & game over funtion, 
 will run a won game & end game function 

## Stretch Goals
- render boundaries on the screen that player can move within (collision detection) 
- have a scrolling background
- render a Chihiro character and animate with timed loop between 2 images so character appears to be running
- render & animate a Noface character that stays at the right side of the screen "chasing" chihiro
- have a gravity function that slowly pulls character to right side of screen when arrow keys not being used (velocity or gravity)
- upon collision with obstacles the chihiro character bounces and the obstacles are immovable
## yoga stretch goals
- have Noface follow Chihiros movements from the right side of the screen(moving on y axis)
- animate Yubaba character to throw magic ball at Noface that increases distance from Chihiro(just accelerating character movement)
- animate mouse and bird character to follow Chihiros movements on screen

## potential roadblocks
- the time variable being the controlling factor for winning game.
- collision detection for character with obstacles 
- collision detection with character and "bad guy" initiating game over/end game function
