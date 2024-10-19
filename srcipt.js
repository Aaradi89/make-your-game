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
let lvl = -1;
let winCounter;
let gameStart = false; 

level(lvl)




function update (time){

if (lastTime != null){
    const delta = time - lastTime;
    ball.update(delta,border,paddle, blocks); 
}
lastTime = time;

if (score.textContent == winCounter  && gameOn) { 
ball.reset();
gameStart = false; 
lvl++;
level(lvl);
} // to be edited to detect game winning


window.requestAnimationFrame(update)
}

window.requestAnimationFrame(update);

document.addEventListener("mousemove", function(m){
mouseX = m.x
   if (gameOn || !gameStart){ 
    paddle.paddleMove(mouseX )
;} 
})

document.addEventListener("keydown", e=>{
    if (e.code === "Space"){
        Pause()
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
