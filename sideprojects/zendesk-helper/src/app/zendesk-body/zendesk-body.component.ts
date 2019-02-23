import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Category } from '../shared/category.model';
import { Entry } from '../shared/entry.model';
import { UserService } from '../auth/user.service';
import { Storage } from '../shared/storage.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { InformationManagerService } from './information-manager.service';

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



  userToken = null;

  @ViewChild("cat") nameField: ElementRef;
  // @ViewChild("entry") entryField: ElementRef;



  constructor(private authService: AuthService, private userService: UserService, private storage: Storage, private router: Router,              private route: ActivatedRoute, private iMS: InformationManagerService
    ) { 
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
    this.initLoad = true;
    this.iMS.getCategories().subscribe((data)=>{
      data.forEach(element => {
        this.categoriesNew.push(element)
      });
      this.initLoad = false;
    })
  }

  onCategorySelect(selectedCategory) {


    this.iMS.setCategoryIDSelected(selectedCategory.id);
    this.router.navigate([selectedCategory.slug], {relativeTo: this.route});

    this.selectedCategory = selectedCategory

    let q = this.storage.getEntries(selectedCategory.id).subscribe((data) => {
      this.selectedCategory.entries = []
      data.forEach(element => {
        this.selectedCategory.entries.push(element)
      });
    })
  }


  addCategoryItem(value) {
    this.lodingCategory = true;

    let slug = slugify(value);

    let createdCategory = new Category(value, this.getUserID(), slug)

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

  getUserID() {
    return this.userService.getCurrentUserID();
  }

  saveData() {
    this.storage.saveData(this.categoriesNew)
  }




}
