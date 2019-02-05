import { EventEmitter, Injectable } from '@angular/core'
import { Recipe } from "./recipe.model";
import { from } from "rxjs";
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()

export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Tasty Schnitzel', 
        'A great Schnitzel', 
        'https://natashaskitchen.com/wp-content/uploads/2016/02/Pork-Schnitzel-Recipe-7-768x1152.jpg',
        [
            new Ingredient('Meat',1),
            new Ingredient('chips',15)
        ]),
        new Recipe('Big Fat Burger', 
        'What else do I need to say?', 
        'https://storage.googleapis.com/gen-atmedia/3/2018/09/9fbb73a7cba9b7b75c3d05484f6b6d087470641d.jpeg',
        [
            new Ingredient('Meat',3),
            new Ingredient('chips',12)
        ])
    ];

    constructor(private shoppingListService: ShoppingListService){}

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredient:Ingredient[]) {
        this.shoppingListService.addIngredients(ingredient);
    }

}