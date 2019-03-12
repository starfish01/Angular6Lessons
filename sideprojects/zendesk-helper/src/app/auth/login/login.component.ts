import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  loading =false;

  constructor(private authService: AuthService, private router:Router,private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/user']);
    })
  }

  tryLogin(){
    //this.loading = true;
    let value = this.loginForm.value;
    this.store.dispatch(new AuthActions.TrySignin({username: value.email, password:value.password}));
    
    //OLD
    // this.authService.doLogin(value)
    // .then(res => {
    //   this.loading = false;
    //   this.router.navigate(['/user']);
    // }, err => {
    //   this.loading = false;
    //   console.log(err);
    // })
  }

  private initForm() {
    let email = '';
    let password ='';

    this.loginForm = new FormGroup({
      'email': new FormControl(email,[Validators.required,Validators.email]),
      'password': new FormControl(password,[Validators.required,Validators.minLength(6)]),
    })

  }

}
