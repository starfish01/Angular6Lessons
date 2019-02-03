import { Component, OnInit } from '@angular/core';
import { UserManagementService } from './services/userManagement.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(){

  }

  constructor(private userManagement: UserManagementService){}

  activeUsers = this.userManagement.activeUsers;
  inactiveUsers = this.userManagement.inactiveUsers;

  
}
