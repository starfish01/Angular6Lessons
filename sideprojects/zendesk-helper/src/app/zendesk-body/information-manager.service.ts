import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Category } from '../shared/category.model';
import { Observable } from 'rxjs';
import { Entry } from '../shared/entry.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';


@Injectable()
export class InformationManagerService {

    constructor(private afs:AngularFirestore, private router:Router,private route: ActivatedRoute,private authSevice:AuthService){}

    categorySelectedID: string = null;
    entrySelected: Entry;

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
    

    getCategories(uid) {

        this.categoriesCollection = this.afs.collection('category', ref => ref.where('uID','==',uid));
        this.categories = this.categoriesCollection.valueChanges();
        return this.categories;
    }

    getEntries() {
        if(this.categorySelectedID === null){
            return;
        }

        // this.afs.collection('users').ref.get().then(()=>{
        //     console.log('something')
        // })

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

    deleteEntry() {
        this.entriesCollection.doc(this.entrySelected.id).update({displayed:0})
    }

    updateEntry(data) {
        this.entriesCollection.doc(this.entrySelected.id).update(data)
        
    }

}