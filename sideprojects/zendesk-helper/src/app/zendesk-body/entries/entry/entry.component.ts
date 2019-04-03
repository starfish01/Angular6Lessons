import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Entry } from 'src/app/shared/entry.model';

import { ClipboardService } from 'ngx-clipboard'
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  @Input('entrySelected') element;

  textArea: string;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private _clipboardService: ClipboardService) {
  }

  entriesListObservable: Observable<Entry>
  selectedEntry: Entry;

  entry: Entry = null;
  copyButtonText = 'Copy';

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {

          this.entriesListObservable = this.store.select(state => state.entriesData.selectedEntry);
          this.entriesListObservable.subscribe((data) => {
            this.selectedEntry = data;
          }).unsubscribe();

          if (this.selectedEntry == null) {

          } else {
            this.textArea = this.selectedEntry.content;
          }
        }
      );
  }

  copyToClipboard() {

    this._clipboardService.copyFromContent(this.textArea)
    this.copyButtonText = 'Copied!'

    setTimeout(() => {
      this.copyButtonText = 'Copy'
    }, 2000);

  }

  editEntry() {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }
}
