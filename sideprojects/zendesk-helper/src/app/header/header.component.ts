import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from '../auth/user.service';
import { isBoolean } from 'util';
import { Storage } from '../shared/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router, private storage:Storage ) { }

  ngOnInit() {
  }

  logoutUser() {
    this.authService.doLogout();
    this.router.navigate(['/login']);
    }

    dataButton() {

    }

    isAuthenticated(){
      return this.authService.isAuthenticated();
    }


}
