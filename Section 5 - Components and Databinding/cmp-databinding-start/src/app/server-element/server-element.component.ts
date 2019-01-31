import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck, AfterContentChecked, AfterContentInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit,OnChanges,DoCheck,AfterContentChecked,AfterContentInit,OnDestroy {

  @Input('srvElement') element;

  constructor() { 
    console.log('constructor called')
   }

  ngOnInit() {
    console.log('ngOnInit called')
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges Called')
    console.log(changes)
  }

  ngDoCheck(): void {
    console.log('ngDoCheck called')
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called')
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentinit called')
    
  }

  ngOnDestroy() {
    console.log('ngDestory called')
  }

}
