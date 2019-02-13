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

  constructor(private dSS: DataStroageService, private recipeService:RecipeService) { }

  saveRecipes() {
    this.dSS.storeRecipes().subscribe(
      (res) => {
        console.log('Stored')
      },
      (error) => {
        console.log('Error')
      }
    );
  }

  getRecipes() {
    this.dSS.getRecipes().subscribe(
      (resipes:Recipe[]) => {

        this.recipeService.resetRecipesWithNewData(resipes);

        console.log(resipes)
        
      },
      (error) => {
        console.log(error)

      }
    )

  }



}
