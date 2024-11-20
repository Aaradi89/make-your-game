// <-------| Timer Class |-------->
class Timer {
    constructor(timerElem){
    this.timerElem = timerElem;
    this.timerOn = false;
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.millisecond = 0;
    }
    
    start(){
        
    
         if (!this.timerOn){
            this.timerOn = true;
         this.int = setInterval(() => {
            this.millisecond += 10;
            if (this.millisecond == 1000){
            this.second += 1;
            this.millisecond = 0;
            if (this.second == 60) {
                this.minute += 1;
                this.second = 0;
                if (this.minute == 60) {
                    this.hour += 1;
                    this.minute = 0;
                    if (this.hour == 100){
                        this.hour = 0;
                    }
                }
            }
        }
    
            let h = this.hour < 10 ? "0" + this.hour : this.hour;
            let m = this.minute < 10 ? "0" + this.minute : this.minute;
            let s = this.second < 10 ? "0" + this.second : this.second;
    
            this.timerElem.innerHTML =`${h} : ${m} : ${s}`
           }, 10);
        }
    
        
     }
    
    
    pause(){
        clearInterval(this.int)
        this.timerOn = false;
    
    }
    
    reset(){
    
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.timerElem.innerHTML =`${h} : ${m} : ${s}`
    }
    
    }
    
// <-------| Border Class |-------->
class Border{
    constructor(borderE){
        this.borderElem = borderE;
    }
rect(){
    return this.borderElem.getBoundingClientRect();
}

}

// <-------| Block Class |-------->
class Block{
    constructor(x, y, borderElement){
        this.block = document.createElement('div');
        this.block.className = 'block';
        this.block.id = 'block';

        this.block.style.left =  x + '%';
        this.block.style.top = y + '%';
        borderElement.appendChild(this.block);

    }
    rect(){
        return this.block.getBoundingClientRect();
    }

    
    collision(){
        const score = document.getElementById('score');
        score.textContent = parseInt(score.textContent) + 1
        this.block.remove()
    }
}

// <-------| Ball Class |-------->
class Ball{

    constructor(ballElem){
    this.ballElem = ballElem
    this.reset()
    }

    get x(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
    }

    set x(value){
        this.ballElem.style.setProperty("--x", value);
    }

    get y(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
    }

    set y(value){
        this.ballElem.style.setProperty("--y", value);
    }

    rect(){
        return this.ballElem.getBoundingClientRect();
    }

    reset(){
        this.x= 53;
        this.y= 2;
        this.gameStarted= false;
        this.direction = {x:0, y:0}
        this.velocity = INITIAL_VELOCITY
    }

    start(){
        this.gameStarted = true;
        const heading = (2 * Math.PI)/8;
        this.direction = {x: Math.cos(heading), y: Math.sin(heading)}
    }

    pause(){
        this.oldDirection = this.direction
        this.direction = {x:0, y:0}
    }

    resume(){
        this.direction = this.oldDirection
    }

    update(delta, border, paddle, blocks){
        const paddleRect = paddle.rect()
        const borderRect =  border.rect()
        const oldX = this.x
        const oldY = this.y 

        this.x +=  this.direction.x * this.velocity * delta;
        this.y +=  this.direction.y * this.velocity * delta;

        const rect = this.rect();
        
        if (!this.gameStarted){
            this.x = paddle.position + 3
        }
    

        if ( rect.top < borderRect.top){

            this.y = oldY
            this.direction.y *= -1;

         }else if (rect.left < borderRect.left || rect.right >borderRect.right){

            this.x = oldX
            this.direction.x *= -1;

        } else  if (rect.bottom > borderRect.bottom){

            this.reset();
            const lives = document.getElementById("lives");
            lives.textContent = parseInt(lives.textContent) - 1
        }
        

        if (
            paddleRect.left <= rect.right &&
            paddleRect.right >= rect.left &&
            paddleRect.bottom >= rect.top &&
            paddleRect.top <= rect.bottom){
                

                // testing
                // Adjust ball position to prevent it from getting stuck
    if (this.direction.x > 0 && this.x < paddle.position) {
        this.x = paddleRect.left - rect.width;
    } else if (this.direction.x < 0 && this.x > paddle.position) {
        this.x = paddleRect.right;
    }

                // testing



                this.x = oldX
                this.y = oldY

if (this.direction.x > 0 && this.x < paddle.position ){
    this.direction.x *= -1;
    
} else if (this.direction.x < 0 && this.x > paddle.position ){
    this.direction.x *= -1;
    
}


                this.direction.y *= -1;
               
            }
        
            // change direction when colliding with blocks and destroy the block
        if (blocks.some(block => {
            const blockRect = block.rect();
            if (
                blockRect.left <= rect.right &&
                blockRect.right >= rect.left &&
                blockRect.bottom >= rect.top &&
                blockRect.top <= rect.bottom
            ) {
                this.x = oldX;
                this.y = oldY;
        
                // Determine the collision side
                const overlapLeft = rect.right - blockRect.left;
                const overlapRight = blockRect.right - rect.left;
                const overlapTop = rect.bottom - blockRect.top;
                const overlapBottom = blockRect.bottom - rect.top;
        
                const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
        
                if (minOverlap === overlapLeft || minOverlap === overlapRight) {
                    // Side collision
                    this.direction.x *= -1;
                } else {
                    // Top or bottom collision
                    this.direction.y *= -1;
                }
        
                block.collision();
                return true; // Exit the loop after handling the collision
            }
        })) {}
        
        
    }
}    

