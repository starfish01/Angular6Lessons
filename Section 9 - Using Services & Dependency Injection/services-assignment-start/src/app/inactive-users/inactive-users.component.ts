import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserManagementService } from '../services/userManagement.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {
  @Input() users: string[];

  constructor(private userManagement:UserManagementService){}

  onSetToActive(id: number) {
    this.userManagement.onSetToActive(id);
  }
}
