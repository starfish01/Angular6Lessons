import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

interface User {
  uid: string,
  email: string,
  authStatus: number
}

@Injectable()
export class AuthService {


  userToken: string;
  authStatus: number;

  private authState: any;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
      //console.log(auth)
    })
  }

  get authStateLive() {
    return this.afAuth.authState.subscribe((data)=>{
      console.log(data)
      return data.uid
    })
    
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  isAuthenticated() {
    return this.userToken != null;
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          this.updateUserData(res.user)
          resolve(res);
        })
    })
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);



    const data: User = {
      uid: user.uid,
      email: user.email,
      authStatus: 1
    }

    userRef.set(data, { merge: true })

  }



  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {

          this.updateUserData(res.user)
          resolve(res);
        }, err => reject(err))
    })
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          this.updateUserData(res.user)

          resolve(res);
        }, err => reject(err))
    })
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        this.userToken = null;
        resolve();
      }
      else {
        reject();
      }
    });
  }

}