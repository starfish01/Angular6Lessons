import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';
import { AuthService } from "../auth/auth.service";

//https://angular-http-5db2e.firebaseio.com/coureProject

@Injectable()
export class DataStroageService {
    
    constructor(private http: Http, private recipeService: RecipeService,private authService:AuthService){}

    storeRecipes() {
        const token = this.authService.getToken();
        return this.http.put('https://angular-http-5db2e.firebaseio.com/coureProject/recipes.json?auth='+token,this.recipeService.getRecipes());
    }

    getRecipes() {

        const token = this.authService.getToken();

        return this.http.get('https://angular-http-5db2e.firebaseio.com/coureProject/recipes.json?auth='+token)
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