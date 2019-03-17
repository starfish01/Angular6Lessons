import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, withLatestFrom, map, tap} from 'rxjs/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';




import * as CategoriesActions from '../store/categories.actions';
import {Category} from '../../shared/category.model';
import * as fromCategories from '../store/categories.reducers';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/auth/user.service';

@Injectable()
export class CategoryEffects {



  @Effect()
  categoriesFetch = this.actions$.pipe(
    ofType(CategoriesActions.FETCH_CATEGORIES),
    switchMap((action: CategoriesActions.FetchCategories) => {
        return this.afs.collection('category', ref => ref.where('displayed', '==',1).where('uID','==',this.userService.getCurrentUserID())).valueChanges();
    return [];
    }), map(
      (categories) => {
        return {
          type: CategoriesActions.SET_CATEGORIES,
          payload: categories
        };
      }
    ));

    @Effect({dispatch: false})
    cateogryStore = this.actions$.pipe(
      ofType(CategoriesActions.ADD_CATEGORY),
      map((data) => {       
        let newCat = Object.assign({},Object.assign(data).payload)
        let itemKey = this.afs.createId();
        newCat['id']= itemKey;
        this.afs.collection('categories').doc(newCat.id).set(newCat)
          .then()
          .catch((error)=>{ console.log(error)})
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
