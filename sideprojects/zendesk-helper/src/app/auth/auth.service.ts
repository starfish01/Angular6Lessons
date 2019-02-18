import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

    userToken:string;

    constructor(public afAuth: AngularFireAuth){}

    isAuthenticated() {
        return this.userToken != null;
    }

    doGoogleLogin(){
        return new Promise<any>((resolve, reject) => {
          let provider = new firebase.auth.GoogleAuthProvider();
          provider.addScope('profile');
          provider.addScope('email');
          this.afAuth.auth
          .signInWithPopup(provider)
          .then(res => {
            firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.userToken = token
            );
            resolve(res);
          })
        })
      }

      doRegister(value){
        return new Promise<any>((resolve, reject) => {
          firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
          .then(res => {
            firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.userToken = token
            );
            resolve(res);
          }, err => reject(err))
        })
      }
    
      doLogin(value){
        return new Promise<any>((resolve, reject) => {
          firebase.auth().signInWithEmailAndPassword(value.email, value.password)
          .then(res => {
            firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => {
                    this.userToken = token
                } 
            );
            resolve(res);
          }, err => reject(err))
        })
      }
    
      doLogout(){
        return new Promise((resolve, reject) => {
          if(firebase.auth().currentUser){
            this.afAuth.auth.signOut();
            this.userToken = null;
            resolve();
          }
          else{
            reject();
          }
        });
      }

}