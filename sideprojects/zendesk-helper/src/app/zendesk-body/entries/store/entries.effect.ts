import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, withLatestFrom, map, tap } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';

import * as EntriesActions from '../store/entries.actions';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/auth/user.service';

@Injectable()
export class EntryEffects {

  //Get Categories
  @Effect()
  entriesFetch = this.actions$.pipe(
    ofType(EntriesActions.FETCH_ENTRIES),
    switchMap((action: EntriesActions.FetchEntries) => {
      return this.afs.collection('entries').valueChanges();
    }), map(
      (entries) => {
        return {
          type: EntriesActions.SET_ENTRIES,
          payload: entries
        };
      }
    ));

  //Add Category
  @Effect({ dispatch: false })
  cateogryStore = this.actions$.pipe(
    ofType(EntriesActions.ADD_ENTRY),
    map((data) => {
      let newEntry = Object.assign({}, Object.assign(data).payload)
      
      newEntry.id = this.afs.createId();

      this.afs.collection('entries').doc(newEntry.id).set(newEntry, { merge: true })
  
    })
  );

  //Update Category
  @Effect({ dispatch: false })
  entryUpdate = this.actions$.pipe(
    ofType(EntriesActions.UPDATE_ENTRY),
    map((data) => {
      let updatingItem = Object.assign({}, Object.assign(data).payload)

      this.afs.collection('entries').doc(updatingItem.id).update(updatingItem)
    })
  );

  //Delete Category
  @Effect({ dispatch: false })
  categoryDelete = this.actions$.pipe(
    ofType(EntriesActions.DELETE_ENTRY),
    map((data) => {
      let removingItem = Object.assign(data).payload

      this.afs.collection('entries').doc(removingItem.id).update({ displayed: 0 })
    })
  );


  constructor(private actions$: Actions,
    private afs: AngularFirestore) {
  }
}