// <-------| Paddle Class |-------->

class Paddle{
    constructor(paddleE){
        this.paddleElem = paddleE
    }

    rect(){
        return this.paddleElem.getBoundingClientRect();
    }

    get position(){
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"))
    }
    set position(value){
        this.paddleElem.style.setProperty("--position", value)
    }
    get width(){
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--width"))
    }
    set width(value){
        this.paddleElem.style.setProperty("--width", value)
    }

    

    paddleMove(x){
        const paddleWidth = this.rect().width
        const borderRect = border.rect()
        
        if (x >= borderRect.left + paddleWidth/2 && x <= borderRect.right - paddleWidth/2){
        this.position = ((x- borderRect.left) / (borderRect.width)) * 100
        
        } else if (x <= borderRect.left + paddleWidth/2){
        this.position = (paddleWidth/2) / (borderRect.width) * 100
        
        }  else if (x >= borderRect.right - paddleWidth/2){
         this.position = (borderRect.width - paddleWidth/2)/ (borderRect.width) * 100
        }
    }
}

// <-------| FPS Meter |-------->
let lastFrameTime = performance.now();
let fpsDisplay = document.getElementById("fps");
let smoothedFPS = 60; // Initial guess for FPS
const smoothingFactor = 0.1; // Adjust between 0 (no smoothing) and 1 (very smooth)

// Function to update FPS using EMA
function updateFPS() {
    const currentFrameTime = performance.now();
    const delta = currentFrameTime - lastFrameTime;
    const fps = 1000 / delta;

    // Apply exponential moving average
    smoothedFPS = (fps * smoothingFactor) + (smoothedFPS * (1 - smoothingFactor));
    fpsDisplay.textContent = Math.round(smoothedFPS);

    // Update last frame time
    lastFrameTime = currentFrameTime;

    // Request the next animation frame
    requestAnimationFrame(updateFPS);
}

// Start the FPS calculation loop
    requestAnimationFrame(updateFPS);


// <-------| Game Logic |-------->
let currentLevel = 1;
const INITIAL_VELOCITY = 0.09
const ball = new Ball(document.getElementById("ball"))
const border = new Border(document.getElementById("border"))
const paddle = new Paddle(document.getElementById("paddle"))
const borderElement = document.getElementById("border")
const timer = new Timer(document.getElementById("timer"))
const score = document.getElementById("score")
const lives = document.getElementById("lives")
const popup = document.getElementById("popup")
let currentLives = parseInt(lives.textContent)
let startPopup = false
let lastTime;
let gameOn = false;
let mouseX;
let blocks = [];
let lvl = 1;
let winCounter;
let gameStart = false;
let gameEnd = false;
const winGame = 3;

// add block to the board
level(lvl)



// game loop logic
function update (time){

if (lastTime != null){
    const delta = time - lastTime;
    ball.update(delta,border,paddle, blocks); 
}
lastTime = time;

// invoke new game if player destroy all bircks
if (score.textContent == winCounter  && gameOn && lvl < winGame) {
ball.reset();
gameStart = false; 
lvl++;
level(lvl);
} 


// reset paddle and ball state when losing live
if (currentLives > parseInt(lives.textContent)){
    ball.reset();
    gameStart = false;
    currentLives = parseInt(lives.textContent);
} 

// detect winning of losing game according to live lose of final level reached
if (score.textContent == winCounter  && lvl == winGame && !gameEnd) {
    
    win();
}else if (lives.textContent == 0){
    
    gameOver();
} else {
    window.requestAnimationFrame(update) // game running loop
}
}


