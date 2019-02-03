import { Injectable, EventEmitter } from "@angular/core";
import { LoggingService } from "./logging.service";

@Injectable()

export class AccountsService{
    accounts = [
        {
          name: 'Master Account',
          status: 'active'
        },
        {
          name: 'Testaccount',
          status: 'inactive'
        },
        {
          name: 'Hidden Account',
          status: 'unknown'
        }
      ];

      statusUpdate = new EventEmitter<string>();

      constructor(private loggingService: LoggingService){}

      addAccount(name, status){
        this.accounts.push({name,status});
        this.loggingService.logStatusChange(status);
      }
      updateStatus(id:number, status){
        this.accounts[id].status = status;
        this.loggingService.logStatusChange(status);
      }
}

