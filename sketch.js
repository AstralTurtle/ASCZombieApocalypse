// declare global variables
let state = 0;
// state list
// state 0 - Main Menu/Difficulty Select
// State 1 - Game
//
let myXPos = 250;
let myYPos = 250;
let enemyXPos = 300;
let enemyYPos = 300;
let time = 0;
let myLeft, myRight, myTop, myBottom;
let enemyLeft, enemyRight, enemyTop, enemyBottom;

let score = 0;
let playerImage;
let zombieImage;
let fieldImage;
let zombieArray = [];
let zombieCountMax = 5;

function preload() {
  playerImage = loadImage("player.png");
  zombieImage = loadImage("zombie1.png");
  fieldImage = loadImage("field.jpg")
}

function setup() {
  createCanvas(500, 500);
  background(0);
  imageMode(CENTER);
    frameRate(30)
}

function draw() {
  if (state == 0) {
    background(0);
    image(fieldImage, 250, 250, 500, 500)
    rectMode(CENTER);
    textAlign(CENTER);
    // draw title
    fill(0);
    textSize(50);
    text("Zombie Apocalypse", 250, 100);
    textSize(32);
    // crate easy mode button
    // draw green box
    fill(0, 255, 0);
    rect(250, 200, 250, 50);
    // draw text
    fill(0);
    text("Easy", 250, 210);
    // create normal mode button
    // draw yellow box
    fill(255, 255, 0);
    rect(250, 300, 250, 50);
    // draw text
    fill(0);
    text("Normal", 250, 310);

    // create hard mode button
    // draw red box
    fill(255, 0, 0);
    rect(250, 400, 250, 50);
    // draw text
    fill(0);
    text("Hard", 250, 410);
  }
  if (state == 1) {
    background(0);
    image(fieldImage, 250, 250, 500, 500)
    // stop player from leaving map
    if (myLeft < 0) {
      myXPos += 5;
    }
    if (myRight > 500) {
      myXPos -= 5;
    }
    if (myTop < 0) {
      myYPos += 5;
    }
    if (myBottom > 500) {
      myYPos -= 5;
    }
    // not MVP, put off for now
    //  MAP WITH WALLS
    // rect(50, 50, 50, 200);
    // rect(50, 200, 200, 50);
    // rect(350, 200, 150, 50);
    // rect(300, 50, 100, 100);
    // rect(100, 350, 100, 100);
    // detect player and
    
    let resultX = cornerSpawnerX(0, 500);
    let resultY = cornerSpawnerY(0, 500);
    for (let i = 0; i < zombieCountMax; i++) {
      let temp = new Zombie(resultX, resultY, 10);
      zombieArray.push(temp);
    }

    for (let i = 0; i < zombieArray.length; i++) {
      image(zombieImage, zombieArray[i].xPos, zombieArray[i].yPos, 30, 30);

      if (resultX == 0 && resultY == 0) {
        zombieArray[i].xPos += zombieArray[i].speedValue;
        zombieArray[i].yPos += zombieArray[i].speedValue;
      }
      if (resultX == 0 && resultY == 500) {
        zombieArray[i].xPos += zombieArray[i].speedValue;
        zombieArray[i].yPos -= zombieArray[i].speedValue;
      }
      if (resultX == 500 && resultY == 0) {
        zombieArray[i].xPos -= zombieArray[i].speedValue;
        zombieArray[i].yPos += zombieArray[i].speedValue;
      }
      if (resultX == 500 && resultY == 500) {
        zombieArray[i].xPos -= zombieArray[i].speedValue;
        zombieArray[i].yPos -= zombieArray[i].speedValue;
      }
    }
    
     for (let i = 0; i < zombieArray.length; i++) {
        // bounce zombies
        if (zombieArray[i].enemyLeft < 0) {
            zombieArray[i].direction *= 1;
        }
        if (zombieArray[i].enemyRight > 500) {
            zombieArray[i].direction *= -1;
        }
        if (zombieArray[i].enemyTop < 0) {
            zombieArray[i].direction *= 1;
        }
        if (zombieArray[i].enemyBottom > 500) {
            zombieArray[i].direction *= -1;
        }
        
        // decrease life
        zombieArray[i].life -= 1;
        // test life
        zombieArray[i].testLife(i);
    }
    if (time % 30 == 0){
        zombieCountMax += 1;
        score++;
    }
    time++;
    
    
    
  

  if (state != 0) {
    textSize(25);
    text("Score: " + score, 50, 50);
    
    
  }



  // Players movement (ArrowKeys)
  if (keyIsDown(LEFT_ARROW)) {
    myXPos -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    myXPos += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    myYPos -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    myYPos += 5;
  }

  myLeft = myXPos - 25;
  myRight = myXPos + 25;
  myTop = myYPos - 25;
  myBottom = myYPos + 25;

  
  image(playerImage, myXPos, myYPos, 30, 30);
}
}

function mouseClicked() {
  if (state == 0) {
    // detect if mouse is on easy button
    if (mouseX > 125 && mouseX < 375 && mouseY > 175 && mouseY < 225) {
      // change state
      state = 1;
      // set difficulty
      difficulty = 1;
    }
    // detect if mouse is on normal button
    if (mouseX > 125 && mouseX < 375 && mouseY > 275 && mouseY < 325) {
      // change state
      state = 1;
      // set difficulty
      difficulty = 2;
    }
    // detect if mouse is on hard button
    if (mouseX > 125 && mouseX < 375 && mouseY > 375 && mouseY < 425) {
      // change state
      state = 1;
      // set difficulty
      difficulty = 3;
    }
  }
}

function cornerSpawnerX(num1, num2) {
  let randomValue = Math.random();
  if (randomValue < 0.5) {
    return num1;
  } else {
    return num2;
  }
}

function cornerSpawnerY(num1, num2) {
  let randomValue = Math.random();
  if (randomValue < 0.5) {
    return num1;
  } else {
    return num2;
  }
}


class Zombie {
  constructor(x, y, speed,life) {
    this.xPos = x;
    this.yPos = y;
    this.speedValue = speed;
    this.direction = 1;
    this.enemyLeft = this.xPos - 15;
    this.enemyRight = this.xPos + 15;
    this.enemyTop = this.yPos - 15;
    this.enemyBottom = this.yPos + 15;
    this.life = 300 * difficulty;
  }
  testLife(index){
    if (this.life <= 0) {
      zombieArray.splice(index, 1);
    }
    }
}
