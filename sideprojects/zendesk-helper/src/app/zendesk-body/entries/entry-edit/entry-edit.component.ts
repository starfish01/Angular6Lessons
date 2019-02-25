import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { InformationManagerService } from '../../information-manager.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/auth/user.service';
import { Entry } from 'src/app/shared/entry.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-entry-edit',
  templateUrl: './entry-edit.component.html',
  styleUrls: ['./entry-edit.component.scss']
})
export class EntryEditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireModule,
    private iMS: InformationManagerService,
    private authService: AuthService, private userService: UserService) { }

  slug: string;
  entry: Entry;

  entryUpdateForm: FormGroup;

  ngOnInit() {
    

    this.route.params
      .subscribe(
        (params: Params) => {
          this.slug = params.id
          this.entry = this.iMS.getEntrySelected();
          if (this.entry == null) {
            this.router.navigate(['main']);
          } else {
            this.initForm();
            // this.getEntry();
          }
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
    this.iMS.updateEntry(this.entryUpdateForm.value);
    this.router.navigate(['../../'], {relativeTo: this.route})
  }

  deleteEntry() {
    this.iMS.deleteEntry();
    this.redirectAfterChange()
    this.iMS.setEntrySelected(null);
  }

  redirectAfterChange() {
    this.router.navigate(['../../'], {relativeTo: this.route})
  }

  cancelEntryChanges() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

}
