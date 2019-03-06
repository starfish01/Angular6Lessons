import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { UserService } from '../../auth/user.service';
import { isBoolean } from 'util';
import { Storage } from '../../shared/storage.service';
import {LayoutModule, BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router,  private breakpointObserver: BreakpointObserver) { 
  }

  isMobile:boolean;

  ngOnInit() {
    this.breakpointObserver.observe(['(min-width: 600px)']).subscribe((state:BreakpointState)=>{
      if(state.matches) {
        this.isMobile = false;
      } else {
        this.isMobile = true;
      }
    })

  }

  logoutUser() {
    this.authService.doLogout().then((data)=>{
      this.router.navigate(['/login']);
    });

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

    isAuthenticated(){
      return this.authService.isAuthenticated();
    }


}
