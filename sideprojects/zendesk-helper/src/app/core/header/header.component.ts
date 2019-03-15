import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import {LayoutModule, BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import { UserService } from 'src/app/auth/user.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  constructor(
    private authService:AuthService,
    private userService:UserService,
    private router: Router,  
    private breakpointObserver: BreakpointObserver) { 
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



}
