import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputValue;
  @ViewChild('amountInput') amountInputValue;

  @Output() shoppingListItemToAdd = new EventEmitter(); 


  constructor() { }

  ngOnInit() {
  }

  addIngredient() {
    const name = this.nameInputValue.nativeElement.value === null ? '' : this.nameInputValue.nativeElement.value; 
    const amount = this.amountInputValue.nativeElement.value

    if(name === '' || amount <= 0) {
      return;
    }

    this.shoppingListItemToAdd.emit({name:name,amount:amount})

  }

}
