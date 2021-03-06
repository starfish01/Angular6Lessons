import { Component } from '@angular/core';
import { ServerService } from './servers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];
  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }
  private generateId() {
    return Math.round(Math.random() * 10000);
  }

  constructor(private server:ServerService) {}

  loading=false;

  appName=this.server.getAppName();

  saveServers() {
    this.server.storeServers(this.servers)
    .subscribe(
      (response)=>{
        console.log(response)
      },
      (error)=>{
        console.log(error)
      } 
    );
  }

  getServers() {
    this.loading = true;
    this.server.getServers().subscribe(
      (servers:any[]) => {
        this.servers = servers;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  }

}
