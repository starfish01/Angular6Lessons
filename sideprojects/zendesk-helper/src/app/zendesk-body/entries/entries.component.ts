import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { InformationManagerService } from '../information-manager.service';
import { Entry } from 'src/app/shared/entry.model';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/auth/user.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as EntryActions from './store/entries.actions';

var slugify = require('slugify')

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private iMS: InformationManagerService,
    private userService: UserService,
    private store: Store<fromApp.AppState>) { }

  slug: string;
  categoryID;
  entriesList: Entry[] = [];
  addEntryBool = false;
  loadingEntry = false;

  entrySelected: Entry = null;

  entriesListObservable: Observable<{ entries: Entry[] }>

  catObserv: Observable<any>

  entryExists = false;

  @ViewChild("entry") entryField: ElementRef;


  setEntryExists(value) {
    this.entryExists = value;
  }

  ngOnInit() {
    this.entriesListObservable = this.store.select('entriesData')
    this.store.dispatch(new EntryActions.FetchEntries())

    this.route.params
      .subscribe(
        (params: Params) => {
          this.hasCatSelected(params);
        }
      );
  }

  hasCatSelected(params) {
    this.catObserv = this.store.select(state => state.entriesData.selectedCategory);

    this.catObserv.subscribe((data) => {
      if (data === null) {

        this.router.navigate(['main'])
      }
    }).unsubscribe()

  }




  onTopicSelect(item) {

    this.entrySelected = item;

    this.store.dispatch(new EntryActions.SelectEntry({ index: item }))

    this.router.navigate([item.slug], { relativeTo: this.route, state: { selectedEntry: item } });
  }

  addEntry() {
    this.addEntryBool = true;

    setTimeout(() => {
      this.entryField.nativeElement.focus();
    }, 0.1);
  }

  addEntryItem(value) {

    if (value === '') {
      this.addEntryBool = false;
      return;
    }


    this.addEntryBool = false;
    this.loadingEntry = true;


    let slug = slugify(value)

    let newEntry = new Entry(value, this.getUserID(), slug);

    this.iMS.storeEntry(this.categoryID, newEntry)
      .then((data) => {
        this.loadingEntry = false;
      }).catch((error) => {
        this.loadingEntry = false;
      })
  }




  getUserID() {
    return this.userService.getCurrentUserID();
  }

}
