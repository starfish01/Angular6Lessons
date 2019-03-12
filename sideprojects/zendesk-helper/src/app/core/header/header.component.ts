import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { UserService } from '../../auth/user.service';
import { isBoolean } from 'util';
import { Storage } from '../../shared/storage.service';
import {LayoutModule, BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>,private router: Router,  private breakpointObserver: BreakpointObserver) { 
  }

  isMobile:boolean;

  ngOnInit() {


    this.authState = this.store.select('auth');

    this.breakpointObserver.observe(['(min-width: 600px)']).subscribe((state:BreakpointState)=>{
      if(state.matches) {
        this.isMobile = false;
      } else {
        this.isMobile = true;
      }
    })

  }

  logoutUser() {
    // OLD
    // this.authService.doLogout().then((data)=>{
    //   this.router.navigate(['/login']);
    // });
    
    this.store.dispatch(new AuthActions.Logout());

    }

    mobileConnect(value){
      
      if(value === 'login') {
        this.router.navigate(['/login'])
      } else {
        this.router.navigate(['/signup'])
      }
    }

    editCatBtn(){
      this.router.navigate(['/edit-categories'])
    }



}
