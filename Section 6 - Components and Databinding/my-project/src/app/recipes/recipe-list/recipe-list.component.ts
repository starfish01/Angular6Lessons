import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

@Output() recipeItemClickedData = new EventEmitter;
  
  recipes: Recipe[] = [
    new Recipe('A test Recipe','this is a test','https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/IMG_1105.jpg'),
    new Recipe('A test Recipe2','this is a test2','https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/IMG_1105.jpg')
  ];

  passItemClicked(itemClicked) {
    this.recipeItemClickedData.emit(itemClicked)
  }

  constructor() { }

  ngOnInit() {
  }

}
