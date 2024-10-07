const INITIAL_VELOCITY = 0.09

export default class Ball{

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

        const heading = (2 * Math.PI)/8;
        this.direction = {x: Math.cos(heading), y: Math.sin(heading)}
       
        this.velocity = INITIAL_VELOCITY
    }

    update(delta, borderRect, paddleRect){
        this.x +=  this.direction.x * this.velocity * delta;
        this.y +=  this.direction.y * this.velocity * delta;

        const rect = this.rect();

        if (rect.bottom >= borderRect.bottom || rect.top <= borderRect.top){
            this.direction.y *= -1;
        }
const hieght = (paddleRect.bottom - paddleRect.top)/2
        if (rect.left <= borderRect.left || rect.right >=borderRect.right){
            this.direction.x *= -1;
        }
        
        if (
            paddleRect.left <= rect.right &&
            paddleRect.right >= rect.left &&
            paddleRect.bottom >= rect.top &&
            paddleRect.top + hieght <= rect.bottom){
                this.direction.y *= -1;
                this.direction.x *= -1;
            }

        if (
            paddleRect.left <= rect.right &&
            paddleRect.right >= rect.left &&
            paddleRect.bottom - hieght >= rect.top &&
            paddleRect.top <= rect.bottom){
                this.direction.y *= -1;
            }
    }
}    