
const movementDisplay = document.getElementById('movement')

const canvas = document.getElementById('canvas')
// Set your Context!
const ctx = canvas.getContext('2d')

const chihiro = document.getElementById("chihiro-run")
const noface = document.getElementById("noface-run")

canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])
//   const ctx = canvas.getContext('2d')

  class Crawler{
    constructor(imgSrc, x, y, width, height) {
        this.imgSrc = imgSrc
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        //this.frameX = 0
        //this.moving = true
      }
      render() {      
        ctx.drawImage(this.imgSrc, this.x, this.y, this.width, this.height)
        //ctx.drawImage(img, Sx, Sy, Swidth, Sheight, Dx, Dy, Dwidth, Dheight)          
        //ctx.drawImage(sprite, column*frameWidth, row*frameHeight, frameWidth, frameHeight, 10(this.x), 30(this.y), frameWidth, frameHeight);
        ctx.fill()
      }
  }

  let runGame //= setInterval(gameLoop, 60);
  let hero = new Crawler(chihiro, 150, 190, 60, 70);
  let ogre = new Crawler(noface, 640, 9, 170, 385);
  let obstacle 
  let obstacleTwo
  let obstacleThree
  
  function createRandomObstacle () {
    const randomY = Math.floor(Math.random()*360) + 1
    const radish = document.getElementById("radish")
     return new Crawler(radish, 0, randomY, 170, 135);
    }
  function createRandomObstacleTwo () {
    const randomY = Math.floor(Math.random()*360) + 1
    const foreman = document.getElementById("foreman")
     return new Crawler(foreman, 0, randomY, 60, 75);
    }
  function createRandomObstacleThree () {
    const randomY = Math.floor(Math.random()*360) + 1
    const lady = document.getElementById("lady")
     return new Crawler(lady, 0, randomY, 95, 100);
  }
  var Keys = {
      up: false,
      down: false,
      left: false,
      right: false,
  }

  window.onkeydown = function(e) {
      var kc = e.keyCode
      if(kc === 37 || kc === 65) Keys.left = true;
      if(kc === 38 || kc === 87) Keys.up = true;
      if(kc === 39 || kc === 68) Keys.right = true;
      if(kc === 40 || kc === 83) Keys.down = true;
  }

  window.onkeyup = function(e) {
      var kc = e.keyCode
      if(kc === 37 || kc === 65) Keys.left = false;
      if(kc === 38 || kc === 87) Keys.up = false;
      if(kc === 39 || kc === 68) Keys.right = false;
      if(kc === 40 || kc === 83) Keys.down = false;
  }

      function move() {
        const speed = 5
        if(Keys.up && hero.y > 0) {
          hero.y -= speed
        } else if(Keys.down && hero.y + hero.height < canvas.height) {
          hero.y += speed
        } else if(Keys.left && hero.x > 0) {
          hero.x -= speed
        } else if(Keys.right && hero.x + hero.width < canvas.width) {
          hero.x += speed
        }
     }
 

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)                //clears the canvas
    //context.drawImage(sprite, column * frameWidth, row * frameHeight, frameWidth, frameHeight, 10, 30, frameWidth, frameHeight)
    move()
    movementDisplay.innerHTML = "<form><button id='clear' type='submit'>New Game?</button></form>"       //Display the X and Y coordinates of our hero
    ogre.render()
    if(!obstacle){ //!obstacle
      obstacle = createRandomObstacle()
    }
    obstacle.x += 12
    if(obstacle.x >= 620) {
      obstacle = createRandomObstacle()
    }
    if(!obstacleTwo){ //!obstacle
      obstacleTwo = createRandomObstacleTwo()
    }
    obstacleTwo.x += 16
    if(obstacleTwo.x >= 620) {
      obstacleTwo = createRandomObstacleTwo()
    }
    if(!obstacleThree){ //!obstacle
      obstacleThree = createRandomObstacleThree()
    }
    obstacleThree.x += 18
    if(obstacleThree.x >= 620) {
      obstacleThree = createRandomObstacleThree()
    }
    obstacle.render()
    obstacleTwo.render()
    obstacleThree.render()
    detectHit()
    hero.render()
  
}

document.addEventListener('keydown', movementHandler);


