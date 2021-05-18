
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

  let obstacle //= [ ]
  let hero = new Crawler(250, 190, 'hotpink', 40, 35);
  let ogre = new Crawler(680, 50, '#BADA55', 100, 300);

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
    const randomY = Math.floor(Math.random()*360)     //console.log(randomY)
    //Math.random() * (max - min) + min;
    //const randomX = Math.floor(Math.random() * (1500 - 1000) + 1000);
    //console.log(randomX)
   // for(i = 0; i < obstacle.length; i += 1) {
     return new Crawler(0, randomY, 'red', 40, 40);
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
    obstacle.x += 15
    if(obstacle.x >= 600) {
      obstacle = createRandomObstacle()
    }
    obstacle.render()
    detectHit()
    hero.render()
  //  hero.newPos()
}

document.addEventListener('keydown', movementHandler);
let runGame = setInterval(gameLoop, 60);

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
        console.log('GAME OVER')
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
     }
    //  if (hero.x >= 100) {
    //    hero.x += 6
    //  } else if(hero.x >= 200) {    <--- gravity for hero
    //    hero.x += 10
    //  } else if(hero.x >= 300) {
    //    hero.x += 15
    //  } else if(hero.x >= 400) {
    //    hero.x += 18
    //  }
  }

