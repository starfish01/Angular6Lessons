import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit() {
  }

  onLoadServer(id) {
    //fake complex code
    this.router.navigate(['/servers',id,'edit'],{queryParams:{allowedit:'1'},fragment:'loading'});
  }

  changeAuth(value){
    if(value === 0){
      this.authService.logout();
    }else if(value === 1){
      this.authService.login();
    }
  }

}
