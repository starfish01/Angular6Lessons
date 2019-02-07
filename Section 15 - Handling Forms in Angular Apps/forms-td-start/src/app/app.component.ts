import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  @ViewChild('form') signupForm;
  defaultQuestion = 'pet'
  genders = ['male','female']
  answer = "hello"

  user ={
    username:'',
    email:'',
    secretQuestion:'',
    answer:'',
    gender:''
  };

  formSubmitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData:{
    //     username: suggestedName,
    //     email:''
    //   },
    //     secret:'pet',
    //     questionAnswer:'',
    //     gender:'male'
    //   }
    // );

    this.signupForm.form.patchValue(
      {userData:{username:suggestedName}}
    );
  }

  // onSubmit(form:NgForm) {
  //   console.log(form)
  // }

  onSubmit() {
    console.log(this.signupForm)
    this.user.username = this.signupForm.value.userData.username
    this.user.email = this.signupForm.value.userData.email
    this.user.secretQuestion = this.signupForm.value.secret
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;
    this.formSubmitted = true;

    this.signupForm.reset();
  }

}