window.requestAnimationFrame(update); //start game loop




// move paddle with mouse x
document.addEventListener("mousemove", function(m){
mouseX = m.x
   if (gameOn || !gameStart){ 
    if (!gameEnd){
    paddle.paddleMove(mouseX)
    }
;} 
})

// use space to pause the game
document.addEventListener("keydown", e=>{
    if (e.code === "Space"){
        Pause()
    } 
    // testing use A botton break all bircks (fire ball and press A before hitting any bircks)
    if(e.code ==="KeyA"){
        blocks.forEach(element => {
            element.collision()
            
        });
    }
})

// add blocks to the board
function level(lvl) {
    blocks = [];
    const blockHeight = 3;  // % of screen height
    const blockWidth = 15;  // % of screen width
    const leftSpace = 5;    // % of screen width

    // Loop to create blocks based on the level
    for (let row = 1; row <= lvl + 2; row++) {
        for (let i = 0; i < 6; i++) {
            const block = new Block(leftSpace + blockWidth * i, blockHeight * row * 1.5, borderElement);
            blocks.push(block);
        }
    }

    // Create a counter to track when the level is finished
    winCounter = parseFloat(score.textContent) + blocks.length;

    // Update the current level and display it in HTML
    currentLevel = lvl;
    updateLevelDisplay();
}
// pause and unpase game using Space bar
function Pause() {
    if (gameStart){
    if (gameOn){
        document.querySelector(".pause").style.display = "flex";
        timer.pause();
        ball.pause();
        gameOn = false

    }
    }
    
}

// function to stop everything and show the popup to restart the game for losing - alalaradi
function gameOver(){
    if (lives.textContent == 0){
        timer.pause();
        ball.ballElem.remove();
        document.querySelector(".popup.restart").style.display = "flex";;
        gameEnd = true;
    }
}

// function to stop everything and show the popup to restart the game for winning - alalaradi
function win(){
    if (score.textContent == winCounter){
        timer.pause();
        ball.ballElem.remove();
        document.querySelector(".popup.win").style.display = "flex";;
        gameEnd = true;
    }
}


// // detect score and update level accordingly.
// if (score.textContent < 18  && !gameEnd) {
// level.textContent = 1;
// }else if (lives.textContent >= 18 && !gameEnd){
//     level.textContent = 2;
// } else {
//     level.textContent = 3;
// }


// detect if the game started or not to allow paddle more and lunch the ball
function start(){
    if (!gameStart){
        gameOn = true;
        ball.start();
        paddle.paddleMove(mouseX); 
        timer.start();
            
    }
    gameStart = true;
}


// use mouse left click to fire the ball
document.addEventListener("mousedown",e=>{
    if (e.button === 0 && lives.textContent != 0 ){
        if (startPopup){
        start();
        }else {
            startPopup = true;
            popup.style.display = "none";
        }
    }
})

// popup.addEventListener("click",e=>{
//     startPopup = true;
//     popup.style.display = "none";
// })


// add a winning or losing statment in the middle of the screen
function endScreen(states){
    const endingStatus = document.createElement("div");
    endingStatus.className = "ending";
    endingStatus.textContent = states;
    borderElement.appendChild(endingStatus);
    ball.ballElem.remove();
    gameEnd = true;
    

}

//continue
document.getElementById("continue").addEventListener("click",e=>{
    ball.resume();
    timer.start();
    paddle.paddleMove(mouseX) 
    gameOn = true
    document.querySelector(".pause").style.display = "none";
})

//restart game for pause menu

document.getElementById("restart").addEventListener("click",e=>{
    location.reload();
})


//restart game for game over menu - alalaradi
document.getElementById("gameOverRestart").addEventListener("click",e=>{
    location.reload();
})

//restart game for win menu - alalaradi
document.getElementById("winRestart").addEventListener("click",e=>{
    location.reload();
})

//refresh page by clicking refresh button
document.getElementById("refresh").addEventListener("click",e=>{
    location.reload();
})

function updateLevelDisplay() {
    document.getElementById("level").textContent = currentLevel;
}



