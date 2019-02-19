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

  categoriesNew: Category[] = [new Category('Funnel'), new Category('eduapp')]

  selectedCategory = null;

  selectedTopic = null;

  addCategoryBool = false;
  addEntryBool = false;
  userToken = null;

  @ViewChild("cat") nameField: ElementRef;
  @ViewChild("entry") entryField: ElementRef;



  constructor(private authService: AuthService, private userService: UserService, private storage:Storage) {
  }

  ngOnInit() {
    console.log(this.categoriesNew)
  }

  onCategorySelect(selectedCategory) {
    console.log(selectedCategory)
    this.selectedCategory = selectedCategory
  }

  onTopicSelect(item) {
    this.selectedTopic = item;
  }

  addCategoryItem(value) {
    this.categoriesNew.push(new Category(value, this.getUserID()))
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
    this.selectedCategory.entries.push(new Entry(value, this.getUserID()))
    this.saveData()
  }

  saveData() {
    this.storage.saveData(this.categoriesNew)
  }




}
