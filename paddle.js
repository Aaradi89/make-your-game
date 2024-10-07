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

}


