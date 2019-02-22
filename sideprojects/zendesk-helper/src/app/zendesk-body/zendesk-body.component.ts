import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Category } from '../shared/category.model';
import { Entry } from '../shared/entry.model';
import { UserService } from '../auth/user.service';
import { Storage } from '../shared/storage.service';

@Component({
  selector: 'app-zendesk-body',
  templateUrl: './zendesk-body.component.html',
  styleUrls: ['./zendesk-body.component.scss']
})
export class ZendeskBodyComponent implements OnInit {

  categoriesNew: Category[] = []

  selectedCategory = null;

  initLoad = false;
  selectedTopic = null;

  addCategoryBool = false;
  lodingCategory = false;

  addEntryBool = false;
  loadingEntry = false;




  userToken = null;

  @ViewChild("cat") nameField: ElementRef;
  @ViewChild("entry") entryField: ElementRef;



  constructor(private authService: AuthService, private userService: UserService, private storage: Storage) { }

  ngOnInit() {
    this.initLoad = true;
    this.storage.getCategories().then((data) => {
      this.initLoad = false;
      data.forEach(element => {
        this.categoriesNew.push(element.data())
      });
    }).catch((error) => {
      this.initLoad = false;
    })
  }

  onCategorySelect(selectedCategory) {

    this.storage.getEntries(selectedCategory.id).then((data) => {
      data.forEach(element => {
        let newEntryID = element.data().id
        let ifExists = false;
        selectedCategory.entries.forEach(element => {
          if (newEntryID === element.id) {
            ifExists = true;
          }
        });
        if (!ifExists) {
          selectedCategory.entries.push(element.data())
        }
      });
    }).catch((error) => {
      console.log(error)
    });

    this.selectedCategory = selectedCategory
  }

  onTopicSelect(item) {
    this.selectedTopic = item;
  }


  addCategoryItem(value) {
    this.lodingCategory = true;
    let createdCategory = new Category(value, this.getUserID())

    this.storage.storeCategory(createdCategory).then((data) => {
      this.categoriesNew.push(data)
      this.lodingCategory = false;
    }).catch((err) => {
      this.lodingCategory = false;
      console.log(err)
    })

    this.addCategoryBool = false;
  }

  addCategory() {
    this.addCategoryBool = true;
    setTimeout(() => {
      this.nameField.nativeElement.focus();
    }, 0.1);
  }

  addEntry() {
    this.addEntryBool = true;

    setTimeout(() => {
      this.entryField.nativeElement.focus();
    }, 0.1);
  }

  getUserID() {
    return this.userService.getCurrentUserID();
  }

  addEntryItem(value) {
    this.addEntryBool = false;
    this.loadingEntry = true;

    let newEntry = new Entry(value, this.getUserID());

    this.storage.storeEntry(this.selectedCategory.id, newEntry)
      .then((data) => {
        this.selectedCategory.entries.push(data)
        this.loadingEntry = false;
      }).catch((error) => {
        this.loadingEntry = false;
      })

  }

  saveData() {
    this.storage.saveData(this.categoriesNew)
  }




}
