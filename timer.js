export default class Timer {
constructor(timerElem){
this.timerElem = timerElem;
this.timarOn = true;
this.hour = 0;
this.minute = 0;
this.second = 0;
}

start(){
    if (this.timarOn){
       this.int = setInterval(() => {
        this.second += 1;
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

        let h = this.hour < 10 ? "0" + this.hour : this.hour;
        let m = this.minute < 10 ? "0" + this.minute : this.minute;
        let s = this.second < 10 ? "0" + this.second : this.second;

        this.timerElem.innerHTML =`${h} : ${m} : ${s}`
       }, 1000);
    }
    
}

}
