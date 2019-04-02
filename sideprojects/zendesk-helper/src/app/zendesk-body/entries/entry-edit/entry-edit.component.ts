import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { InformationManagerService } from '../../information-manager.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/auth/user.service';
import { Entry } from 'src/app/shared/entry.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';

import * as EntryActions from '../store/entries.actions';





@Component({
    selector: 'app-entry-edit',
    templateUrl: './entry-edit.component.html',
    styleUrls: ['./entry-edit.component.scss']
})
export class EntryEditComponent implements OnInit {

    constructor(private route: ActivatedRoute,
        private router: Router,
        private db: AngularFireModule,
        private store: Store<fromApp.AppState>,
        private iMS: InformationManagerService,
        private authService: AuthService, private userService: UserService) { }

    slug: string;
    entry: Entry;

    editEntrySelected: Observable<Entry>

    entryUpdateForm: FormGroup;

    ngOnInit() {


        this.route.params
            .subscribe(
                (params: Params) => {



                    this.editEntrySelected = this.store.select(state => state.entriesData.selectedEntry);
                    this.editEntrySelected.subscribe((data) => {
                        this.entry = data;
                    }).unsubscribe();



                    // this.slug = params.id
                    // this.entry = this.iMS.getEntrySelected();
                    // if (this.entry == null) {
                    //   this.router.navigate(['main']);
                    // } else {
                    this.initForm();
                    //   // this.getEntry();
                    // }
                }
            );
    }

    private initForm() {
        let title = '';
        let content = '';
        const entry = this.entry.id;
        title = this.entry.title;
        content = this.entry.content;

        this.entryUpdateForm = new FormGroup({
            'title': new FormControl(title, Validators.required),
            'content': new FormControl(content, Validators.required)
        })
    }

    onSubmit() {

        this.entry = {
            ...this.entry,
            ...this.entryUpdateForm.value
        }

        this.store.dispatch(new EntryActions.UpdateEntry(this.entry))

        this.router.navigate(['../'], { relativeTo: this.route })
    }

    deleteEntry() {
        this.store.dispatch(new EntryActions.DeleteEntry(this.entry))
        this.redirectAfterChange()
        this.entry = null
    }

    redirectAfterChange() {
        this.router.navigate(['../../'], { relativeTo: this.route })
    }

    cancelEntryChanges() {
        this.router.navigate(['../'], { relativeTo: this.route })
    }

}
