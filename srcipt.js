import Ball from "./ball.js";
import Border from "./border.js";
import Paddle from "./paddle.js";
import Block from "./block.js";

const ball = new Ball(document.getElementById("ball"))
const border = new Border(document.getElementById("border"))
const paddle = new Paddle(document.getElementById("paddle"))
const borderElement = document.getElementById("border")
const score = document.getElementById("score")
const borderRect = border.rect()
const paddleRect = paddle.rect();
let lastTime;
let gameOn = false;
let mouseX;
let blocks = [];
let lvl = 1;
let winCounter;
let gameStart = false;
let gameEnd = false;
let live = 3;
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

if (score.textContent == winCounter  && gameOn && lvl < winGame) { 
ball.reset();
gameStart = false; 
lvl++;
level(lvl);
} // to be edited to detect game winning

if (score.textContent == winCounter  && lvl == winGame && !gameEnd) {
    console.log("game ended");
    Pause();
    winScreen();
}else{
    window.requestAnimationFrame(update)
}
}

window.requestAnimationFrame(update);


// move paddle with mouse

document.addEventListener("mousemove", function(m){
mouseX = m.x
   if (gameOn || !gameStart){ 
    paddle.paddleMove(mouseX )
;} 
})

// use space to pause the game
document.addEventListener("keydown", e=>{
    if (e.code === "Space"){
        Pause()
    } 
    // testing
    if(e.code ==="KeyA"){
        blocks.forEach(element => {
            element.collision()
            console.log("collision")
        });
    }
})


function level(lvl){
    blocks = []
    const blockHeight = 3//window.innerHeight*0.02;
    const blockWidth = 15//window.innerWidth*0.1;
    const leftSpace = 5//window.innerWidth*0.05;
    for (let row =1; row <= lvl+2; row++) {
        for (let i = 0; i <6 ; i++) {
           const block = new Block( leftSpace + blockWidth* i, blockHeight * row * 1.5, borderElement)
         blocks.push(block);
        }
    }
    // creat a couunter to know when is the lvl is finished
    winCounter = parseFloat(score.textContent) + blocks.length;
}

function Pause() {
    if (gameStart){
    if (gameOn){
        ball.pause()
        gameOn = false
    } else if (!gameOn){
        ball.resume()
        paddle.paddleMove(mouseX) 
        gameOn = true
    }
    }
    console.log(gameOn)
}

function start(){

    if (!gameStart){
        gameOn = true;
        ball.start();
        paddle.paddleMove(mouseX); 
    }
    gameStart = true;
}

document.addEventListener("mousedown",e=>{
    if (e.button === 0 ){
        start();
    }
})


function winScreen(){
    const winner = document.createElement("div");
    winner.className = "winner";
    winner.textContent = "WINNER";
    borderElement.appendChild(winner);
    gameEnd = true;
    console.log(gameEnd);
}
