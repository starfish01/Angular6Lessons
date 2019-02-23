import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { InformationManagerService } from '../../information-manager.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/auth/user.service';
import { Entry } from 'src/app/shared/entry.model';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private db:AngularFireModule, 
    private iMS: InformationManagerService,
    private authService: AuthService, private userService: UserService) { }

    slug:string = null;
    entry: Entry = null;

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.slug = params.id
          this.entry = this.iMS.getEntrySelected();
          if(this.entry == null) {
            this.router.navigate(['main']);
          } else {
            // this.getEntry();
          }
        }
      );
  }

  editEntry(){
    this.router.navigate(['edit'], {relativeTo: this.route})
  }
}
