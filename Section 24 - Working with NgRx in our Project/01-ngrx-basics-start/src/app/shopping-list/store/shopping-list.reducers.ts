import * as ShoppingListActions from './shopping-list.actions'
import { Ingredient } from "../../shared/ingredient.model";

const initialState={
    ingredients:[
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ]
}

export const ADD_INGREDIENT = 'ADD_INGREDIENT';


export function shoppingListReducer(state = initialState, action:ShoppingListActions.ShoppingListActions) {

    switch(action.type){
        case ADD_INGREDIENT: 
        return {
            ...state,
            ingredients:[
                ...state.ingredients,
                action.
            ]
        }
    }

    return state;
}