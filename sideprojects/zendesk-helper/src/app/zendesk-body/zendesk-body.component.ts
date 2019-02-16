import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  onCategorySelect(selectedCategory) {
    console.log(selectedCategory)
    this.selectedCategory = selectedCategory
  }

  onTopicSelect(item) {
    this.selectedTopic = item;
  }

}
