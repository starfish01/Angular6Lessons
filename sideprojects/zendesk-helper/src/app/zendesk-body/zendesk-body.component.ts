import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-zendesk-body',
  templateUrl: './zendesk-body.component.html',
  styleUrls: ['./zendesk-body.component.scss']
})
export class ZendeskBodyComponent implements OnInit {

  categories = [{category:'Funnel',topic:[{title:'funnel topic 1',description:'Description',displayed:1},{title:'topic 2',description:'Description',displayed:2}],id:1},
  {category:'Enrol',topic:[{title:'enrol topic 1',description:'Description',displayed:1},{title:'topic 2',description:'Description',displayed:2}],id:2},
  {category:'Web',topic:[{title:'web topic 1',description:'Description',displayed:1},{title:'topic 2',description:'Description',displayed:2}],id:3},
  {category:'Eduapp',topic:[{title:'eduapp topic 1',description:'Description',displayed:1},{title:'topic 2',description:'Description',displayed:2}],id:4}]
  
  selectedCategory = null;

  selectedTopic = null;

  addCategoryBool = false;

  @ViewChild("cat") nameField: ElementRef;
 

  constructor(private authService:AuthService) { 
  }

  ngOnInit() {
  }

  onCategorySelect(selectedCategory) {
    console.log(selectedCategory)
    this.selectedCategory = selectedCategory
  }

  onTopicSelect(item) {
    this.selectedTopic = item;
  }

  addCategoryItem(value){
    console.log(value)
    this.addCategoryBool = false;
    console.log(this.addCategoryBool)
  }

  addCategory() {
    this.addCategoryBool = true;
    setTimeout(() => {
      this.nameField.nativeElement.focus();
    }, 0.1);
    
  }


}
