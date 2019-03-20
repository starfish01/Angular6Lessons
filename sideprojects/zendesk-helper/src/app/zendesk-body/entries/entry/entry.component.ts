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


      //working here at the moment
     this.router.getCurrentNavigation().extras.state.selectedEntry

    }

    entriesListObservable: Observable<{entries:Entry[]}>

    slug = null;
    entry: Entry = null;
    copyButtonText = 'Copy';

  ngOnInit() {


    this.route.params
      .subscribe(
        (params: Params) => {

          this.entriesListObservable = this.store.select('entriesData')

          // console.log(this.router)

          // this.store.dispatch(new EntryActions.SelectEntry().payload.index)

    
        
          this.slug = params

          // console.log(this.slug)

          // this.entry = this.iMS.getEntrySelected();
          // if(this.entry == null) {
          //   this.router.navigate(['main']);
          // } else {
          //   // this.getEntry();
          // }

          this.getEntryData();

        }
      );
  }

  getEntryData(){

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
