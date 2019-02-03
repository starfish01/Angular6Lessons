import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserManagementService } from '../services/userManagement.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent {
  @Input() users: string[];
  @Output() userSetToInactive = new EventEmitter<number>();

  constructor(private userManagement: UserManagementService){}

  onSetToInactive(id: number) {
    this.userManagement.onSetToInactive(id);
  }
}