function movementHandler(e) {
    // up (w:87): y-=1; left (a:65): x-=1; down (s:83): y+=1; right (d:68): x+=1
    switch (e.keyCode) {
      case (38):
        hero.y -= 10
        break
      case (37):
        hero.x -= 10
        break
      case (40):
        hero.y += 10
        break
      case (39):
        hero.x += 10
    
    } 
  }
  

function detectHit() {  
    // one big, confusing if:
    if (                                  //noface
      hero.x + hero.width >= ogre.x &&
      hero.x <= ogre.x + ogre.width &&
      hero.y <= ogre.y + ogre.height &&
      hero.y + hero.height >= ogre.y
      ) {
        losingGame()
        hero.x -= 5
        hero.y -= 5 
      }
      if (                                  // obstacle collision 
        hero.x + hero.width >= obstacle.x &&
        hero.x <= obstacle.x + obstacle.width &&
        hero.y <= obstacle.y + obstacle.height &&
        hero.y + hero.height >= obstacle.y
        ) {
          hero.y += 5
          hero.x += 10
     } if (
      hero.x + hero.width >= obstacleTwo.x &&
      hero.x <= obstacleTwo.x + obstacleTwo.width &&
      hero.y <= obstacleTwo.y + obstacleTwo.height &&
      hero.y + hero.height >= obstacleTwo.y 
     ) {
       hero.y += 10
       hero.x += 5
     } if (
      hero.x + hero.width >= obstacleThree.x &&
      hero.x <= obstacleThree.x + obstacleThree.width &&
      hero.y <= obstacleThree.y + obstacleThree.height &&
      hero.y + hero.height >= obstacleThree.y
     ) {
       hero.x += 10
       hero.y += 10
     }
     if (hero.x >= 100) {//       gravity
       hero.x += 6
     } else if(hero.x >= 200) {
       hero.x += 8
     } else if(hero.x >= 300) {
       hero.x += 10
     } else if(hero.x >= 400) {
       hero.x += 12
     }
  }
  let showtimer = 120
  let clock
  function tick() {
        showtimer --
        document.getElementById('timer').innerText = `Time: ${showtimer}`
      if(showtimer === 0) {
        stopGame()
        winGame()
      }
    }
let gameMessage = document.getElementById("gameStart")
let instructions = document.createElement("body")
instructions.innerHTML = "<p>You are Chihiro, and Noface just ate the medicide from the river spirit.<br> But now, he's projectile vomiting everywhere and hes coming for you!<br> 1. Use EITHER the arrow keys OR the 'w', 'a', 's', 'd' keys to move Chihiro on the board <br> 2. AVOID running into your fellow co-workers, they'll slow you down!<br> 3. SURVIVE 2 minutes without being pushed into Noface to win the game!<br> click ↙️'Start Game'↙️ to begin</p>"
gameMessage.appendChild(instructions); 

function gameStart() { 
  gameMessage.removeChild(instructions)
  clock = setInterval(tick, 1000)
  runGame = setInterval(gameLoop, 60);
}
function myPlayFunction() {
  document.getElementById("top-left").style.animationPlayState = "running";
  document.getElementById("top-right").style.animationPlayState = "running"; 
  canvas.style.animationPlayState = "running"
}
  document.querySelector("button").addEventListener("click", () => {
    gameStart(); 
    myPlayFunction();
  })

function stopGame() {
    clearInterval(runGame)
    document.removeEventListener('keydown', movementHandler)
    clearInterval(clock)
    clearInterval(tick)
    document.querySelector("button").removeEventListener("click", gameStart)
}

function losingGame() {
    stopGame()
    let loser = document.createElement("body")
    loser.innerHTML = "<h1>Oh no!</h1> <p>You've been eaten by Noface! Have fun exploring that esophagus with the foreman.<br> click above to play again</p>"
    gameMessage.appendChild(loser)
    document.getElementById("top-left").style.animationPlayState = "paused";
    document.getElementById("top-right").style.animationPlayState = "paused";
    canvas.style.animationPlayState = "paused"
 }

function winGame() {
  let winMessage = document.createElement("body")
  winMessage.innerHTML = "<h1>GAME WON!</h1><p>you've successfully escaped the bathhouse before Noface caught you! <br>now go return Zenibas golden seal!</p>"
  gameMessage.appendChild(winMessage)
  document.getElementById("top-left").style.animationPlayState = "paused";
  document.getElementById("top-right").style.animationPlayState = "paused";
  canvas.style.animationPlayState = "paused" 
}
