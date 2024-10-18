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
let gameOn = true;
let mouseX;
let blocks = [];
let lvl = -1;


level(lvl)




function update (time){

if (lastTime != null){
    const delta = time - lastTime;
    ball.update(delta,borderRect,paddle.rect(), blocks); 
}
lastTime = time;

if (score.textContent == (lvl + 2) * 6  && gameOn) { 
Pause()
}


window.requestAnimationFrame(update)
}

window.requestAnimationFrame(update);

document.addEventListener("mousemove", function(m){
mouseX = m.x
   if (gameOn){ 
    paddle.paddleMove(mouseX )
;} 
})

document.addEventListener("keydown", e=>{
    if (e.code === "Space"){
        Pause()
    } 
})


function level(lvl){

    const blockHeight = window.innerHeight*0.02;
    const blockWidth = window.innerWidth*0.1;
    const leftSpace = window.innerWidth*0.05;
    for (let row =1; row <= lvl+2; row++) {
        for (let i = 0; i <6 ; i++) {
           const block = new Block( leftSpace + blockWidth* i, blockHeight * row * 1.5, borderElement)
         blocks.push(block);
        }}
}

function Pause() {
    if (gameOn){
        ball.pause()
        gameOn = false
    } else if (!gameOn){
        ball.resume()
        paddle.paddleMove(mouseX) 
        gameOn = true
    }
    console.log(gameOn)
}
