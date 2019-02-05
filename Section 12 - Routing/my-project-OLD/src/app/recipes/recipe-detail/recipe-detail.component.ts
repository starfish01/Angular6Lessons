import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Route, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() itemClicked: Recipe;

  recipeId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(
        (queryParams: Params) => {
          this.recipeId = queryParams['id'];
        }
      );
       this.recipeId = +this.route.snapshot.params['id'];

  }

}
