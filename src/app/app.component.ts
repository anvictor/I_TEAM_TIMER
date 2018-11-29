import {
  Component,
  OnInit
} from '@angular/core';
import {interval} from "rxjs";
import {MessageService} from "./message.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private messageService: MessageService) { }
  sendMessage(arr): void {
    this.messageService.sendMessage(arr);
  }

  prevClickTime: any;
  timeHH: string;
  timeMM: string;
  timeSS: string;
  interval: any;
  arrHH = [];
  arrMM = [];
  arrSS = [];
  topHH = -60;
  topMM = -60;
  topSS = -60;


  tics() {
    this.ssIncr();
  }


  ssIncr() {
    this.rotate('SS');
    let min = 0;
    let max = 59;
    let ss = +this.timeSS;
    ss++;
    if (ss > 59) {ss = 0; this.mmIncr(); }
    this.timeSS = this.zeroFirst(ss);
    this.arrSS = this.closeCircle(max, min, this.timeSS);
  }

  mmIncr() {
    this.rotate('MM');
    let min = 0;
    let max = 59;
    let mm = +this.timeMM;
    mm++;
    if (mm > 59) { mm = 0; this.hhIncr(); }
    this.timeMM = this.zeroFirst(mm);
    this.arrMM = this.closeCircle(max, min, this.timeMM);
  }

  hhIncr() {
    this.rotate('HH');
    let min = 0;
    let max = 23;
    let hh = +this.timeHH;
    hh++;
    if (hh > 23) { hh = 0; }
    this.timeHH = this.zeroFirst(hh);
    this.arrHH = this.closeCircle(max, min, this.timeHH);
  }

  rotate(XX){

    for (let i = -60; i < 0; i++){
      setTimeout(() => {
      if (XX === 'SS'){this.topSS = i}
      if (XX === 'MM'){this.topMM = i}
      if (XX === 'HH'){this.topHH = i}
      }, 2);
    }
    setTimeout(() => {
      this.topSS = -60;
      this.topMM = -60;
      this.topHH = -60;
    }, 3);

    console.log('SS: ' + this.topSS);
  }
  startTimer() {
    this.interval = interval(1000).subscribe(x => this.tics());
    document.getElementById('start').setAttribute( "disabled", 'true' );
  }

  stopTimer() {
    this.interval.unsubscribe();
    document.getElementById('start').removeAttribute( "disabled");
  }

  waitTimer() {
    let now: any;
     now = new Date();
    const delta = now - this.prevClickTime;
    this.prevClickTime = new Date();
    if (delta < 300) {
      this.stopTimer();
    }
  }

  resetTimer() {
    this.ngOnInit();
  }


  ngOnInit() {
    this.timeHH = '00';
    this.timeMM = '00';
    this.timeSS = '00';
    this.arrSS = ['58', '59', '00', '01', '02'];
    this.arrMM = ['58', '59', '00', '01', '02'];
    this.arrHH = ['22', '23', '00', '01', '02'];
    this.topSS = -60;
    this.topMM = -60;
    this.topHH = -60;
  }




  zeroFirst(num){
    if(('' + +num).length == 1) {num = '0' + num;} else {num = '' + num;}
    return num;
  }

  closeCircle (max, min, current) {// Генерируем 5 чисел подряд на колесе счетчика. Среднее = текущее
    let arr = [];
    for (let i = (+current - 2); i < +current + 3; i++){
      if (i > max){
        arr.push(i - max + min -1);
      }else if (i < min){
        arr.push(max + i + 1);
      }else{
        arr.push(i);
      }
    }
    for (let i=0; i < 5; i++){
      arr[i] = this.zeroFirst(arr[i]);
    }
    return arr;
  }




}
