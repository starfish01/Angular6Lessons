import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, withLatestFrom, map, tap } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';




import * as CategoriesActions from '../store/categories.actions';
import { Category } from '../../shared/category.model';
import * as fromCategories from '../store/categories.reducers';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/auth/user.service';

@Injectable()
export class CategoryEffects {

  //Get Categories
  @Effect()
  categoriesFetch = this.actions$.pipe(
    ofType(CategoriesActions.FETCH_CATEGORIES),
    switchMap((action: CategoriesActions.FetchCategories) => {
      return this.afs.collection('category', ref => ref.where('displayed', '==', 1).where('uID', '==', this.userService.getCurrentUserID())).valueChanges();
    }), map(
      (categories) => {
        return {
          type: CategoriesActions.SET_CATEGORIES,
          payload: categories
        };
      }
    ));

  //Add Category
  @Effect({ dispatch: false })
  cateogryStore = this.actions$.pipe(
    ofType(CategoriesActions.ADD_CATEGORY),
    map((data) => {
      let newCat = Object.assign({}, Object.assign(data).payload)
      let itemKey = this.afs.createId();
      newCat['id'] = itemKey;
      this.afs.collection('category').doc(newCat.id).set(newCat)
        .then()
        .catch((error) => { console.log(error) })
    })
  );

  //Update Category
  @Effect({ dispatch: false })
  categoryUpdate = this.actions$.pipe(
    ofType(CategoriesActions.UPDATE_CATEGORY),
    map((data) => {
      let updatingItem = Object.assign({}, Object.assign(data).payload)
      this.afs.collection('category').doc(updatingItem.id).update(updatingItem)

    })
  );

  //Delete Category
  @Effect({ dispatch: false })
  categoryDelete = this.actions$.pipe(
    ofType(CategoriesActions.DELETE_CATEGORY),
    map((data) => {
      let removingItem = Object.assign(data).payload
      this.afs.collection('category').doc(removingItem).update({ displayed: 0 })
    })
  );


  constructor(private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromCategories.State>,
    private afs: AngularFirestore,
    private af: AuthService,
    private userService: UserService) {
  }
}
