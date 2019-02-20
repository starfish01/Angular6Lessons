import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { JsonPipe } from '@angular/common';

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
            console.log(val)
            console.log('saved!')
        }).catch(() => {
            console.log('failed')
        })
    }

    storeEntry(data) {
        let jsonData = this.objectTansform(data)
        // this.db.collection('entries').doc(jsonData.title).set(
        //     jsonData, {merge}
        // )
    }

    storeCategory(data) {
        let jsonData = this.objectTansform(data)
        let itemKey = this.db.createId();

        let p = this.db.collection('category').doc(itemKey).set(
            jsonData, { merge: true }
        ).then((val) => {
            console.log('saved!')
            return itemKey
        }).catch(() => {
            console.log('failed')
            return null
        })

        return p
    }


    //get document
    // this.db.collection('category').doc(itemKey).ref.get().then(data=>{
    //     console.log(data)
    // })

}