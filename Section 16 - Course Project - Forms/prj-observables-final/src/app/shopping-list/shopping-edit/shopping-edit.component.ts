import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  
  @ViewChild('form') slForm:NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex:number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index:number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    );
  }

  onAddItem(form:NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(!this.editMode){
      this.slService.addIngredient(newIngredient);
      this.clearForm();
    } else {
      this.slService.updateIngredient(this.editedItemIndex,newIngredient)
      this.clearForm();
    }
  }

  clearForm() {
    this.editMode = false;
    this.editedItemIndex = null;
    this.editedItem = null;
    // this.slForm.reset();
    this.slForm.setValue({
      name:'',
      amount:''
    })
  }

  deleteItem() {
    this.slService.deleteItemFromIngredientsList(this.editedItemIndex);
    this.clearForm();
  }

  addNewItem() {
    this.clearForm();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
