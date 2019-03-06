import { Component, OnInit } from '@angular/core';
import { InformationManagerService } from '../zendesk-body/information-manager.service';
import { UserService } from '../auth/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
export class EditCategoriesComponent implements OnInit {

  constructor(private iMS: InformationManagerService, private userService:UserService) { }

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
    this.iMS.updateCategory(this.selectedCat)
    this.selectedCat = null;
  }

  cancel(){
    this.selectedCat = null;
  }

  delete() {
    this.iMS.deleteCategory(this.selectedCat)
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
