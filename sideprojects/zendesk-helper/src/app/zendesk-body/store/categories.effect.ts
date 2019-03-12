import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, withLatestFrom, map} from 'rxjs/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';




import * as CategoriesActions from '../store/categories.actions';
import {Category} from '../../shared/category.model';
import * as fromCategories from '../store/categories.reducers';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class CategoryEffects {



  @Effect()
  categoriesFetch = this.actions$.pipe(
    ofType(CategoriesActions.FETCH_CATEGORIES),
    switchMap((action: CategoriesActions.FetchCategories) => {
        return this.afs.collection('category', ref => ref.where('displayed', '==',1)).valueChanges();

    return [];
    }), map(
      (categories) => {
          // console.log(categories)
          // console.log(categories[1].category)
        return {
          type: CategoriesActions.SET_CATEGORIES,
          payload: categories
        };
      }
    ));

    //Store all from previous 
//   @Effect({dispatch: false})
//   recipeStore = this.actions$.pipe(
//     ofType(CategoriesActions.STORE_CATEGORIES)
//     , withLatestFrom(this.store.select('recipes')),
//       switchMap(([action, state]) => {
//         // const req = new HttpRequest('PUT', 'https://angular-http-5db2e.firebaseio.com/recipes.json', state.recipes, {reportProgress: true});
//         // return this.httpClient.request(req);
//         return null
//     })
//   );

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromCategories.State>,
              private afs: AngularFirestore) {
  }
}
