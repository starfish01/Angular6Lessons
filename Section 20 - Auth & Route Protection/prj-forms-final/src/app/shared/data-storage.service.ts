import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

//https://angular-http-5db2e.firebaseio.com/coureProject

@Injectable()
export class DataStroageService {
    
    constructor(private http: Http, private recipeService: RecipeService){}

    storeRecipes() {
        return this.http.put('https://angular-http-5db2e.firebaseio.com/coureProject/recipes.json',this.recipeService.getRecipes());
    }

    getRecipes() {
        return this.http.get('https://angular-http-5db2e.firebaseio.com/coureProject/recipes.json')
        .pipe(map(
            (res) => {
                const data: Recipe[] = res.json()
                for(let recipe of data) {
                    if(!recipe['ingredients']) {
                        recipe['ingredients'] = []
                    }
                }
                return data;
            },
            (err) => {
                return Observable.throw("Something went wrong")
            }
        ))
    }

}