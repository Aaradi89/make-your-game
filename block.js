export default class Block{
    constructor(x, y, borderElement){
        this.block = document.createElement('div');
        this.block.className = 'block';
        this.block.id = 'block';
        this.block.style.left =  x + 'px';
        this.block.style.top = y + 'px';
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