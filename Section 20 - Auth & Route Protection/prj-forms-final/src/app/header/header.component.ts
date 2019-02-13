import { Component } from '@angular/core';
import { DataStroageService } from '../shared/data-storage.service';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  loadingData =false;

  constructor(private dSS: DataStroageService, private recipeService:RecipeService) { }

  saveRecipes() {
    this.loadingData = true 
    this.dSS.storeRecipes().subscribe(
      (res) => {
        this.loadingData = false
      },
      (error) => {
        this.loadingData = false
      }
    );
  }

  getRecipes() {
    this.loadingData = true 
    this.dSS.getRecipes().subscribe(
      (resipes:Recipe[]) => {
        this.recipeService.resetRecipesWithNewData(resipes);
        this.loadingData = false
      },
      (error) => {
        console.log(error)
        this.loadingData = false
      }
    )

  }



}
