export default class Timer {
constructor(timerElem){
this.timerElem = timerElem;
this.timerOn = false;
this.hour = 0;
this.minute = 0;
this.second = 0;
this.millisecond = 0;
}

start(){
    

     if (!this.timerOn){
        this.timerOn = true;
     this.int = setInterval(() => {
        this.millisecond += 10;
        if (this.millisecond == 1000){
        this.second += 1;
        this.millisecond = 0;
        if (this.second == 60) {
            this.minute += 1;
            this.second = 0;
            if (this.minute == 60) {
                this.hour += 1;
                this.minute = 0;
                if (this.hour == 100){
                    this.hour = 0;
                }
            }
        }
    }

        let h = this.hour < 10 ? "0" + this.hour : this.hour;
        let m = this.minute < 10 ? "0" + this.minute : this.minute;
        let s = this.second < 10 ? "0" + this.second : this.second;

        this.timerElem.innerHTML =`${h} : ${m} : ${s}`
       }, 10);
    }

    
 }


pause(){
    clearInterval(this.int)
    this.timerOn = false;

}

reset(){

this.hour = 0;
this.minute = 0;
this.second = 0;
this.timerElem.innerHTML =`${h} : ${m} : ${s}`
}

}

