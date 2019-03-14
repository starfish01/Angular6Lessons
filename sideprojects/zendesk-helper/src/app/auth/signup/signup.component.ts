import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { InformationManagerService } from 'src/app/zendesk-body/information-manager.service';

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
    let name ='';
    let email = '';
    let password ='';
    let confirm = '';
    let plan = '';
    let orgName = '';

    

    this.signupForm = new FormGroup({
      'name': new FormControl(name,[Validators.required]),
      'email': new FormControl(email,[Validators.required,Validators.email]),
      'password': new FormControl(password,[Validators.required,Validators.minLength(6)]),
      'confirm': new FormControl(confirm,[Validators.required]),
    })

  }

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.initForm();
  }


  tryRegister(){
    this.loading = true;
    let value = this.signupForm.value;
    this.authService.doRegister(value)
    .then(res => {
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
