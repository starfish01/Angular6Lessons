import { Component, OnInit } from '@angular/core';
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




@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private store: Store<fromApp.AppState>,
    private _clipboardService: ClipboardService) { }

    entriesListObservable: Observable<{entries:Entry[]}>

    slug:string = null;
    entry: Entry = null;
    copyButtonText = 'Copy';

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {

          this.entriesListObservable = this.store.select('entriesData')

          this.entriesListObservable.subscribe((data)=>{
            console.log(data.selectedEntry)
          })


          // this.store.dispatch(new EntryActions.SelectEntry().payload.index)

        
          // this.slug = params.id
          // this.entry = this.iMS.getEntrySelected();
          // if(this.entry == null) {
          //   this.router.navigate(['main']);
          // } else {
          //   // this.getEntry();
          // }
        }
      );
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
