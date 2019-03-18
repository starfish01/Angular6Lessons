import { Component, OnInit } from '@angular/core';
import { InformationManagerService } from '../zendesk-body/information-manager.service';
import { UserService } from '../auth/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as CategoryActions from '../zendesk-body/store/categories.actions';


@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
export class EditCategoriesComponent implements OnInit {

  constructor(private iMS: InformationManagerService, private userService:UserService, private store: Store<fromApp.AppState>) { }

  userToken = null;
  initLoad = false;
  categoriesNew =[];
  selectedCat = null;
  editCategoryForm: FormGroup;

  ngOnInit() {

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

  editCategory(selectedCatNew){
    this.selectedCat = selectedCatNew
    let categoryTitle = selectedCatNew.category;
    this.editCategoryForm = new FormGroup({
      'title': new FormControl(categoryTitle,[Validators.required]),
    })
  }

  onSubmit(){
    this.selectedCat.category = this.editCategoryForm.value.title
    // this.iMS.updateCategory(this.selectedCat)
    this.store.dispatch(new CategoryActions.UpdateCategory(this.selectedCat))
    this.selectedCat = null;
  }

  cancel(){
    this.selectedCat = null;
  }

  delete() {
    this.store.dispatch(new CategoryActions.DeleteCategory(this.selectedCat.id));

    // console.log(this.selectedCat)

    // this.iMS.deleteCategory(this.selectedCat)
    this.selectedCat = null;
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

}
