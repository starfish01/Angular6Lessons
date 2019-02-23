import { Injectable, OnInit } from '@angular/core';

import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { JsonPipe } from '@angular/common';
import { Entry } from './entry.model';
import { Observable } from 'rxjs';


@Injectable()
export class Storage {
    constructor(private db: AngularFirestore) { }


    objectTansform(object) {
        return JSON.parse(JSON.stringify(object))
    }

    saveData(data) {
        //need to figure this out

        this.db.collection('savedData').doc(this.db.createId()).set(
            data, { merge: true }
        ).then((val) => {
            console.log('saved!')
        }).catch(() => {
            console.log('failed')
        })
    }

    storeEntry(categoryID, data) {
        let itemKey = this.db.createId();
        data['id']= itemKey;
        data['categoryID'] = categoryID;
        let jsonData = this.objectTansform(data)
        

        return this.db.collection('entries').doc(itemKey).set(
            jsonData, { merge: true }
        ).then(() => {
            jsonData['id'] = itemKey
            return jsonData;
        }).catch((error) => {
            console.log(error)
            return null;
        })
    }

    storeCategory(data) {
        let jsonData = this.objectTansform(data)
        let itemKey = this.db.createId();

        jsonData['id'] = itemKey;

        let p = this.db.collection('category').doc(itemKey).set(
            jsonData, { merge: true }
        ).then(val => {
            console.log('saved!')
            jsonData["id"] = itemKey;
            return jsonData
        }).catch(() => {
            console.log('failed')
            return null
        })
        this.getCategories();
        return p
    }

    getCategories() {
        return this.db.firestore.collection('category').get().then(data => {
            return data;
        }).catch((error) => {
            console.log(error)
            return null;
        })
    }

    entriesCollection: AngularFirestoreCollection<Entry>;
    entries: Observable<Entry[]>;

    getEntries(categoryID):Observable<Entry[]> {

        this.entriesCollection = this.db.collection('entries', ref => ref.where('categoryID', "==", categoryID).where('displayed','==',1))

        this.entries = this.entriesCollection.valueChanges()

        return this.entries

        
    }

}