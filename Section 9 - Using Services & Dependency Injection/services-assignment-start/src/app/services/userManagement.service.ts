import { ChangeRecordService } from "./changeRecord.service";
import { Injectable } from "@angular/core";

@Injectable()

export class UserManagementService {

    activeUsers = ['Max', 'Anna'];
    inactiveUsers = ['Chris', 'Manu'];

    constructor(private changeLog:ChangeRecordService){}

    onSetToInactive(id: number) {
        this.changeLog.addItemToChangeLog(this.activeUsers[id],'inactive');
        this.inactiveUsers.push(this.activeUsers[id]);
        this.activeUsers.splice(id, 1);
      }
    
      onSetToActive(id: number) {
        this.changeLog.addItemToChangeLog(this.activeUsers[id],'active');
        this.activeUsers.push(this.inactiveUsers[id]);
        this.inactiveUsers.splice(id, 1);
      }

}