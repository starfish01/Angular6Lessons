import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { InformationManagerService } from '../../information-manager.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/auth/user.service';
import { Entry } from 'src/app/shared/entry.model';

import { ClipboardService } from 'ngx-clipboard'
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducers';

import * as EntryActions from '../store/entries.actions';
import { Observable } from 'rxjs';
import { take, first } from 'rxjs/operators';




@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  @Input('entrySelected') element; 



  constructor(private route: ActivatedRoute, 
    private router: Router,
    private store: Store<fromApp.AppState>,
    private _clipboardService: ClipboardService) { 

     this.router.getCurrentNavigation().extras.state.selectedEntry

    }

    entriesListObservable: Observable<Entry>
    selectedEntry:Entry;

    slug = null;
    entry: Entry = null;
    copyButtonText = 'Copy';

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {

          this.entriesListObservable = this.store.select(state => state.entriesData.selectedEntry);
          this.entriesListObservable.subscribe((data)=>{
            this.selectedEntry = data;
          }).unsubscribe();
        
          // this.entry = this.iMS.getEntrySelected();
          // if(this.entry == null) {
          //   this.router.navigate(['main']);
          // } else {
          //   // this.getEntry();
          // }

          this.getEntryData(params.id);

        }
      );
  }

  getEntryData(entryID){

  //  this.store.dispatch(new EntryActions.SelectEntry(entryID))

  //  let counter = this.store.select(state => state.entriesData.selectedEntry);

  //  console.log(counter)


    // this.entriesListObservable.subscribe((data)=>{
    //   console.log(data)
    // })
  }


  copyToClipboard() {
    this._clipboardService.copyFromContent(this.entry.content)
    this.copyButtonText = 'Copied!'

    setTimeout(() => {
      this.copyButtonText = 'Copy'
    }, 2000);

  }


  editEntry(){
    this.router.navigate(['edit'], {relativeTo: this.route})
  }
}
