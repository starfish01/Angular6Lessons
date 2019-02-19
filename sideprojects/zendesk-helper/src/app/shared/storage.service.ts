import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class Storage {
    constructor(private db: AngularFirestore){}

    saveData(data){

    
        //need to figure this out
       

        this.db.collection('savedData').doc('/category').set(
            data, { merge: true }
        ).then(() => {
            console.log('saved!')
        }).catch(()=>{
            console.log('failed')
        })
    }
}