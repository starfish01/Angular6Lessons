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
import * as EntryActions from './entries/store/entries.actions';

var slugify = require('slugify')

@Component({
  selector: 'app-zendesk-body',
  templateUrl: './zendesk-body.component.html',
  styleUrls: ['./zendesk-body.component.scss']
})
export class ZendeskBodyComponent implements OnInit {

  categoriesNew1: Observable<{categories:Category[]}>

  addCategoryBool = false;

  currentUser;

  @ViewChild("cat") nameField: ElementRef;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) {
    this.route.params
      .subscribe(
        (params: Params) => {
          // this.iMS.setCategoryIDSelected(null);
          // this.id = +params['id'];
          // this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }


  ngOnInit() {

    this.categoriesNew1 = this.store.select('emailData')
    
    this.store.dispatch(new CategoryActions.FetchCategories());

  }


  onCategorySelect(selectedCategory) {
    this.store.dispatch(new EntryActions.SelectCategory({index:selectedCategory.id}))

    this.router.navigate([selectedCategory.slug], { relativeTo: this.route });
  
  }


  addCategoryItem(value) {

    if (value === '') {
      this.addCategoryBool = false;
      return;
    }

    let slug = slugify(value);

    let newCategory = new Category(value, this.getUserID(), slug)

    this.store.dispatch(new CategoryActions.AddCategory(newCategory))

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

}
