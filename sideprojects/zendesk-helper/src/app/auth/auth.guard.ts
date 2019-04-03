import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
  ) {}

  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {
        // this.router.navigate(['/user']);
        return resolve(false);
      }, err => {
        return resolve(true);
      })
    })}
}