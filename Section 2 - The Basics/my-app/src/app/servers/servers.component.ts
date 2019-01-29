import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer=false;
  serverCreationStatus = 'No Server was created!';
  serverName ='testServer';
  serverCreated = false;
  servers = [];

  constructor() {
    setTimeout(()=>{
      this.allowNewServer = true;
    },2000)
   }

   onCreateServer() {
     this.serverCreationStatus = 'Server was created! the name is '+ this.serverName
      this.serverCreated = true;
      this.servers.push(this.serverName)
    }
   onUpdateServerName(event: any) {
    this.serverName = (<HTMLInputElement>event.target).value;
   }

  ngOnInit() {
  }

}
