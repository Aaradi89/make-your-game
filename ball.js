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
        this.gameStarted= false;
        //const heading = (2 * Math.PI)/8;
        //this.direction = {x: Math.cos(heading), y: Math.sin(heading)}
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
    

        if (rect.bottom > borderRect.bottom || rect.top < borderRect.top){
           this.y = oldY
            this.direction.y *= -1;
        }

        if (rect.left < borderRect.left || rect.right >borderRect.right){
            this.x = oldX
            this.direction.x *= -1;
        }
        


        if (
            paddleRect.left <= rect.right &&
            paddleRect.right >= rect.left &&
            paddleRect.bottom >= rect.top &&
            paddleRect.top <= rect.bottom){
                
                this.x = oldX
                this.y = oldY

if (this.direction.x > 0 && this.x < paddle.position ){
    this.direction.x *= -1;
    console.log('should change')
} else if (this.direction.x < 0 && this.x > paddle.position ){
    this.direction.x *= -1;
    console.log('should change')
}


                this.direction.y *= -1;
               
            }
        

        if (blocks.some(block =>{
            const blockRect = block.rect();
            if(
            blockRect.left <= rect.right &&
            blockRect.right >= rect.left &&
            blockRect.bottom >= rect.top &&
            blockRect.top <= rect.bottom
            ){
                
                this.x = oldX
                this.y = oldY

                if (blockRect.left >= rect.right &&
                    blockRect.right <= rect.left){
                        this.direction.x *= -1;
                    } else {
                        this.direction.y *= -1;  
                    }

            block.collision()
            }
        })){}
    }
}    