import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  constructor(
    //  public db: AngularFirestore,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
  }

  userDetails ;

  getUserDetails(){
    return this.userDetails
  }


  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          this.userDetails = user
          //this is fired everytime the state changes we could use this to
          //create the user profile so i dont need to subsribe everywhere

          resolve(user);
        } else {
          this.userDetails = -1;
          reject('No user logged in');
        }
      })
    })
  }


  updateCurrentUser(value) {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res)
      }, err => reject(err))
    })
  }
}
