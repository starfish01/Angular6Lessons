import { Injectable, OnInit } from '@angular/core';

import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { JsonPipe } from '@angular/common';
import { Entry } from './entry.model';
import { Observable } from 'rxjs';


@Injectable()
export class Storage {
    constructor(private db: AngularFirestore) { }




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

    objectTansform(object) {
        return JSON.parse(JSON.stringify(object))
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
        return p
    }

  

}