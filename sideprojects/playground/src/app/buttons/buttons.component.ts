import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css'],
})
export class ButtonsComponent implements OnInit {

  switchPosition=false;
  items=10;
  constructor() { }

  ngOnInit() {
  }

  colorSelector(){
    return this.switchPosition ? 'red' : 'blue';
  }

  switchButtonClicked(){
    this.switchPosition = !this.switchPosition
  }

}
