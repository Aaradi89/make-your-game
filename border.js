export default class Border{
    constructor(borderE){
        this.borderElem = borderE;
    }
rect(){
    return this.borderElem.getBoundingClientRect();
}

}