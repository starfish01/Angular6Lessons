import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { InformationManagerService } from '../information-manager.service';
import { Entry } from 'src/app/shared/entry.model';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/auth/user.service';

var slugify = require('slugify')

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private db:AngularFirestore, 
    private iMS: InformationManagerService,
    private authService: AuthService, private userService: UserService) { }

  slug: string;
  categoryID;
  entriesList:Entry[] = [];
  addEntryBool = false;
  loadingEntry = false;
  @ViewChild("entry") entryField: ElementRef;


  selectedTopic = null;

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.slug = params.id
          this.categoryID = this.iMS.getCategoryIDSelected();
          if(this.categoryID == null) {
            this.router.navigate(['main']);
          } else {
            this.loadingEntry = true;
            this.getEntries()
          }
        }
      );
  }

  
  getEntries() {
    this.iMS.getEntries().subscribe((data)=>{
      this.entriesList = [];
      data.forEach(element => {
        this.entriesList.push(element)
      });
      this.loadingEntry = false;
    })
  }

  onTopicSelect(item) {

    this.iMS.setEntrySelected(item);

    this.router.navigate([item.slug], {relativeTo: this.route});
  }

  addEntry() {
    this.addEntryBool = true;

    setTimeout(() => {
      this.entryField.nativeElement.focus();
    }, 0.1);
  }

  addEntryItem(value) {
    this.addEntryBool = false;
    this.loadingEntry = true;

    let slug = slugify(value)

    let newEntry = new Entry(value, this.getUserID(),slug);

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