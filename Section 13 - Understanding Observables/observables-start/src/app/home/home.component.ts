import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription, pipe, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numberObsSubscription: Subscription;
  customObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const myNymber = interval(1000)
      .pipe(map(
        (data: number) => {
          return data * 2;
        }
      ));

    this.numberObsSubscription = myNymber.subscribe(
      (number: number) => {
        console.log(number)
      }
    )

    const myObservale = Observable.create(
      (observer: Observer<string>) => {
        setTimeout(() => { observer.next('first Package') }, 2000);
        setTimeout(() => { observer.next('2nd Package') }, 4000);
        setTimeout(() => { observer.error('ERROR') }, 5000);
      }
    );

    this.customObsSubscription = myObservale.subscribe(
      (data: string) => {
        console.log(data)
      },
      (error: string) => {
        console.log(error)
      }
    )

  }

  ngOnDestroy() {
    this.numberObsSubscription.unsubscribe();
    this.customObsSubscription.unsubscribe();
  }

}
