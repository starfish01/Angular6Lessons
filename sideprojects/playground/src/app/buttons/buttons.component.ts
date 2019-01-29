import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css'],
})
export class ButtonsComponent implements OnInit {

  switchPosition=false;
  items=[1,2,1,2,1,2,1,2];
  constructor() { }

  arrayButtonClicked(val){
    alert(val)
  }

  ngOnInit() {
  }

  colorSelector(){
    return this.switchPosition ? 'red' : 'blue';
  }

  switchButtonClicked(){
    this.switchPosition = !this.switchPosition
  }

}
