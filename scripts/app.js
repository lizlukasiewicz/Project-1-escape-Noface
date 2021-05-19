
const movementDisplay = document.getElementById('movement')

const canvas = document.getElementById('canvas')
// Set your Context!
const ctx = canvas.getContext('2d')
//**let collision = false**

//ctx.fillRect(10, 10, 100, 100);
//ctx.strokeRect(10, 10, 100, 100);

canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])
//   const ctx = canvas.getContext('2d')

  class Crawler{
    constructor(x, y, color, width, height, gravity) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        //this.alive = true
      }
      render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
      }
  }
  let runGame //= setInterval(gameLoop, 60);
  let hero = new Crawler(250, 190, 'hotpink', 40, 35);
  let ogre = new Crawler(680, 50, '#BADA55', 100, 300);
  let obstacle //= [ ]
  let obstacleTwo
  let obstacleThree

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
  function createRandomObstacle () {
    const randomY = Math.floor(Math.random()*360) + 1
    const randomHeight = Math.floor(Math.random() * 40) + 40     //console.log(randomY)
    //Math.random() * (max - min) + min;
    //const randomX = Math.floor(Math.random() * (1500 - 1000) + 1000);
    //console.log(randomX)
   // for(i = 0; i < obstacle.length; i += 1) {
     return new Crawler(0, randomY, 'red', 40, randomHeight);
   // }
   //  if(obstacle.length < 4){
   //   obstacle.push(new obstacle(0, randomY, 'red', 40, 40))
   //  }
    }
 

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)                //clears the canvas
    move()
    movementDisplay.textContent = `X: ${hero.x} Y: ${hero.y}`       //Display the X and Y coordinates of our hero
    ogre.render()
    if(!obstacle){ //!obstacle
      obstacle = createRandomObstacle()
    }
    obstacle.x += 14
    if(obstacle.x >= 630) {
      obstacle = createRandomObstacle()
    }
    if(!obstacleTwo){ //!obstacle
      obstacleTwo = createRandomObstacle()
    }
    obstacleTwo.x += 12
    if(obstacleTwo.x >= 630) {
      obstacleTwo = createRandomObstacle()
    }
    if(!obstacleThree){ //!obstacle
      obstacleThree = createRandomObstacle()
    }
    obstacleThree.x += 16
    if(obstacleThree.x >= 630) {
      obstacleThree = createRandomObstacle()
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
        // do some game stuff!
        console.log('Losing Game ')
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
       // winGame()
        stopGame()
      }
    }
let gameMessage = document.getElementById("gameStart")
let instructions = document.createElement("body")
instructions.innerHTML = "<p>Success!<br>you got Noface to eat the medicide from the river spirit!<br> but now he's projectile vomiting everywhere and hes coming for you!<br> 1. use either the arrow keys or 'w', 'a', 's', 'd' keys to get away <br> 2. avoid running into your fellow co-workers, they'll slow you down!<br> 3. avoid being pushed into Noface to win the game!<br> click 'Start Game' to begin</p>"
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
 }

//function winGame() {
  //let winMessage = document.createElement("body")
  //winMessage.innerHTML = "<h1>GAME WON!</h1><p>you've successfully escaped the bathhouse before Noface caught you! now go help Haku by returning Zenibas golden seal!</p>"
  //gameMessage.appendChild()
//}
