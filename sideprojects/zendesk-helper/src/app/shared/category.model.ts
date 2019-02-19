import { Entry } from '../shared/entry.model';

export class Category {
    constructor(
        public category:string,
        // public entries:Entry[],
    ) {}

}

//  [{category:'Funnel',topic:[{title:'funnel topic 1',description:'Description',displayed:1},{title:'topic 2',description:'Description',displayed:2}],id:1},

// public name: string;
//   public description: string;
//   public imagePath: string;
//   public ingredients: Ingredient[];

//   constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
//     this.name = name;
//     this.description = desc;
//     this.imagePath = imagePath;
//     this.ingredients = ingredients;
//   }