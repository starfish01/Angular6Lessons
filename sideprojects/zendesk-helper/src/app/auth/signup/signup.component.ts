import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  errorMessage: string = '';
  successMessage: string = '';

  loading = false;


  private initForm() {
    let email = '';
    let password ='';

    this.signupForm = new FormGroup({
      'email': new FormControl(email,[Validators.required,Validators.email]),
      'password': new FormControl(password,[Validators.required,Validators.minLength(6)]),
    })

  }

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.initForm();
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res =>{
      this.router.navigate(['/user']);
    }, err => console.log(err)
    )
  }

  tryRegister(){
    this.loading = true;
    let value = this.signupForm.value;

    this.authService.doRegister(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
      this.loading = false;
      this.router.navigate(['/user'])
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
      this.loading = false;
    })
  }

}
