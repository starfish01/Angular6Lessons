import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  serverId= 10;
  serverStatus = this.gerServerStatus();

  gerServerStatus(){
    return "offline"
  }

  getColor(){
    return this.serverStatus === 'Online' ? 'blue' : 'red' 
  }

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'Online' : 'Offline';
  }


  ngOnInit() {
  }

}
