import Border from "./border.js";

const border = new Border(document.getElementById("border"))
const borderRect = border.rect() 
export default class Paddle{
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
        
        if (x >= borderRect.left + paddleWidth/2 && x <= borderRect.right - paddleWidth/2){
        this.position = ((x- borderRect.left) / (borderRect.width)) * 100
        
        } else if (x <= borderRect.left + paddleWidth/2){
        this.position = (paddleWidth/2) / (borderRect.width) * 100
        
        }  else if (x >= borderRect.right - paddleWidth/2){
         this.position = (borderRect.width - paddleWidth/2)/ (borderRect.width) * 100
        }
    }
}


