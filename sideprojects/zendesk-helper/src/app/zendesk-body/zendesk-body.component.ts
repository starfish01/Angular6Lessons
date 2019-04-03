import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Category } from '../shared/category.model';
import { UserService } from '../auth/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
export class ZendeskBodyComponent implements OnInit, OnDestroy {

  ngOnDestroy(){
    console.log('boom')
  }


  categoriesNew1: Observable<{ categories: Category[] }>

  addCategoryBool = false;
  itemSelected: string;

  currentUser;

  @ViewChild("cat") nameField: ElementRef;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) {

    this.route.params
      .subscribe(
        (params: Params) => {

        }
      );
  }


  ngOnInit() {

    this.categoriesNew1 = this.store.select('emailData')

    this.store.dispatch(new CategoryActions.FetchCategories());

  }


  onCategorySelect(selectedCategory) {
    this.store.dispatch(new EntryActions.SelectCategory({ index: selectedCategory.id }))
    this.itemSelected = selectedCategory.id;
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
