import {  Injectable } from '@angular/core';
import { Subject, timer, Subscription } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
  })
export class SessionService {

  minutesDisplay = 0;
  secondsDisplay = 0;
  endTime = 1;

  unsubscribe$: Subject<void> = new Subject();
  timerSubscription: Subscription;

  constructor(private authService: AuthService) {
    
  }

  ngOnInit() {
    console.log('User logout in:' + this.minutesDisplay + ' :'+ this.secondsDisplay +'&&'+ this.secondsDisplay+'?'+this.secondsDisplay+ ': 00')
    this.resetTimer();
    this.authService.userActionOccured.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }
      this.resetTimer();
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  session(){
    // session code start here
    this.resetTimer();
    this.authService.userActionOccured.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }
      return this.resetTimer();
      
    });
    // Session code end
  }


  resetTimer(endTime: number = this.endTime) {
    const interval = 1000;
    const duration = endTime * 2700;
    this.timerSubscription = timer(0, interval).pipe(
      take(duration)
    ).subscribe(value =>
      this.render((duration - +value) * interval),
      err => { },
      () => {
        this.authService.logOutUser();
      }
    )
  }

  private render(count) {
    this.secondsDisplay = this.getSeconds(count);
    this.minutesDisplay = this.getMinutes(count);
   //console.log("secondsDisplay = "+ this.secondsDisplay);
   //console.log("minutesDisplay = "+ this.minutesDisplay);
  }

  private getSeconds(ticks: number) {
    const seconds = ((ticks % 60000) / 1000).toFixed(0);
    return this.pad(seconds);
  }

  private getMinutes(ticks: number) {
    const minutes = Math.floor(ticks / 60000);
    return this.pad(minutes);
  }

  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }

}