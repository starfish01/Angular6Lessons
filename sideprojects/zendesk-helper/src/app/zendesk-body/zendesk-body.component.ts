import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Category } from '../shared/category.model';
import { Entry } from '../shared/entry.model';
import { UserService } from '../auth/user.service';
import { Storage } from '../shared/storage.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { InformationManagerService } from './information-manager.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as CategoryActions from './store/categories.actions';


var slugify = require('slugify')

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

  currentUser;


  userToken = null;

  @ViewChild("cat") nameField: ElementRef;
  // @ViewChild("entry") entryField: ElementRef;

  categoriesNew1: Observable<{categories:Category[]}>

  constructor(private authService: AuthService, private userService: UserService, private storage: Storage, private router: Router, private route: ActivatedRoute, private iMS: InformationManagerService, private store: Store<fromApp.AppState>) {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.iMS.setCategoryIDSelected(null);
          // this.id = +params['id'];
          // this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }



  ngOnInit() {

    this.categoriesNew1 = this.store.select('emailData')

    this.store.dispatch(new CategoryActions.FetchCategories());

    this.store.subscribe(()=>{
        console.log(this.categoriesNew1)
    })


    this.initLoad = true;

    this.userService.getCurrentUser().then((data) => {
      this.userToken = data.uid;
      this.getCategories()
    }).catch((error) => {
      this.userToken = null;
      this.initLoad = false;
      console.log(error)
    })
  }

  getCategories() {

    this.iMS.getCategories(this.userToken).subscribe((data) => {
      this.categoriesNew = [];
      data.forEach(element => {
        this.categoriesNew.push(element)
      });
      this.initLoad = false;
    })
  }

  onCategorySelect(selectedCategory) {

    this.iMS.setCategoryIDSelected(selectedCategory.id);
    this.router.navigate([selectedCategory.slug], { relativeTo: this.route });

    this.selectedCategory = selectedCategory

    let q = this.iMS.getEntries().subscribe((data) => {
      this.selectedCategory.entries = []
      data.forEach(element => {
        this.selectedCategory.entries.push(element)
      });
    })
  }


  addCategoryItem(value) {
    if (value === '') {
      this.addCategoryBool = false;
      return;
    }

    this.lodingCategory = true;

    let slug = slugify(value);

    let createdCategory = new Category(value, this.getUserID(), slug)

    this.storage.storeCategory(createdCategory).then((data) => {
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

  getUserID() {
    return this.userService.getCurrentUserID();
  }

  saveData() {
    this.storage.saveData(this.categoriesNew)
  }




}
