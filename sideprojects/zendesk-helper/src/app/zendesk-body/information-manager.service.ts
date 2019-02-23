import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Category } from '../shared/category.model';
import { Observable } from 'rxjs';
import { Entry } from '../shared/entry.model';

@Injectable()
export class InformationManagerService {

    constructor(private afs:AngularFirestore){}

    categorySelectedID: string = null;
    entrySelected: Entry = null;

    categoriesCollection: AngularFirestoreCollection<Category>;
    categories: Observable<Category[]>;

    entriesCollection: AngularFirestoreCollection<Entry>;
    entries:Observable<Entry[]>;

    


    setEntrySelected(entrySelected){
        this.entrySelected = entrySelected;
    }

    getEntrySelected(){
        return this.entrySelected;
    }

    setCategoryIDSelected(categorySelected){
        this.categorySelectedID = categorySelected;
    }

    getCategoryIDSelected(){
        return this.categorySelectedID;
    }
    

    getCategories() {
        this.categoriesCollection = this.afs.collection('category');
        this.categories = this.categoriesCollection.valueChanges();
        return this.categories;
    }

    getEntries() {
        if(this.categorySelectedID === null){
            return;
        }
        this.entriesCollection = this.afs.collection('entries', ref => ref.where('categoryID', "==", this.categorySelectedID).where('displayed','==',1))
        this.entries = this.entriesCollection.valueChanges();
        return this.entries;
    }

    storeEntry(categoryID, data) {
        let itemKey = this.afs.createId();
        data['id']= itemKey;
        data['categoryID'] = categoryID;
        let jsonData = this.objectTansform(data)
    
        return this.afs.collection('entries').doc(itemKey).set(
            jsonData, { merge: true }
        ).then(() => {
            jsonData['id'] = itemKey
            return jsonData;
        }).catch((error) => {
            console.log(error)
            return null;
        })
    }

    objectTansform(object) {
        return JSON.parse(JSON.stringify(object))
    }

}