import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Category } from '../shared/category.model';
import { Entry } from '../shared/entry.model';

@Component({
  selector: 'app-zendesk-body',
  templateUrl: './zendesk-body.component.html',
  styleUrls: ['./zendesk-body.component.scss']
})
export class ZendeskBodyComponent implements OnInit {

  // categories = [{category:'Funnel',topic:[{title:'funnel topic 1',description:'Description',displayed:1},{title:'topic 2',description:'Description',displayed:2}],id:1},
  // {category:'Enrol',topic:[{title:'enrol topic 1',description:'Description',displayed:1},{title:'topic 2',description:'Description',displayed:2}],id:2},
  // {category:'Web',topic:[{title:'web topic 1',description:'Description',displayed:1},{title:'topic 2',description:'Description',displayed:2}],id:3},
  // {category:'Eduapp',topic:[{title:'eduapp topic 1',description:'Description',displayed:1},{title:'topic 2',description:'Description',displayed:2}],id:4}]
  

  categoriesNew:Category[] = [new Category('Funnel'), new Category('eduapp')] 


  selectedCategory = null;

  selectedTopic = null;

  addCategoryBool = false;
  addEntryBool = false;

  @ViewChild("cat") nameField: ElementRef;
  entry
  @ViewChild("entry") entryField: ElementRef;

 

  constructor(private authService:AuthService) { 
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
    this.categoriesNew.push(new Category(value))
    this.addCategoryBool = false;
  }

  addCategory() {
    this.addCategoryBool = true;
    setTimeout(() => {
      this.nameField.nativeElement.focus();
    }, 0.1);
  }
  
  addEntry(){
    this.addEntryBool = true;   
    setTimeout(() => {
      this.entryField.nativeElement.focus();
    }, 0.1); 
  }

  addEntryItem(value) {
    this.addEntryBool = false;
    console.log(this.selectedCategory)
    // this.selectedCategory['entries']
    // console.log(this.selectedCategory)
    // let newEntry: Entry = value
    // this.categoriesNew.push(new Category(value))
    // this.addCategoryBool = false;
  }


}
