import Ball from "./ball.js";
import Border from "./border.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball"))
const border = new Border(document.getElementById("border"))
const paddle = new Paddle(document.getElementById("paddle"))
const borderRect = border.rect()
const paddleRect = paddle.rect();
let lastTime;

function update (time){
if (lastTime != null){
    const delta = time - lastTime;
    ball.update(delta,borderRect,paddle.rect());
}
lastTime = time;


window.requestAnimationFrame(update)
}

window.requestAnimationFrame(update);

document.addEventListener("mousemove", function(m){
   
    const paddleWidth = paddleRect.width

    if (m.x >= borderRect.left + paddleWidth/2 && m.x <= borderRect.right - paddleWidth/2){
    paddle.position = ((m.x- borderRect.left) / (borderRect.width)) * 100
    
    } else if (m.x <= borderRect.left + paddleWidth/2){
    paddle.position = (paddleWidth/2) / (borderRect.width) * 100
    
    }  else if (m.x >= borderRect.right - paddleWidth/2){
    paddle.position = (borderRect.width - paddleWidth/2)/ (borderRect.width) * 100
    }
})