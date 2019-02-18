import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from '../auth/user.service';
import { isBoolean } from 'util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }

  logoutUser() {
    this.authService.doLogout();
    this.router.navigate(['/']);
    }



}
